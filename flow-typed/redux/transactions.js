// @flow strict

declare type Hash = string
// TransactionId consist of: `${txHash}${?txLogIndex}`
declare type TransactionId = string

declare type TransactionFromBlockExplorer = {|
  +hash: Hash,
  +to: string,
  +from: string,
  /**
   * input field is always presented in transaction payload
   * when input is empty, the field has value "0x"
   *
   * it is necessary to define "abstract" contract method call
   */
  +input: string,
  +value: string,
  +gasUsed: string,
  +isError: string,
  +blockHash: Hash,
  +gasPrice: string,
  +timeStamp: string,
  +blockNumber: string,
  +contractAddress: string,
  +nonce: string,
|}

declare type ERC20EventName = 'Transfer'
declare type JNTEventName = 'MintEvent' | 'BurnEvent'
declare type SmartContractEventName = ERC20EventName | JNTEventName

declare type SmartContractEventProps = {|
  +options: SmartContractEventOptions,
  +rpcaddr: string,
  +rpcport: number,
  +ssl: boolean,
|}

declare type SmartContractEventFilter = {|
  +to?: OwnerAddress,
  +from?: OwnerAddress,
  +owner?: OwnerAddress,
|}

declare type SmartContractEventOptions = {|
  +topics: Array<?string>,
  +address: Address,
  +toBlock: string,
  +fromBlock: string,
|}

declare type JNTEventArgs = {|
  +owner: string,
  +value: string,
|}

declare type TransferEventArgs = {|
  +to: string,
  +from: string,
  +value: string,
|}

declare type TransferEventFromEthereumNode = {|
  +args: TransferEventArgs,
  +event: string,
  +address: string,
  +blockHash: ?string,
  +transactionHash: string,
  +logIndex: number,
  +blockNumber: ?number,
  +removed: boolean,
|}

declare type JNTEventFromEthereumNode = {|
  +args: JNTEventArgs,
  +event: string,
  +address: string,
  +blockHash: ?string,
  +transactionHash: string,
  +logIndex: number,
  +blockNumber: ?number,
  +removed: boolean,
|}

/**
 * status of transaction
 * 0 - fail
 * 1 - success
 */
declare type TransactionStatus = 0 | 1

/**
 * type of event
 * 0 - ETH Transaction
 * 1 - ERC20 Transfer
 * 2 - JNT Mint/Burn
 */
declare type TransactionEventType = 0 | 1 | 2

declare type TransactionData = {|
  +gasPrice: string,
  +nonce: number,
  +hasInput: boolean,
|}

declare type TransactionBlockData = {|
  +timestamp: number,
|}

declare type TransactionReceiptData = {|
  +gasUsed: number,
  +status: TransactionStatus,
|}

declare type TransactionContractTransferData = {|
  +amount: string,
  +to: OwnerAddress,
|}

declare type Transaction = {|
  +data: ?TransactionData,
  +blockData: ?TransactionBlockData,
  +receiptData: ?TransactionReceiptData,
  +contractTransferData?: TransactionContractTransferData,
  +hash: Hash,
  +amount: string,
  +blockHash: ?Hash,
  +to: ?OwnerAddress,
  +from: ?OwnerAddress,
  +contractAddress: ?OwnerAddress,
  +blockNumber: ?number,
  +eventType: TransactionEventType,
  +isRemoved: boolean,
|}

declare type TransactionPrimaryKeys = {|
  +id: TransactionId,
  +blockNumber: BlockNumber,
  +assetAddress: AssetAddress,
|}

declare type TransactionWithPrimaryKeys = {|
  ...Transaction,
  +keys: TransactionPrimaryKeys,
|}

declare type TransactionWithNoteAndNames = {|
  ...TransactionWithPrimaryKeys,
  // fields below are necessary for searching
  +note: ?string,
  +toName: ?string,
  +fromName: ?string,
|}

declare type Transactions = {
  [TransactionId]: ?Transaction,
}

declare type TransactionsByBlockNumber = {|
  +items?: Transactions,
  +isError?: boolean,
|}

declare type TransactionsByAssetAddress = {
  [BlockNumber]: ?TransactionsByBlockNumber,
}

declare type TransactionsByOwner = {
  [AssetAddress]: ?TransactionsByAssetAddress,
}

declare type TransactionsByNetworkId = {
  [OwnerAddress]: ?TransactionsByOwner,
}

declare type TransactionsItems = {
  [NetworkId]: ?TransactionsByNetworkId,
}

declare type PendingTransactionsByOwner = {
  [AssetAddress]: ?Transactions,
}

declare type PendingTransactionsByNetworkId = {
  [OwnerAddress]: ?PendingTransactionsByOwner,
}

declare type PendingTransactionsItems = {
  [NetworkId]: ?PendingTransactionsByNetworkId,
}

declare type TransactionsPersist = {|
  +items: TransactionsItems,
  +pending: PendingTransactionsItems,
|}

declare type TransactionsState = {|
  +persist: TransactionsPersist,
  +searchQuery: string,
  +isErrorFiltered: boolean,
  +isStuckFiltered: boolean,
  +isPendingFiltered: boolean,
|}
