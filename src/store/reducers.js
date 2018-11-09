// @flow

import storage from 'localforage'
import { combineReducers, type Reducer } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

import { type AppActions } from 'routes'

// wallets
import wallets from 'routes/Wallets/modules/wallets'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'
import walletsRenameAddress from 'routes/Wallets/routes/RenameAddress/modules/walletsRenameAddress'

// Digital ssets
import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'
import addAsset from 'routes/DigitalAssets/routes/AddAsset/modules/addAsset'
import digitalAssetsGrid from 'routes/DigitalAssets/routes/Grid/modules/digitalAssetsGrid'
// import editAsset from 'routes/DigitalAssets/routes/EditAsset/modules/editAsset'
// import digitalAssetsSettings
//   from 'routes/DigitalAssets/routes/Settings/modules/digitalAssetsSettings'

// networks
import networks from 'routes/modules/networks'

// transactions
import transactions from 'routes/Transactions/modules/transactions'

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets', 'walletsAddresses'],
}

export function makeRootReducer() {
  const rootReducer: Reducer<AppState, AppActions> = combineReducers({
    // wallets
    wallets,
    walletsCreate,
    walletsImport,
    walletsBackup,
    walletsAddresses,
    walletsRenameAddress,
    // networks
    networks,
    // digitalAssets
    digitalAssets,
    digitalAssetsGrid,
    addAsset,
    // transactions
    transactions,
    // router
    router,
  })

  return persistReducer/* :: < AppState, AppActions > */(persistConfig, rootReducer)
}
