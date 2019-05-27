// @flow

export { WalletsCreate } from './WalletsCreate/WalletsCreate'
export { WalletsImport } from './WalletsImport/WalletsImport'

export { default as AssetsItem }
  from './Transactions/routes/Asset/TransactionsAssetViewContainer'
export { default as AssetsItemAdd } from './DigitalAssets/routes/AddAsset/AddAssetContainer'
export { default as AssetsItemEdit } from './DigitalAssets/routes/EditAsset/EditAssetContainer'
export { default as AssetsManage }
  from './DigitalAssets/routes/Manage/DigitalAssetsManageViewContainer'
export { default as Contacts }
  from './Favorites/FavoritesIndexViewContainer'
export { default as ContactsItemEdit }
  from './Favorites/routes/Address/FavoritesAddressViewContainer'
export { default as History } from './Transactions/TransactionsIndexViewContainer'
export { default as Home } from './Home/Home'
export { default as Receive }
  from './DigitalAssets/routes/Receive/DigitalAssetsReceiveViewContainer'
export { default as Send }
  from './DigitalAssets/routes/Send/DigitalAssetsSendViewContainer'
export { default as Settings } from './Settings/SettingsIndexViewContainer'
export { default as SettingsCurrency } from './Settings/routes/Currency/CurrencyContainer'
export { default as SettingsSecurityPassword }
  from './Settings/routes/PaymentPassword/PaymentPasswordContainer'
export { default as Wallets } from './Wallets/WalletsIndexViewContainer'
export { default as WalletsItemBackup } from './Wallets/routes/Backup/WalletsBackupViewContainer'
export { default as WalletsItemRemove } from './Wallets/routes/Delete/WalletsDeleteViewContainer'
export { default as WalletsItemRename } from './Wallets/routes/Rename/WalletsRenameViewContainer'
export { default as WalletsItemUpgrade } from './Upgrade/UpgradeViewContainer'

export { HistoryItem } from './HistoryItem/HistoryItem'

export { NotFound } from './NotFound/NotFound'

// not available to user directly

export { SetPassword } from './SetPassword/SetPassword'
export { WalletsStart } from './WalletsStart/WalletsStart'
export { AgreementsView } from './Agreements/AgreementsView'
export { Introduction } from './Introduction/Introduction'
export { default as WalletsAddresses }
  from './Wallets/routes/Addresses/WalletsAddressesViewContainer'
export { default as WalletsRenameAddress }
  from './Wallets/routes/RenameAddress/WalletsRenameAddressViewContainer'

