// @flow

/* eslint-disable max-len */

const ETHEREUM: DigitalAsset = {
  symbol: 'ETH',
  name: 'Ethereum',
  isActive: true,
  blockchainParams: {
    type: 'ethereum',
    address: 'Ethereum',
    decimals: 18,
    staticGasAmount: 21000,
    deploymentBlockNumber: 0,
  },
  display: {
    isDefaultForcedDisplay: true,
    digitalAssetsListPriority: 1050,
  },
  assetPage: {
    description: 'Ether is a cryptocurrency whose blockchain is generated by the Ethereum platform. Ether can be transferred between accounts and used to compensate participant mining nodes for computations performed. Ethereum provides a decentralized Turing-complete virtual machine, the Ethereum Virtual Machine (EVM), which can execute scripts using an international network of public nodes. \'Gas\', an internal transaction pricing mechanism, is used to mitigate spam and allocate resources on the network.',
    urls: [
      {
        type: 'site',
        url: 'https://www.ethereum.org/',
      },
      {
        type: 'binance',
        url: 'https://info.binance.com/en/currencies/ethereum',
      },
      {
        type: 'coinmarketcap',
        url: 'https://coinmarketcap.com/currencies/ethereum',
      },
    ],
  },
  priceFeed: {
    currencyID: 1027,
    currencyIDType: 'coinmarketcap',
  },
}

/* eslint-enable max-len */

export default ETHEREUM
