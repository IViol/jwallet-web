// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { i18n } from 'i18n/lingui'

import { clipboard } from 'services'

import {
  JIcon,
  JLink,
} from 'components/base'

import walletCardActionsStyles from './walletCardActions.m.scss'

type Props = {|
  +onRename: () => void,
  +id: WalletId,
  +type: WalletCustomType,
  +isSimplified: ?boolean,
|}

type StateProps = {|
  isToggled: boolean,
|}

export class WalletCardActions extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isToggled: false,
    }
  }

  handleToggle = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault()
    this.setState({ isToggled: !this.state.isToggled })
    event.stopPropagation()
  }

  handleCopyAddress = (event: SyntheticEvent<HTMLSpanElement>) => {
    this.setState({ isToggled: false })
    clipboard.copyText('TEST ADDRESS')
    event.stopPropagation()
  }

  handleRename = (event: SyntheticEvent<HTMLSpanElement>) => {
    this.setState({ isToggled: false })
    this.props.onRename()
    event.stopPropagation()
  }

  render() {
    const {
      id,
      type,
      isSimplified,
    }: Props = this.props

    const { isToggled }: StateProps = this.state
    const isXPUBType: boolean = (type === 'xpub')
    const isPKType: boolean = (type === 'privateKey')
    const isAddressType: boolean = (type === 'address')
    const isReadOnly: boolean = (isAddressType || isXPUBType)
    const isAddressOrPKType: boolean = (isAddressType || isPKType)
    const hasSingleAddress: boolean = (isSimplified || isAddressOrPKType)
    const isMultiAddressWallet: boolean = !isAddressOrPKType

    return (
      <div
        className={classNames(
          walletCardActionsStyles.core,
          isToggled && walletCardActionsStyles.toggled,
          '__wallet-card-actions',
        )}
      >
        <div
          onClick={this.handleToggle}
          className={walletCardActionsStyles.overlay}
        />
        <div
          onClick={this.handleToggle}
          className={walletCardActionsStyles.icon}
        >
          <JIcon
            color='white'
            name='kebab-menu-use-fill'
          />
        </div>
        <div className={classNames(
          walletCardActionsStyles.actions,
          !isToggled && walletCardActionsStyles['-hide'],
        )}
        >
          {hasSingleAddress && (
            <button
              type='button'
              onClick={this.handleCopyAddress}
              className={classNames(
                walletCardActionsStyles.action,
                walletCardActionsStyles['-button'],
              )}
            >
              {i18n._(
                'WalletCard.menu.copyWalletAddress',
                null,
                { defaults: 'Copy Wallet Address' },
              )}
            </button>
          )}
          <button
            type='button'
            onClick={this.handleRename}
            className={classNames(
              walletCardActionsStyles.action,
              walletCardActionsStyles['-button'],
            )}
          >
            {i18n._(
              'WalletCard.menu.renameWallet',
              null,
              { defaults: 'Rename Wallet' },
            )}
          </button>
          <JLink
            href={`/wallets/${id}/upgrade`}
            className={walletCardActionsStyles.action}
          >
            {i18n._(
              'WalletCard.menu.unlock',
              null,
              { defaults: 'Unlock Features' },
            )}
          </JLink>
          <JLink
            href={`/wallets/${id}/addresses`}
            className={walletCardActionsStyles.action}
          >
            {i18n._(
              'WalletCard.menu.addresses',
              null,
              { defaults: 'Manage Addresses' },
            )}
          </JLink>
          {isMultiAddressWallet && (
            <JLink
              className={walletCardActionsStyles.action}
              href={`/wallets/${id}/mode-${isSimplified ? 'enable' : 'disable'}`}
            >
              {isSimplified
                ? i18n._(
                  'WalletCard.menu.enableMulti',
                  null,
                  { defaults: 'Enable Multi-Address Mode' },
                )
                : i18n._(
                  'WalletCard.menu.disableMulti',
                  null,
                  { defaults: 'Disable Multi-Address Mode' },
                )
              }
            </JLink>
          )}
          {!isReadOnly && (
            <JLink
              href={`/wallets/${id}/backup`}
              className={walletCardActionsStyles.action}
            >
              {i18n._(
                'WalletCard.menu.backup',
                null,
                { defaults: 'Backup Wallet' },
              )}
            </JLink>
          )}
          <JLink
            href={`/wallets/${id}/delete`}
            className={walletCardActionsStyles.action}
          >
            {i18n._(
              'WalletCard.menu.delete',
              null,
              { defaults: 'Delete Wallet' },
            )}
          </JLink>
        </div>
      </div>
    )
  }
}
