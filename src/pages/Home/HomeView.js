// @flow

import React, { Component } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  get,
  isEqual,
} from 'lodash-es'

import noResultImg from 'public/assets/pic_assets_112.svg'
import { SearchInput } from 'components'

import {
  JIcon,
  JLink,
  Header,
  Button,
} from 'components/base'

import { AssetItem } from './components/AssetItem/AssetItem'
import { ManageAssetItem } from './components/AssetItem/ManageAssetItem'
import { filterAssetByQuery } from './filterAssetByQuery'

import homeStyle from './home.m.scss'

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=home_exchange'
const ASSETS_HEADER_BOTTOM_EDGE = 376

export type Props = {|
  +items: DigitalAssetWithBalance[],
  setAssetIsActive: (assetAddress: string, isActive: boolean) => any,
  +i18n: I18nType,
|}

type ComponentState = {|
  searchQuery: string,
  isInManageMode: boolean,
  assetsState: {
    [assetAddress: string]: boolean,
  },
  isSticky: boolean,
|}

function filterActiveDigitalAssets(items: DigitalAssetWithBalance[]): DigitalAssetWithBalance[] {
  return items.filter(({ isActive }: DigitalAssetWithBalance) => !!isActive)
}

class HomeViewComponent extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
      isInManageMode: false,
      assetsState: {},
      isSticky: false,
    }
  }

  componentDidMount() {
    this.rootWrapper.addEventListener('scroll', this.handleScroll)
  }

  shouldComponentUpdate(nextProps: Props, nextState: ComponentState) {
    if (
      nextProps.items
        .find(
          (item, idx) => get(
            item,
            'blockchainParams.address',
          ) !== get(
            this.props.items[idx],
            'blockchainParams.address',
          ),
        )
    ) {
      return true
    }

    return !isEqual(this.state, nextState)
  }

  componentWillUnmount() {
    this.rootWrapper.removeEventListener('scroll', this.handleScroll)
  }

  rootWrapper = window.root || document.getElementById('root')

  handleSearchQueryInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault()

    this.setState({ searchQuery: e.target.value })
  }

  handleScroll = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    const { isSticky } = this.state
    const { scrollTop } = this.rootWrapper

    if (!isSticky && scrollTop >= ASSETS_HEADER_BOTTOM_EDGE) {
      this.setState({ isSticky: true })
    }

    if (isSticky && scrollTop < ASSETS_HEADER_BOTTOM_EDGE) {
      this.setState({ isSticky: false })
    }
  }

  handleEnterManageMode = () => {
    const assetsState = this.props.items.reduce((reduceResult, item) => {
      reduceResult[item.blockchainParams.address] = Boolean(item.isActive)

      return reduceResult
    }, {})

    this.setState({
      assetsState,
      isInManageMode: true,
    })
  }

  handleLeaveManageMode = () => {
    const {
      assetsState,
    } = this.state

    const {
      items,
      setAssetIsActive,
    } = this.props

    const diff = items.map(item =>
      Boolean(item.isActive) !== assetsState[item.blockchainParams.address]
        ? {
          isActive: assetsState[item.blockchainParams.address],
          address: item.blockchainParams.address,
        }
        : undefined).filter(Boolean)

    diff.forEach(({
      address,
      isActive,
    }) => setAssetIsActive(address, isActive))

    this.setState({
      isInManageMode: false,
    })
  }

  handleManageAssetCheck = (address: string, isChecked: boolean) => {
    this.setState({
      assetsState: {
        ...this.state.assetsState,
        [address]: isChecked,
      },
    })
  }

  renderAssetsList = (filteredItems: DigitalAssetWithBalance[]) => {
    const {
      isInManageMode,
      assetsState,
    } = this.state

    return (
      <ul className={homeStyle.assetList}>
        {filteredItems.map((item) => {
          const address = get(item, 'blockchainParams.address')

          return (
            <li key={address}>
              {isInManageMode
                ? (
                  <ManageAssetItem
                    address={address}
                    isChecked={assetsState[address] || false}
                    onCheck={this.handleManageAssetCheck}
                  />
                ) : (
                  <AssetItem address={address} />
                )}
            </li>
          )
        })}
      </ul>
    )
  }

  renderEmptyList = () => {
    const { i18n } = this.props

    return (
      <figure>
        <img
          src={noResultImg}
          className={homeStyle.emptyIcon}
          alt={i18n._(
            'Home.noSearchResults.alt',
            null,
            { defaults: 'No search results in assets list' },
          )}
        />
        <figcaption>{i18n._(
          'Home.noSearchResults.description',
          null,
          { defaults: 'No Search Results.' },
        )}
        </figcaption>
      </figure>
    )
  }

  render() {
    const {
      items,
      i18n,
    } = this.props

    const {
      isInManageMode,
      isSticky,
    } = this.state

    const assetItems = isInManageMode ? items : filterActiveDigitalAssets(items)

    const filteredItems = assetItems.filter(item => filterAssetByQuery(
      item,
      this.state.searchQuery,
    ))
    const isEmptyAssetsList = filteredItems.length <= 0

    return (
      <div className={homeStyle.core}>
        <section className={homeStyle.linksSection}>
          <Header title={i18n._(
            'Home.transfer.title',
            null,
            { defaults: 'Transfer' },
          )}
          />
          <nav className={homeStyle.links}>
            <JLink
              className={homeStyle.link}
              href='/send'
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-send-use-fill'
                  color='blue'
                />
              </div>
              {i18n._(
                'Home.transfer.send',
                null,
                { defaults: 'Send' },
              )}
            </JLink>
            <JLink
              className={homeStyle.link}
              href='/receive'
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-receive-use-fill'
                  color='blue'
                />
              </div>
              {i18n._(
                'Home.transfer.receive',
                null,
                { defaults: 'Receive' },
              )}
            </JLink>
            <JLink
              className={homeStyle.link}
              href={JCASH_UTM_URL}
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-exchange-use-fill'
                  color='blue'
                />
              </div>
              {i18n._(
                'Home.transfer.exchange',
                null,
                { defaults: 'Exchange' },
              )}
            </JLink>
          </nav>
        </section>
        <section
          className={classNames(
            homeStyle.assetsSection,
            isEmptyAssetsList && homeStyle.empty,
          )}
        >
          <div
            className={classNames(
              homeStyle.assetsHeaderWrapper,
              isSticky && homeStyle.sticky,
            )}
          >
            <Header
              title={i18n._(
                'Home.assets.title',
                null,
                { defaults: 'Assets' },
              )}
              className={homeStyle.assetsHeader}
            >
              <div className={homeStyle.search}>
                <SearchInput
                  onChange={this.handleSearchQueryInput}
                />
              </div>
              {isInManageMode
                ? (
                  <Button
                    className={`__save-button ${homeStyle.save}`}
                    theme='additional'
                    onClick={this.handleLeaveManageMode}
                  >
                    {i18n._(
                      'Home.assets.save',
                      null,
                      { defaults: 'Save' },
                    )}
                  </Button>
                )
                : (
                  <Button
                    className='__manage-button'
                    theme='additional-icon'
                    onClick={this.handleEnterManageMode}
                  >
                    <JIcon
                      name='ic_manage_24-use-fill'
                      className={`${Button.iconClassName}`}
                    />
                    {i18n._(
                      'Home.assets.manage',
                      null,
                      { defaults: 'Manage' },
                    )}
                  </Button>
                )
              }
            </Header>
          </div>
          <div className={homeStyle.content}>
            {isEmptyAssetsList
              ? this.renderEmptyList()
              : this.renderAssetsList(filteredItems)
            }
          </div>
        </section>
      </div>
    )
  }
}

export const HomeView = withI18n()(
  HomeViewComponent,
)
