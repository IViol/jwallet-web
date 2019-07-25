// @flow strict

import React from 'react'
import classNames from 'classnames'
import { useI18n } from 'app/hooks'

import svgLogoWhite from 'public/assets/logo/logo-white.svg'
import { JLink } from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

import { Back } from './components/Back'
import { Wallet } from './components/Wallet'
import { Actions } from './components/Actions'
import { Network } from './components/Network'

import {
  getMenuMeta,
  type MenuMeta,
} from './menuMeta'

type Props = {|
  +routeName: string,
|}

export function MenuPanel({ routeName }: Props) {
  const i18n = useI18n()
  const menuMeta: MenuMeta = getMenuMeta(routeName)

  const {
    isMinimized,
    previousRoute,
  }: MenuMeta = menuMeta

  return (
    <header
      className={classNames(
        '__menu-panel',
        menuPanelStyle.core,
        isMinimized && menuPanelStyle.minimized,
      )}
    >
      <Network />
      <JLink
        href='/'
        className={classNames(
          '__logo',
          menuPanelStyle.logo,
        )}
      >
        <img
          src={svgLogoWhite}
          alt={i18n._(
            'layout.MenuLayout.logo.alt',
            null,
            { defaults: 'Jwallet Logo' },
          )}
          width='136'
          height='48'
          className={menuPanelStyle.logoImage}
        />
      </JLink>
      <Wallet />
      <Actions routeName={routeName} />
      <Back
        previousRoute={previousRoute}
        isMinimized={isMinimized}
      />
    </header>
  )
}
