// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { i18n } from 'i18n/lingui'

import {
  SearchInput,
  DigitalAssetsManage,
} from 'components'

import {
  JIcon,
  JText,
  JLink,
  JLinkBack,
} from 'components/base'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +setSearchQuery: (string) => void,
  +deleteCustomAsset: (Address) => void,
  +setAssetIsActive: (Address, boolean) => void,
  +items: DigitalAssetWithBalance[],
|}

class DigitalAssetsManageView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      items,
      setSearchQuery,
      deleteCustomAsset,
      setAssetIsActive,
    } = this.props

    return (
      <div className='digital-assets-manage-view'>
        <div className='header'>
          <div className='container'>
            <div className='title'>
              <JText
                size='tab'
                color='gray'
                value={i18n._(
                  'AssetsManage.title',
                  null,
                  { defaults: 'Assets manager' },
                )}
              />
            </div>
            <div className='actions'>
              <div className='search'>
                <SearchInput onChange={setSearchQuery} />
              </div>
              <JLink
                href='/assets/add'
                className='button add'
                title={i18n._(
                  'AssetsManage.add',
                  null,
                  { defaults: 'Add asset' },
                )}
              >
                <JIcon name='add' color='gray' />
              </JLink>
              <JLinkBack
                routeName='Wallet'
                className='button close'
                title={i18n._(
                  'AssetsManage.close',
                  null,
                  { defaults: 'Close' },
                )}
              >
                <JIcon name='cross' color='gray' />
              </JLinkBack>
            </div>
          </div>
        </div>
        <div className='content'>
          <Scrollbars autoHide>
            <DigitalAssetsManage
              setAssetIsActive={setAssetIsActive}
              deleteCustomAsset={deleteCustomAsset}
              items={items}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsManageView
