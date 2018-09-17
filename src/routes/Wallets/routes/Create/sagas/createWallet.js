// @flow

import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { clipboard, fileSaver, keystore, validate } from 'services'
import { selectWalletsItems, selectCreateWallet } from 'store/stateSelectors'
import { setActiveSuccess as setWalletId } from 'routes/Wallets/modules/wallets'

import {
  OPEN,
  CLOSE,
  SET_NEXT_STEP,
  SET_PREV_STEP,
  COPY_MNEMONIC,
  SAVE_MNEMONIC,
  STEPS,
  setMnemonic,
  setCurrentStep,
  clean,
  createSuccess,
  createError,
} from '../modules/createWallet'

function* openCreateWallet(): Saga<void> {
  yield put(setCurrentStep(STEPS.NAME))
}

function* closeCreateWallet(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setNextStep(): Saga<void> {
  const { currentStep }: CreateWalletData = yield select(selectCreateWallet)

  try {
    switch (currentStep) {
      case STEPS.NAME: {
        yield generateMnemonic()
        break
      }

      case STEPS.MNEMONIC: {
        yield saveMnemonicToFile()
        break
      }

      case STEPS.CONFIRM: {
        yield checkMnemonic()
        break
      }

      case STEPS.PASSWORD: {
        yield createWallet()
        break
      }

      default: break
    }
  } catch (err) {
    yield put(createError(err))
  }
}

function* setPrevStep(): Saga<void> {
  const { currentStep }: CreateWalletData = yield select(selectCreateWallet)

  try {
    switch (currentStep) {
      case STEPS.MNEMONIC: {
        yield openCreateWallet()
        break
      }

      case STEPS.CONFIRM: {
        yield generateMnemonic()
        yield put(setCurrentStep(STEPS.MNEMONIC))
        break
      }

      case STEPS.PASSWORD: {
        yield put(setCurrentStep(STEPS.CONFIRM))
        break
      }

      default: break
    }
  } catch (err) {
    yield put(createError(err))
  }
}

function* copyMnemonicToClipboard(): Saga<void> {
  const { mnemonic }: CreateWalletData = yield select(selectCreateWallet)

  clipboard.copyText(mnemonic)
}

function* generateMnemonic() {
  const wallets: Wallets = yield select(selectWalletsItems)
  const { name }: CreateWalletData = yield select(selectCreateWallet)

  validate.walletName(name, wallets)

  yield put(setMnemonic(Keystore.generateMnemonic().toString()))
  yield put(setCurrentStep(STEPS.MNEMONIC))
}

function* saveMnemonicToFile(): Saga<void> {
  const { name, mnemonic }: CreateWalletData = yield select(selectCreateWallet)

  fileSaver.saveTXT(mnemonic, `jwallet ${name}`)

  yield put(setCurrentStep(STEPS.CONFIRM))
}

function* checkMnemonic() {
  const { mnemonic, mnemonicConfirm }: CreateWalletData = yield select(selectCreateWallet)

  if (mnemonic !== mnemonicConfirm) {
    throw new InvalidFieldError('mnemonicConfirm', i18n('general.error.mnemonicConfirm.notMatched'))
  }

  yield put(setCurrentStep(STEPS.PASSWORD))
}

function* createWallet() {
  const createWalletData: CreateWalletData = yield select(selectCreateWallet)
  const { mnemonic, name, password, passwordConfirm }: CreateWalletData = createWalletData

  validate.walletPassword(password, passwordConfirm)

  try {
    const id: WalletId = keystore.createWallet({
      password,
      mnemonic,
      type: 'mnemonic',
      name: name.trim(),
    })

    yield put(setCurrentStep(STEPS.ASSETS))
    yield put(createSuccess())
    yield put(setWalletId(id))
  } catch (err) {
    throw new InvalidFieldError('password', err.message)
  }
}

export function* watchCreateWalletOpen(): Saga<void> {
  yield takeEvery(OPEN, openCreateWallet)
}

export function* watchCreateWalletClose(): Saga<void> {
  yield takeEvery(CLOSE, closeCreateWallet)
}

export function* watchCreateWalletSetNextStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, setNextStep)
}

export function* watchCreateWalletSetPrevStep(): Saga<void> {
  yield takeEvery(SET_PREV_STEP, setPrevStep)
}

export function* watchCreateWalletCopyMnemonic(): Saga<void> {
  yield takeEvery(COPY_MNEMONIC, copyMnemonicToClipboard)
}

export function* watchCreateWalletSaveMnemonic(): Saga<void> {
  yield takeEvery(SAVE_MNEMONIC, saveMnemonicToFile)
}