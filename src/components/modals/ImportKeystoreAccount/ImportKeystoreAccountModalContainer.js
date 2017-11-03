import { connect } from 'react-redux'

import {
  closeImportKeystoreAccountModal,
  setImportKeystoreAccountData,
  setImportKeystoreAccountPassword,
  setImportKeystoreAccountPasswordConfirm,
  setImportKeystoreAccountKnownDerivationPath,
  setImportKeystoreAccountCustomDerivationPath,
  setImportKeystoreAccountCurrentStep,
} from 'routes/JWallet/modules/modals/importKeystoreAccount'

import ImportKeystoreAccountModal from './ImportKeystoreAccountModal'

const mapStateToProps = (state) => {
  const { importKeystoreAccountModal, keystore } = state
  const { currentStep, totalSteps } = importKeystoreAccountModal
  const { isCreating, currentAccount } = keystore

  return {
    ...importKeystoreAccountModal,
    modalName: 'import-keystore-account',
    modalTitle: 'Import Key',
    topLineFullness: `${100 * (currentStep / totalSteps)}%`,
    isInitialized: !!currentAccount.id.length,
    isButtonLoading: isCreating,
    isCreating,
  }
}

const mapDispatchToProps = {
  closeImportKeystoreAccountModal,
  setImportKeystoreAccountData,
  setImportKeystoreAccountPassword,
  setImportKeystoreAccountPasswordConfirm,
  setImportKeystoreAccountKnownDerivationPath,
  setImportKeystoreAccountCustomDerivationPath,
  setImportKeystoreAccountCurrentStep,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportKeystoreAccountModal)