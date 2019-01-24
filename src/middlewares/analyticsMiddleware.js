import {
  gaSetUserMetric,
  gaSetUserDimension,
  METRICS,
  DIMENSIONS,
} from 'utils/analytics'

import {
  ADD_CUSTOM_ASSET,
  DELETE_CUSTOM_ASSET,
  SET_ASSET_IS_ACTIVE,
} from 'routes/DigitalAssets/modules/digitalAssets'
import { selectCustomDigitalAssets, selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

import { CHANGE_LOCAL_CURRENCY } from 'routes/Settings/modules/settings'
import { selectSettings } from 'store/selectors/settings'

import { SET_WALLETS, SET_WALLETS_ITEMS } from 'routes/Wallets/modules/wallets'
import { selectWalletsItems } from 'store/selectors/wallets'

import {
  ADD_AUTO as FAVORITES_ADD_AUTO,
  ADD_BY_USER as FAVORITES_ADD_BY_USER,
  REMOVE as FAVORITES_REMOVE,
} from 'routes/Favorites/modules/favorites'
import { selectFavoritesItems } from 'store/selectors/favorites'

export const analyticsMiddleware = store => next => (action) => {
  next(action)
  const state = store.getState()

  switch (action.type) {
    case SET_WALLETS:
    case SET_WALLETS_ITEMS: {
      /* eslint-disable no-param-reassign, fp/no-mutation */
      // because reduce is designed to work this way
      const stats = selectWalletsItems(state).reduce((memo, wallet) => {
        memo.total += 1
        if (wallet.isReadOnly) {
          memo.readonly += 1
        }
        if (wallet.type === 'mnemonic') {
          memo.mnemonic += 1
        }
        return memo
      }, {
        total: 0,
        readonly: 0,
        mnemonic: 0,
      })
      /* eslint-enable no-param-reassign, fp/no-mutation */
      gaSetUserMetric(METRICS.WALLETS, stats.total)
      gaSetUserMetric(METRICS.WALLETS_READONLY, stats.readonly)
      gaSetUserMetric(METRICS.WALLETS_MNEMONIC, stats.mnemonic)
      break
    }
    case ADD_CUSTOM_ASSET:
    case DELETE_CUSTOM_ASSET: {
      const quantity = selectCustomDigitalAssets(state).length
      gaSetUserMetric(METRICS.ASSETS_CUSTOM, quantity)
      break
    }
    case SET_ASSET_IS_ACTIVE: {
      const quantity = selectActiveDigitalAssets(state).length
      gaSetUserMetric(METRICS.ASSETS_ACTIVE, quantity)
      break
    }
    case CHANGE_LOCAL_CURRENCY: {
      const { localCurrencyCode } = selectSettings(state)
      gaSetUserDimension(DIMENSIONS.CURRENCY, localCurrencyCode)
      break
    }
    case FAVORITES_ADD_AUTO:
    case FAVORITES_ADD_BY_USER:
    case FAVORITES_REMOVE: {
      gaSetUserMetric(METRICS.FAVORITES, selectFavoritesItems(state).length)
      break
    }
    default: {
      // do nothing
    }
  }
}
