// @flow strict

import React, { Component } from 'react'

import { JIcon } from 'components/base'

import {
  searchContacts,
  searchRecipientWallets,
} from 'utils/search'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
  NotFoundItem,
} from 'components/base/JPicker'

import {
  getAddressName,
  checkAddressPartValid,
} from 'utils/address'

import { Empty } from './Tabs/Empty'
import { ContactItem } from './ContactItem/ContactItem'
import { ContactIcon } from './ContactIcon/ContactIcon'
import { WalletList } from './WalletList/WalletList'
import { QuickSendItem } from './QuickSendItem/QuickSendItem'

import styles from './recipientPicker.m.scss'

import {
  Tabs,
  type Tab,
} from './Tabs/Tabs'

export type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +contacts: Favorite[],
  +wallets: RecipientPickerWallet[],
  +className: string,
  +label: string,
|}

type StateProps = {|
  +activeTab: Tab,
  +searchQuery: string,
  +openWallets: string[],
|}

type CurrentRendererInput = {
  // eslint-disable-next-line react/no-unused-prop-types
  +isOpen: boolean,
}

type SearchInputRef = {
  current: null | HTMLInputElement,
}

class RecipientPicker extends Component<Props, StateProps> {
  static defaultProps = {
    className: '',
  }

  state = {
    searchQuery: '',
    activeTab: 'contacts',
    openWallets: [],
  }

  searchInputRef: SearchInputRef = React.createRef()

  currentRenderer = ({ isOpen }: CurrentRendererInput): React$Node => {
    const {
      input,
      contacts,
      wallets,
      label,
    }: Props = this.props

    const {
      activeTab,
      searchQuery,
    }: StateProps =  this.state

    const isActiveWalletsTab: boolean = (activeTab === 'wallets')
    const activeContact: ?Favorite = contacts.find(contact => contact.address === input.value)

    const activeWallet: ?RecipientPickerWallet = wallets.find((wallet: RecipientPickerWallet) => {
      if (wallet.id === input.value) {
        return true
      }

      if (wallet.addresses.find(walletAddress => walletAddress.address === input.value)) {
        return true
      }

      return false
    })

    // if current tab is 'wallets' and active wallet was found - just skip code below
    if (activeContact && !(activeWallet && isActiveWalletsTab)) {
      const title = activeContact.name
        ? activeContact.name
        : activeContact.address

      return (
        <JPickerCurrent
          ref={this.searchInputRef}
          isEditable={isOpen}
          label={label}
          value={!isOpen ? title : ''}
          inputValue={searchQuery}
          onInputChange={this.handleSearchQueryChange}
          iconComponent={(
            <ContactIcon name={activeContact.name} />
          )}
        />
      )
    }

    if (activeWallet) {
      if (activeWallet.type === 'mnemonic') {
        const [activeAddress, activeAddressIndex] = activeWallet.addresses.reduce((
          result,
          walletAddress,
          index,
        ) => (walletAddress.address === input.value)
          ? [walletAddress, index]
          : result, [undefined, 0])

        const title: string = !activeAddress ? activeWallet.name : getAddressName(
          activeAddress.name,
          activeAddressIndex,
          activeWallet.name,
        )

        return (
          <JPickerCurrent
            ref={this.searchInputRef}
            isEditable={isOpen}
            label={label}
            value={!isOpen ? title : ''}
            inputValue={searchQuery}
            onInputChange={this.handleSearchQueryChange}
            iconComponent={(
              <JIcon name='0x-use-fill' color='blue' />
            )}
          />
        )
      }

      return (
        <JPickerCurrent
          ref={this.searchInputRef}
          isEditable={isOpen}
          label={label}
          value={!isOpen ? activeWallet.name : ''}
          inputValue={searchQuery}
          onInputChange={this.handleSearchQueryChange}
          iconComponent={(
            <JIcon name='wallet-use-fill' color='blue' />
          )}
        />
      )
    }

    return (
      <JPickerCurrent
        ref={this.searchInputRef}
        isEditable={isOpen}
        label={label}
        value={!isOpen ? input.value : ''}
        inputValue={searchQuery}
        onInputChange={this.handleSearchQueryChange}
        iconComponent={(
          <JIcon
            name='contact-2-use-fill'
            className={(isOpen || input.value) ? styles.blue : styles.gray}
          />
        )}
      />
    )
  }

  handleSearchQueryChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleOpen = () => {
    this.props.input.onFocus()

    this.setState({ searchQuery: '' }, () => {
      if (this.searchInputRef.current) {
        this.searchInputRef.current.focus()
      }
    })
  }

  handleClose = () => {
    this.setState({ searchQuery: '' })
    this.props.input.onBlur()
  }

  handleTabClick = (activeTab: Tab) => {
    this.setState({ activeTab }, () => {
      if (this.searchInputRef.current) {
        this.searchInputRef.current.focus()
      }
    })
  }

  handleMnemonicWalletToggle = (walletId: string) => {
    const { openWallets } = this.state

    if (openWallets.includes(walletId)) {
      this.setState({
        openWallets: openWallets.reduce(
          (res, cur) => (cur === walletId
            ? res
            : [...res, cur]
          ),
          [],
        ),
      })
    } else {
      this.setState({
        openWallets: [
          ...openWallets,
          walletId,
        ],
      })
    }
  }

  renderContactsTab = () => {
    const {
      input,
      contacts,
      // fiatCurrency,
    }: Props = this.props

    const { searchQuery }: StateProps = this.state
    const activeContact = contacts.find(contact => (contact.address === input.value))

    const filteredContacts: Favorite[] = searchContacts(
      contacts,
      searchQuery,
    )

    if (!filteredContacts.length) {
      if (checkAddressPartValid(searchQuery)) {
        return (
          <QuickSendItem
            address={searchQuery}
            // eslint-disable-next-line react/jsx-handler-names
            onChange={input.onChange}
          />
        )
      } else {
        if (!contacts.length) {
          return (
            <Empty tab='contacts' />
          )
        }

        return (
          <NotFoundItem />
        )
      }
    }

    if (!contacts.length) {
      return (
        <Empty tab='contacts' />
      )
    }

    return (
      <JPickerList
        // eslint-disable-next-line react/jsx-handler-names
        onItemClick={input.onChange}
        activeItemKey={activeContact ? activeContact.address : ''}
      >
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.address}
            name={contact.name}
            description={contact.description}
            address={contact.address}
          />
        ))}
      </JPickerList>
    )
  }

  renderWalletsTab = () => {
    const {
      input,
      wallets,
    }: Props = this.props

    if (!wallets.length) {
      return <Empty tab='wallets' />
    }

    const { searchQuery }: StateProps = this.state

    const filteredWallets: RecipientPickerWallet[] = searchRecipientWallets(
      wallets,
      searchQuery,
    )

    if (!filteredWallets.length) {
      if (checkAddressPartValid(searchQuery)) {
        return (
          <QuickSendItem
            address={searchQuery}
            // eslint-disable-next-line react/jsx-handler-names
            onChange={input.onChange}
          />
        )
      } else {
        return (
          <NotFoundItem />
        )
      }
    }

    return (
      <WalletList
        openWalletIds={this.state.openWallets}
        onMnemonicWalletToggle={this.handleMnemonicWalletToggle}
        wallets={filteredWallets}
        // eslint-disable-next-line react/jsx-handler-names
        onChange={input.onChange}
        activeWalletAddress={input.value}
        isWalletsForceOpened={!!searchQuery}
      />
    )
  }

  render() {
    const {
      meta,
      className,
    } = this.props

    const {
      activeTab,
    } = this.state

    const isOpen = meta.active || false

    return (
      <JPickerBody
        className={className}
        isOpen={isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        currentRenderer={this.currentRenderer}
      >
        <Tabs
          activeTab={activeTab}
          onTabClick={this.handleTabClick}
        />
        {activeTab === 'contacts'
          ? this.renderContactsTab()
          : this.renderWalletsTab()}
      </JPickerBody>
    )
  }
}

export { RecipientPicker }
