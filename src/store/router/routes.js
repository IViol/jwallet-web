// @flow strict

import createRouter5 from 'router5'

import { walletsPlugin } from 'store/plugins'

import {
  WalletNotFoundError,
  WalletInconsistentDataError,
} from 'errors'

import {
  selectActiveWallet,
  selectActiveWalletId,
  selectWalletsItems,
} from 'store/selectors/wallets'

export const router = createRouter5([], {
  allowNotFound: true,
})

export const routes: Array<{|
  +name: string,
  +path: string,
  +hasMenu: boolean,
|}> = [{
  path: '/',
  name: 'Home',
  hasMenu: true,
}, {
  path: '/about',
  name: 'About',
  hasMenu: true,
}, {
  path: '/assets/add',
  name: 'AssetsItemAdd',
  hasMenu: true,
}, {
  path: '/assets',
  name: 'AssetsManage',
  hasMenu: true,
}, {
  path: '/assets/:assetId',
  name: 'AssetsItem',
  hasMenu: true,
}, {
  path: '/assets/:assetId/edit',
  name: 'AssetsItemEdit',
  hasMenu: true,
}, {
  path: '/contacts',
  name: 'Contacts',
  hasMenu: true,
}, {
  path: '/contacts/empty',
  name: 'ContactsEmpty',
  hasMenu: true,
}, {
  path: '/contacts/:contactId',
  name: 'ContactsItem',
  hasMenu: true,
}, {
  path: '/contacts/add?:address&:name&:note',
  name: 'ContactsItemAdd',
  hasMenu: true,
}, {
  path: '/contacts/:contactId/edit',
  name: 'ContactsItemEdit',
  hasMenu: true,
}, {
  path: '/contacts/:contactId/delete',
  name: 'ContactsItemDelete',
  hasMenu: false,
}, {
  path: '/history',
  name: 'History',
  hasMenu: true,
}, {
  path: '/history/:id',
  name: 'HistoryItem',
  hasMenu: true,
}, {
  path: '/history/:id/cancel',
  name: 'HistoryItemCancel',
  hasMenu: true,
}, {
  path: '/history/:id/restart',
  name: 'HistoryItemRestart',
  hasMenu: true,
}, {
  path: '/more',
  name: 'MoreActions',
  hasMenu: true,
}, {
  path: '/receive',
  name: 'Receive',
  hasMenu: true,
}, {
  path: '/send?:asset&:to&:amount',
  name: 'Send',
  hasMenu: true,
}, {
  path: '/settings',
  name: 'Settings',
  hasMenu: true,
}, {
  path: '/settings/currency',
  name: 'SettingsCurrency',
  hasMenu: true,
}, {
  path: '/settings/development',
  name: 'SettingsDevelopment',
  hasMenu: true,
}, {
  path: '/settings/language',
  name: 'SettingsLanguage',
  hasMenu: true,
}, {
  path: '/settings/security-password',
  name: 'SettingsSecurityPassword',
  hasMenu: true,
}, {
  path: '/support',
  name: 'Support',
  hasMenu: true,
}, {
  path: '/wallets',
  name: 'Wallets',
  hasMenu: true,
}, {
  path: '/wallets/create',
  name: 'WalletsCreate',
  hasMenu: true,
}, {
  path: '/wallets/import',
  name: 'WalletsImport',
  hasMenu: true,
}, {
  path: '/wallets/:walletId/backup',
  name: 'WalletsItemBackup',
  hasMenu: true,
}, {
  path: '/wallets/:walletId/addresses',
  name: 'WalletsItemAddresses',
  hasMenu: true,
}, {
  path: '/wallets/:walletId/delete',
  name: 'WalletsItemDelete',
  hasMenu: false,
}, {
  path: '/wallets/:walletId/mode-enable',
  name: 'WalletsItemModeEnable',
  hasMenu: false,
}, {
  path: '/wallets/:walletId/mode-disable',
  name: 'WalletsItemModeDisable',
  hasMenu: true,
}, {
  path: '/wallets/:walletId/upgrade',
  name: 'WalletsItemUpgrade',
  hasMenu: false,
}]

router.add(routes)

// FIXME: this should be removed as soon as we get rid of
// select current wallet that could select nothing
router.canActivate(
  'Home',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    if (selectWalletsItems(state).length === 0) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    if (!selectActiveWalletId(state)) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'Send',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    const activeWallet = selectActiveWallet(state)

    if (activeWallet && activeWallet.isReadOnly) {
      return done({
        redirect: {
          name: 'WalletsItemUpgrade',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsItemBackup',
  () => (
    toState,
    fromState,
    done,
  ) => {
    try {
      const { params } = toState

      if (walletsPlugin.checkWalletReadOnly(params.walletId)) {
        return done({
          redirect: {
            params,
            name: 'WalletsItemUpgrade',
          },
        })
      }
    } catch (error) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsItemDelete',
  () => (
    toState,
    fromState,
    done,
  ) => {
    const { walletId } = toState.params

    try {
      if (!walletsPlugin.getWallet(walletId)) {
        throw new WalletNotFoundError({ walletId })
      }
    } catch (error) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsItemUpgrade',
  () => (
    toState,
    fromState,
    done,
  ) => {
    try {
      if (!walletsPlugin.checkWalletReadOnly(toState.params.walletId)) {
        throw new WalletInconsistentDataError('Wallet is not read only')
      }
    } catch (error) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsItemAddresses',
  () => (
    toState,
    fromState,
    done,
  ) => {
    const { walletId } = toState.params

    try {
      const {
        xpub,
        isSimplified,
      }: Wallet = walletsPlugin.getWallet(walletId)

      if (!xpub || isSimplified) {
        throw new WalletInconsistentDataError('Wallet is not multi-address')
      }
    } catch (error) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsItemModeEnable',
  () => (
    toState,
    fromState,
    done,
  ) => {
    const { params } = toState

    try {
      const {
        xpub,
        isSimplified,
      }: Wallet = walletsPlugin.getWallet(params.walletId)

      if (!xpub) {
        throw new WalletInconsistentDataError('Wallet does not have XPUB')
      }

      if (!isSimplified) {
        return done({
          redirect: {
            params,
            name: 'WalletsItemModeDisable',
          },
        })
      }
    } catch (error) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsItemModeDisable',
  () => (
    toState,
    fromState,
    done,
  ) => {
    const { params } = toState

    try {
      const wallet: Wallet = walletsPlugin.getWallet(params.walletId)

      if (!wallet.xpub) {
        throw new WalletInconsistentDataError('Wallet does not have XPUB')
      }

      if (wallet.isSimplified) {
        return done({
          redirect: {
            params,
            name: 'WalletsItemModeEnable',
          },
        })
      }
    } catch (error) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)
