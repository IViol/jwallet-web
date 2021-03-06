// @flow strict

// $FlowFixMe
import BigNumber from 'bignumber.js'
import { connect } from 'react-redux'
import { i18n } from 'i18n/lingui'

import { CURRENCIES } from 'data'
import { selectFiatCurrency } from 'store/selectors/user'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'
import { selectTickerItemCourseByCurrency } from 'store/selectors/ticker'

import {
  toBigNumber,
  divDecimals,
  fromGweiToWei,
  isValidNumeric,
} from 'utils/numbers'

import {
  SendAmountField,
  type Props,
} from './SendAmountField'

export type OwnProps = {|
  +className: string,
  +infoMessage: string,
  +label: string,
  +input: FinalFormInput,
  +meta: FinalFormMeta,
  +validateType: FinalFormValidateType,
  +showBlockchainFee: boolean,

  // extra
  +assetAddress: string,
  +gasPrice: string,
  +gasLimit: string,
|}

function getMaxValueForEthereum(balance, gasPrice, gasLimit) {
  const maxValue = divDecimals(
    toBigNumber(balance).minus(
      toBigNumber(gasPrice).times(gasLimit),
    ),
  )

  if (maxValue.isNegative()) {
    return '0.00'
  }

  return maxValue.toFormat(6, BigNumber.ROUND_FLOOR)
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const {
    assetAddress,
    showBlockchainFee,
    gasPrice: gasPriceGWei,
    gasLimit,
    input: {
      value: amountValue,
    },
  } = ownProps

  const gasPrice = isValidNumeric(gasPriceGWei) ? fromGweiToWei(gasPriceGWei) : 0

  const isEthereumAsset = (assetAddress === 'Ethereum')

  const fiatCurrencyCode = selectFiatCurrency(state)

  const {
    symbol: fiatCurrencySymbol,
  } = CURRENCIES[fiatCurrencyCode]

  const {
    symbol: assetSymbol,
    blockchainParams: {
      decimals,
    },
    priceFeed = {},
  } = selectDigitalAssetOrThrow(state, assetAddress)

  const {
    value: assetBalance,
  } = selectBalanceByAssetAddress(
    state,
    assetAddress,
  ) || {}

  const {
    value: ethereumBalance,
  } = selectBalanceByAssetAddress(
    state,
    'Ethereum',
  ) || {}

  const blockchainFee =
    amountValue && isValidNumeric(amountValue)
      ? gasPrice &&
        gasLimit &&
        isValidNumeric(gasPrice) &&
        isValidNumeric(gasLimit)
        ? divDecimals(toBigNumber(gasPrice)
          .times(gasLimit))
          .toFormat(6, BigNumber.ROUND_FLOOR)
        : ''
      : '0.000000'

  const maxValue = isEthereumAsset
    ? getMaxValueForEthereum(assetBalance, gasPrice, gasLimit)
    : divDecimals(assetBalance, decimals).toFormat(2, BigNumber.ROUND_FLOOR)

  const walletEthBalance = divDecimals(toBigNumber(ethereumBalance))
    .toFormat(4, BigNumber.ROUND_FLOOR)
  const infoMessage = !isEthereumAsset && i18n._(
    'Send.SendAmountField.info',
    { walletEthBalance },
    { defaults: 'Address ETH balance — {walletEthBalance, number, decimal} ETH' },
  )

  const latestFiatCourse = priceFeed.currencyID
    ? selectTickerItemCourseByCurrency(
      state,
      String(priceFeed.currencyID),
      fiatCurrencyCode,
    )
    : null

  const fiatAmount =
    amountValue &&
    latestFiatCourse &&
    isValidNumeric(amountValue) &&
    isValidNumeric(latestFiatCourse)
      ? toBigNumber(amountValue)
        .times(latestFiatCourse)
        .toFormat(2, BigNumber.ROUND_FLOOR)
        .toString()
      : '0.00'

  return {
    infoMessage,
    maxValue,
    fiatCurrency: fiatCurrencySymbol,
    currency: assetSymbol,
    fiatAmount,
    blockchainFee: showBlockchainFee && blockchainFee,
    // seems, not implemented now in ticker module
    isFetchingFiatAmount: false,
  }
}

export const ConnectedSendAmountField = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(SendAmountField)
