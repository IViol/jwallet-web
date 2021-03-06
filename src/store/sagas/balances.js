// @flow

import { isEmpty } from 'lodash-es'

import {
  delay,
  type Task,
} from 'redux-saga'

import {
  all,
  put,
  call,
  fork,
  take,
  cancel,
  select,
  takeEvery,
} from 'redux-saga/effects'

import config from 'config'
import web3 from 'services/web3'
import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'
import { selectProcessingBlock } from 'store/selectors/blocks'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

import * as blocks from '../modules/blocks'
import * as balances from '../modules/balances'

const {
  syncBalancesTimeout,
  processingBlockWaitTimeout,
}: AppConfig = config

function getRequestBalanceByAssetTask(
  assetAddress: AssetAddress,
  blockNumber: number,
): SchedulerBalanceTask {
  return {
    module: 'balances',
    method: {
      name: 'getAssetBalance',
      payload: {
        blockNumber,
        assetAddress,
      },
    },
  }
}

function getBalancesForActiveAssets(
  items: Balances,
  activeAssets: DigitalAsset[],
): Balances {
  return Object
    .keys(items)
    .reduce((result: Balances, assetAddress: AssetAddress): Balances => {
      const activeAsset: ?DigitalAsset = getDigitalAssetByAddress(activeAssets, assetAddress)

      if (!activeAsset) {
        return result
      }

      return {
        ...result,
        [assetAddress]: items[assetAddress],
      }
    }, {})
}

function* checkBalancesFetched(
  blockNumber: BlockNumber,
  activeAssets: DigitalAsset[],
): Saga<boolean> {
  const itemsByBlockNumber: ExtractReturn<typeof selectBalancesByBlockNumber> =
    yield select(selectBalancesByBlockNumber, blockNumber)

  if (!itemsByBlockNumber) {
    return false
  }

  const balancesForActiveAssets: Balances = getBalancesForActiveAssets(
    itemsByBlockNumber,
    activeAssets,
  )

  const fetchedItems: Balances = Object.keys(balancesForActiveAssets).reduce((
    result: Balances,
    assetAddress: AssetAddress,
  ): Balances => {
    const foundItem: ?Balance = balancesForActiveAssets[assetAddress]

    if (!foundItem) {
      return result
    }

    return {
      ...result,
      [assetAddress]: foundItem,
    }
  }, {})

  return !isEmpty(fetchedItems)
}

function* checkBalancesLoading(
  blockNumber: BlockNumber,
  activeAssets: DigitalAsset[],
): Saga<boolean> {
  const itemsByBlockNumber: ExtractReturn<typeof selectBalancesByBlockNumber> =
    yield select(selectBalancesByBlockNumber, blockNumber)

  if (!itemsByBlockNumber) {
    return true
  }

  const balancesForActiveAssets: Balances = getBalancesForActiveAssets(
    itemsByBlockNumber,
    activeAssets,
  )

  const isLoading: boolean = Object.keys(balancesForActiveAssets).reduce((
    result: boolean,
    assetAddress: AssetAddress,
  ): boolean => {
    // return true if already true
    if (result) {
      return true
    }

    const foundItem: ?Balance = balancesForActiveAssets[assetAddress]

    // return true if item was not found by existed key
    if (!foundItem) {
      return true
    }

    const {
      value,
      isError,
    }: Balance = foundItem

    return ((value == null) && (isError == null))
  }, false)

  return isLoading
}

function* syncProcessingBlockStatus(): Saga<void> {
  try {
    while (true) {
      const networkId: ExtractReturn<typeof selectCurrentNetworkId> =
        yield select(selectCurrentNetworkId)

      const processingBlock: ExtractReturn<typeof selectProcessingBlock> =
        yield select(selectProcessingBlock, networkId)

      const activeAssets: ExtractReturn<typeof selectActiveDigitalAssets> =
        yield select(selectActiveDigitalAssets)

      if (!networkId) {
        return
      }

      if (!processingBlock) {
        yield call(delay, processingBlockWaitTimeout)
        continue
      }

      const {
        number,
        isBalancesFetched,
        isBalancesLoading,
      }: BlockData = processingBlock

      const blockNumber: BlockNumber = number.toString()

      const isFetched: boolean = yield* checkBalancesFetched(
        blockNumber,
        activeAssets,
      )

      if (!isBalancesFetched && isFetched) {
        yield put(blocks.setIsBalancesFetched(networkId, true))
      }

      const isLoading: boolean = yield* checkBalancesLoading(
        blockNumber,
        activeAssets,
      )

      if (isBalancesLoading && !isLoading) {
        yield put(blocks.setIsBalancesFetched(networkId, true))
        yield put(blocks.setIsBalancesLoading(networkId, false))
      }

      yield call(delay, syncBalancesTimeout)
    }
  } finally {
    //
  }
}

function* fetchByOwnerRequest(
  action: ExtractReturn<typeof balances.fetchByOwnerRequest>,
): Saga<void> {
  const {
    requestQueue,
    networkId,
    ownerAddress,
    blockNumber,
  } = action.payload

  const activeAssets: ExtractReturn<typeof selectActiveDigitalAssets> =
    yield select(selectActiveDigitalAssets)

  yield all(activeAssets.map(({ blockchainParams }: DigitalAsset) => put(balances.initItemByAsset(
    networkId,
    ownerAddress,
    blockNumber,
    blockchainParams.address,
  ))))

  yield all(activeAssets.reduce((
    result: SchedulerBalanceTask[],
    { blockchainParams }: DigitalAsset,
  ): SchedulerBalanceTask[] => ([
    ...result,
    getRequestBalanceByAssetTask(blockchainParams.address, blockNumber),
  ]), []).map((task: SchedulerBalanceTask) => put(requestQueue, task)))

  /**
   * Init processing block statuses of loading/fetched flags of balances
   * After that start syncing:
   * - set fetched flag to true, if we have min count of balances to display for user
   * - set loading flag to false, if balances are fully fetched
   * (there are could be some failed responses, that will be fetched later)
   *
   * When loading flags of balances & transactions set to false, processing block will be changed
   */

  yield put(blocks.setIsBalancesLoading(networkId, true))
  yield put(blocks.setIsBalancesFetched(networkId, false))

  const syncProcessingBlockStatusTask: Task<typeof syncProcessingBlockStatus> =
    yield fork(syncProcessingBlockStatus)

  yield take(blocks.SET_PROCESSING_BLOCK)
  yield cancel(syncProcessingBlockStatusTask)
}

export function* requestBalance(
  task: SchedulerBalanceTask,
  network: Network,
  ownerAddress: OwnerAddress,
): Saga<void> {
  const {
    blockNumber,
    assetAddress,
  } = task.method.payload

  const balance: string = yield call(web3.getAssetBalance, network, ownerAddress, assetAddress)

  yield put(balances.fetchByAssetSuccess(
    network.id,
    ownerAddress,
    blockNumber.toString(),
    assetAddress,
    balance,
  ))
}

export function* balancesRootSaga(): Saga<void> {
  yield takeEvery(balances.FETCH_BY_OWNER_REQUEST, fetchByOwnerRequest)
}
