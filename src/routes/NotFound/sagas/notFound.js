// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWallets } from 'store/stateSelectors'

import * as notFound from '../modules/notFound'

function* goToHome(): Saga<void> {
  const {
    persist: {
      items,
      activeWalletId,
    },
  }: WalletsState = yield select(selectWallets)

  if (!items.length) {
    yield put(push('/wallets/start'))
  } else if (!activeWalletId) {
    yield put(push('/wallets'))
  } else {
    yield put(push('/transactions'))
  }
}

export function* notFoundRootSaga(): Saga<void> {
  yield takeEvery(notFound.GO_TO_HOME, goToHome)
}