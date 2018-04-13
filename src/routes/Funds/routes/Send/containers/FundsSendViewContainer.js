// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import getWalletNameAndAddress from 'utils/keystore/getWalletNameAndAddress'
import getActiveDigitalAssetsData from 'utils/digitalAssets/getActiveDigitalAssetsData'

import {
  open,
  close,
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setPassword,
  setNextStep,
} from '../modules/sendFunds'

import FundsSendView from '../components/FundsSendView'

const mapStateToProps = ({ digitalAssets, wallets, sendFunds }: State) => ({
  ...sendFunds,
  sender: getWalletNameAndAddress(wallets.activeWalletId),
  digitalAssets: getActiveDigitalAssetsData(digitalAssets),
})

const mapDispatchToProps = {
  open,
  close,
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setPassword,
  setNextStep,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(FundsSendView)