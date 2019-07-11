// @flow strict

import classNames from 'classnames'
import React from 'react'
import { useI18n } from 'app/hooks'

import { JLink } from 'components/base'

import svgLogoWhite from 'public/assets/logo/logo-white.svg'

import menuPanelStyle from './menuPanel.m.scss'

import {
  getMenuMeta,
  type MenuMeta,
} from './menuMeta'

import { Wallet } from './components/Wallet'
import { Back } from './components/Back'
import { Actions } from './components/Actions'
import { Network } from './components/Network'

type Props = {|
  +routeName: string,
|}

export function MenuPanel({
  routeName,
}: Props) {
  const i18n = useI18n()

  const menuMeta: MenuMeta = getMenuMeta(routeName)
  const {
    isMinimized,
    previousRouteNameFallback,
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
            'Menu.logo.alt',
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
        previousRouteNameFallback={previousRouteNameFallback}
        isMinimized={isMinimized}
      />
    </header>
  )
}
