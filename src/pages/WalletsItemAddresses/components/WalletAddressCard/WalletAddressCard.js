// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { CopyIconButton } from 'components'
import { sanitizeName } from 'utils/wallets'
import { walletsPlugin } from 'store/plugins'
import { getAddressName } from 'utils/address'
import { formatAssetBalance } from 'utils/formatters'
import { selectAddressNames } from 'store/selectors/wallets'
import { setAddressName } from 'store/modules/walletsAddresses'

import styles from './walletAddressCard.m.scss'

type OwnProps = {|
  +address: Address,
  +index: number,
|}

type Props = {|
  +setAddressName: (address: Address, name: string) => any,
  +address: Address,
  +addressName: string,
  +i18n: I18nType,
  /* ::
  +index: number,
  */
|}

type StateProps = {|
  +newName: string,
  +ethBalance: ?BigNumber,
  +isRenameActive: boolean,
|}

class WalletAddressCard extends Component<Props, StateProps> {
  nameInputRef = React.createRef<HTMLInputElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      newName: props.addressName,
      ethBalance: null,
      isRenameActive: false,
    }
  }

  async componentDidMount() {
    const ethBalance: BigNumber = await walletsPlugin.requestETHBalanceByAddress(this.props.address)

    this.setState({
      ethBalance: formatAssetBalance(
        'Ethereum',
        ethBalance,
        18,
        'ETH',
      ),
    })
  }

  handleChangeName = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ newName: event.target.value })
  }

  handleActivateRename = (isRenameActive?: boolean = true) => {
    this.setState({ isRenameActive: !!isRenameActive }, () => {
      if (isRenameActive && this.nameInputRef && this.nameInputRef.current) {
        this.nameInputRef.current.focus()
      }
    })
  }

  handleRenameBlur = () => {
    this.handleActivateRename(false)

    const {
      address,
      addressName,
    } = this.props

    const newName: string = sanitizeName(this.state.newName)

    if (!newName || (addressName === newName)) {
      this.setState({ newName: addressName })

      return
    }

    this.props.setAddressName(address, newName)
    this.setState({ newName })
  }

  render() {
    const {
      address,
      addressName,
      i18n,
    }: Props = this.props

    const {
      newName,
      ethBalance,
      isRenameActive,
    }: StateProps = this.state

    return (
      <div
        key={address}
        className={styles.core}
      >
        <div className={styles.main}>
          <div className={styles.info}>
            <div className={styles.label}>
              {i18n._(
                'WalletsItemAddresses.WalletAddressCard.title',
                null,
                { defaults: 'Name' },
              )}
            </div>
            <div className={styles.wrapper}>
              <div
                className={classNames(
                  styles.name,
                  styles.title,
                  isRenameActive && styles.editable,
                )}
                onClick={this.handleActivateRename}
              >
                {isRenameActive
                  /**
                   * Next line is necessarry, because we must render newName inside div
                   * to show background. But ending spaces are ignored,
                   * so we have to replace them by something.
                   */
                  ? newName.replace(/ /g, '.')
                  : newName
                }
              </div>
              {isRenameActive && (
                <input
                  onBlur={this.handleRenameBlur}
                  onChange={this.handleChangeName}
                  ref={this.nameInputRef}
                  value={newName}
                  className={styles.input}
                  type='text'
                />
              )}
            </div>
          </div>
          {ethBalance && (
            <div className={styles.balance}>
              {ethBalance}
            </div>
          )}
        </div>
        <div className={styles.address}>
          <div className={styles.title}>
            {address}
          </div>
          <CopyIconButton
            title={i18n._(
              'WalletsItemAddresses.WalletAddressCard.actions.copy',
              { addressName },
              { defaults: 'Copy {addressName}' },
            )}
            content={address}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(
  state: AppState,
  {
    address,
    index,
  }: OwnProps,
) {
  const addressNames: AddressNames = selectAddressNames(state)

  return {
    addressName: getAddressName(addressNames[address], index),
  }
}

const mapDispatchToProps = {
  setAddressName,
}

const WalletAddressCardEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WalletAddressCard)

export { WalletAddressCardEnhanced as WalletAddressCard }
