import { selectActiveWallet } from 'store/selectors/wallets'

export const upgrade = (state, pathname) => {
  if (
    !/^\/upgrade/.test(pathname)
  ) {
    // skip for all except selected paths
    return pathname
  }

  const activeWallet = selectActiveWallet(state)
  if (activeWallet && !activeWallet.isReadOnly) {
    return '/digital-assets/grid'
  }

  return pathname
}
