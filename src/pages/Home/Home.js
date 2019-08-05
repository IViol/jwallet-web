// @flow

import { connect } from 'react-redux'

import { setAssetIsActive } from 'store/modules/digitalAssets'
import { selectProcessingBlock } from 'store/selectors/blocks'
import { selectActiveWalletOrThrow } from 'store/selectors/wallets'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'
import { selectTransactionsByOwner } from 'store/selectors/transactions'

import {
  filterAssetsBalances,
  flattenDigitalAssets,
  getDigitalAssetsWithBalance,
} from 'utils/digitalAssets'

import {
  HomeView,
  type Props,
} from './HomeView'

function mapStateToProps(state: AppState) {
  const wallet: Wallet = selectActiveWalletOrThrow(state)
  const assets: DigitalAssets = selectDigitalAssetsItems(state)
  const processingBlock: ?BlockData = selectProcessingBlock(state)
  const txs: ?TransactionsByOwner = selectTransactionsByOwner(state)
  const assetsBalances: ?Balances = selectBalancesByBlockNumber(state)

  /**
   * filterAssetsBalances is necessary to make sure that app displays
   * consistent state of balance+transactions by specific digital asset
   */
  const assetsBalancesFiltered: ?Balances = filterAssetsBalances(
    assetsBalances,
    txs,
    assets,
    processingBlock,
    wallet.createdBlockNumber && wallet.createdBlockNumber.mainnet,
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    flattenDigitalAssets(assets),
    assetsBalancesFiltered,
  )

  return {
    items: assetsWithBalance,
  }
}

const mapDispatchToProps = {
  setAssetIsActive,
}

export default (
  connect< Props, OwnPropsEmpty, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(HomeView)
