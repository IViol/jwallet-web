// @flow strict

import React from 'react'

import { JIcon } from 'components/base'

import itemStyles from './walletAddressItem.m.scss'

type Props = {
  +name: string,
  +description: string,
  +address: string,
  +fiatBalance: string,
}

export function WalletAddressItem({
  name,
  description,
  address,
  fiatBalance,
}: Props) {
  return (
    <div className={itemStyles.core}>
      <JIcon className={itemStyles.icon} color='blue' name='0x-use-fill' />
      <div className={itemStyles.wrap}>
        <span className={itemStyles.title}>{name || address}</span>
        <span className={itemStyles.description}>{description}</span>
      </div>
      {fiatBalance &&
      <div className={itemStyles.balance}>
        <span className={itemStyles.value}>{fiatBalance}</span>
      </div>
      }
    </div>
  )
}

WalletAddressItem.defaultProps = {
  name: '',
  description: '',
  fiatBalance: '',
}
