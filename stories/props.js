
import getFormattedDateString from '../src/utils/time/getFormattedDateString'

const keys = [
  {
    privateKey: '0x12E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 12.990, code: 'ETH',
  },
  {
    privateKey: '0x22E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 12.990, code: 'ETH',
  },
  {
    privateKey: '0x32E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 12.990, code: 'ETH',
  },
  {
    privateKey: '0x42E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 12.990, code: 'ETH',
  },
  {
    privateKey: '0x52E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 12.990, code: 'ETH',
  },
  {
    privateKey: '0x62E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 12.990, code: 'ETH',
  },
]

export default {
  accountsStyle: {
    backgroundColor: '#2d2c3e',
    background: 'linear-gradient(to top, #2d2c3e, #474667)',
  },
  currencyList: [
    { text: 'USD' },
    { text: 'EUR' },
    { text: 'GBK' },
  ],
  loaderStyle: {
    width: '200px', height: '100px', position: 'relative', border: '3px solid #999',
  },
  keysManagerProps: {
    setActiveKey: index => alert(`Key ${index + 1} picked`),
    addNewKeys: () => alert('addNewKeys handler'),
    importKeys: () => alert('importKeys handler'),
    backupKeys: () => alert('backupKeys handler'),
    clearKeys: () => alert('clearKeys handler'),
    keys: {
      items: keys,
      currentActiveIndex: 1,
    },
  },
  transactions: [{
    type: 'receive',
    symbol: 'ETH',
    status: 'Pending',
    from: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x02360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    address: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 0.21234,
    amountFixed: '0.212',
    timestamp: (new Date()).setDate(11),
    date: getFormattedDateString((new Date()).setDate(11)),
  }, {
    type: 'send',
    symbol: 'ETH',
    status: 'Accepted',
    from: '0x03360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x04360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    address: '0x04360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 9.23456,
    amountFixed: '9.234',
    timestamp: (new Date()).setDate(1),
    date: getFormattedDateString((new Date()).setDate(1)),
  }, {
    type: 'receive',
    symbol: 'ETH',
    status: 'Rejected',
    from: '0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x06360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    address: '0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 6.78900009765,
    amountFixed: '6.789',
    timestamp: (new Date()).setDate(21),
    date: getFormattedDateString((new Date()).setDate(21)),
  }, {
    type: 'send',
    symbol: 'ETH',
    status: 'Waiting',
    from: '0x07360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x08360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    address: '0x08360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 3.12313123213,
    amountFixed: '3.123',
    timestamp: (new Date()).setDate(3),
    date: getFormattedDateString((new Date()).setDate(3)),
  }],
  accounts: [{
    name: 'Ethereum',
    symbol: 'ETH',
    balanceFixed: '2.123',
    balance: 2.123,
    isLicensed: false,
    isAuthRequired: false,
    isActive: true,
    isCurrent: false,
  }, {
    name: 'Jibrel USD',
    symbol: 'jUSD',
    balance: 7.890,
    balanceFixed: '7.89000',
    isLicensed: false,
    isAuthRequired: false,
    isActive: true,
    isCurrent: true,
  }, {
    name: 'Jibrel Euro',
    symbol: 'jEUR',
    balance: 8.657,
    balanceFixed: '8.65777',
    isLicensed: false,
    isAuthRequired: true,
    isActive: true,
    isCurrent: false,
  }, {
    name: 'Jibrel Network Token',
    symbol: 'JNT',
    balance: 9.999,
    balanceFixed: '9.99999',
    isLicensed: true,
    isAuthRequired: true,
    isActive: true,
    isCurrent: false,
  }],
  QRcodeConfigsBasic: {
    to: '0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8',
    value: 100,
    gas: 42000,
  },
  QRcodeConfigsUI: {
    size: 350,
    errorCorrectionLevel: 'high',
    color: {
      light: '#ffcc00ff',
      dark: '#001111ff',
    },
  },
  textInputStyle: {
    zIndex: 1,
    position: 'relative',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
  },
}
