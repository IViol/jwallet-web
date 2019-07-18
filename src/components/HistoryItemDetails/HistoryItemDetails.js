// @flow strict

import { connect } from 'react-redux'

import { edit } from 'store/modules/comments'
import { selectFavoritesAddressNames } from 'store/selectors/favorites'
import { selectAddressWalletsNames } from 'store/selectors/wallets'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { getShortenedAddress } from 'utils/address'

import { PageNotFoundError } from 'errors'
import { MEMO } from 'store/utils/HistoryItem/HistoryItem'

import {
  type Props,
  HistoryItemDetailsInternal,
} from 'components/HistoryItemDetails/HistoryItemDetailsInternal'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'

import {
  CONTRACT_CALL_TYPE,
  type HistoryItem,
} from 'store/utils/HistoryItem/types'

export type ContainerProps = {|
  txHash: TransactionId,
  className: ?string,
|}

const mapDispatchToProps = {
  editNote: edit,
}

function getPrimaryName(
  state: AppState,
  address: OwnerAddress,
): string {
  const favorites = selectFavoritesAddressNames(state)
  const addressNames = selectAddressWalletsNames(state)

  return favorites[address]
    || addressNames[address]
    || address
    ? getShortenedAddress(address)
    : ''
}

function mapStateToProps(
  state: AppState,
  {
    txHash,
    className,
  }: ContainerProps,
) {
  const { blockExplorerUISubdomain } = selectCurrentNetworkOrThrow(state)
  const transactionRecord: HistoryItem = MEMO.transactionsIndex[txHash]
  const asset = selectDigitalAssetOrThrow(state, transactionRecord.asset)

  const to = transactionRecord.type === CONTRACT_CALL_TYPE
    ? transactionRecord.contractAddress
    : transactionRecord.to

  if (!transactionRecord) {
    throw new PageNotFoundError()
  }

  return {
    ...transactionRecord,
    className,
    asset,
    fromName: getPrimaryName(state, transactionRecord.from),
    toName: getPrimaryName(state, to),
    blockExplorer: blockExplorerUISubdomain,
  }
}

export const HistoryItemDetails = (
  connect< Props, ContainerProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)(
    (HistoryItemDetailsInternal),
  )
)
