// @flow

import { push } from 'react-router-redux'

import {
  put,
  call,
  race,
  take,
  select,
  takeEvery,
} from 'redux-saga/effects'

import { selectWalletsItems } from 'store/stateSelectors'
import { privateKeyRequest } from 'workers/wallets/wrapper'

import {
  getWallet,
  checkMnemonicType,
} from 'utils/wallets'

import * as wallets from '../modules/wallets'

function* openView(): Saga<void> {
  yield put(wallets.clean())
  yield put(wallets.setActiveWallet(null))

  const items: Wallets = yield select(selectWalletsItems)

  if (!items.length) {
    yield put(push('/wallets/start'))
  }
}

function* setActiveWallet(action: ExtractReturn<typeof wallets.setActiveWallet>): Saga<void> {
  const { activeWalletId } = action.payload

  if (!activeWalletId) {
    return
  }

  const items: Wallets = yield select(selectWalletsItems)

  try {
    const wallet: Wallet = getWallet(items, activeWalletId)
    const isMnemonicWallet: boolean = checkMnemonicType(wallet.type)

    yield put(push(isMnemonicWallet ? '/wallets/addresses' : '/digital-assets'))
  } catch (err) {
    yield put(push('/digital-assets'))
  }
}

export function* getPrivateKey(walletId: string, password: string): Saga<string> {
  const items: Wallets = yield select(selectWalletsItems)
  const wallet: Wallet = getWallet(items, walletId)

  yield call(privateKeyRequest, wallet, password)

  while (true) {
    const { response, error } = yield race({
      response: take(wallets.PRIVATE_KEY_SUCCESS),
      error: take(wallets.PRIVATE_KEY_ERROR),
    })

    if (response) {
      if (response.payload.walletId !== walletId) {
        continue
      }

      return response.payload.privateKey
    } else if (error) {
      if (error.payload.walletId !== walletId) {
        continue
      }

      throw new Error(error.payload.message)
    }
  }
}

export function* getPrivateKeyCancel(walletId: string): Saga<void> {
  yield put(wallets.privateKeyError(walletId, 'Cancelled'))
}

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.OPEN_VIEW, openView)
  yield takeEvery(wallets.SET_ACTIVE_WALLET, setActiveWallet)
}
