import React from 'react'
import PropTypes from 'prop-types'

import config from 'config'
import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import JModal from 'components/base/JModal'

import SubmitModalAlert from './Alert'
import SubmitModalBody from './Body'
import SubmitModalButton from './Button'
import SubmitModalTitle from './Title'
import SubmitModalTopLine from './TopLine'

class SubmitModal extends JModal {
  renderBody = () => {
    const { topLineFullness, alert, imageName } = this.props

    return (
      <div onKeyPress={handleEnterKeyPress(this._submitModal)}>
        <SubmitModalTopLine width={topLineFullness} />
        <SubmitModalAlert text={alert} />
        <SubmitModalBody body={this.renderModalBody()} imageName={imageName} />
      </div>
    )
  }

  renderHeader = () => {
    return <SubmitModalTitle title={this.props.modalTitle} />
  }

  renderFooter = () => {
    const { modalName, buttonTitle, iconName, isButtonLoading } = this.props

    return (
      <SubmitModalButton
        onPress={this.submitModal}
        name={modalName}
        title={buttonTitle}
        iconName={iconName}
        disabled={this.isModalButtonDisabled()}
        isLoading={isButtonLoading}
      />
    )
  }

  _submitModal = () => (this.isModalButtonDisabled() ? null : this.submitModal())
}

SubmitModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  /* optional */
  alert: PropTypes.string,
  topLineFullness: PropTypes.string,
  iconName: PropTypes.string,
  imageName: PropTypes.string,
  isOpen: PropTypes.bool,
  isButtonLoading: PropTypes.bool,
}

SubmitModal.defaultProps = {
  ...JModal.defaultProps,
  alert: '',
  topLineFullness: '',
  iconName: '',
  imageName: '',
  isOpen: false,
  isButtonLoading: false,
}

export default SubmitModal