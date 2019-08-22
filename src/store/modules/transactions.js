// @flow strict

export const FETCH_BY_OWNER_REQUEST = '@@transactions/FETCH_BY_OWNER_REQUEST'

export const RESYNC_TRANSACTIONS_START = '@@transactions/RESYNC_TRANSACTIONS_START'
export const RESYNC_TRANSACTIONS_STOP = '@@transactions/RESYNC_TRANSACTIONS_STOP'

export const INIT_ITEMS_BY_ASSET = '@@transactions/INIT_ITEMS_BY_ASSET'
export const INIT_ITEMS_BY_BLOCK = '@@transactions/INIT_ITEMS_BY_BLOCK'

export const REMOVE_ITEMS_BY_ASSET = '@@transactions/REMOVE_ITEMS_BY_ASSET'

export const FETCH_BY_BLOCK_SUCCESS = '@@transactions/FETCH_BY_BLOCK_SUCCESS'
export const FETCH_BY_BLOCK_ERROR = '@@transactions/FETCH_BY_BLOCK_ERROR'

export const UPDATE_TRANSACTION_DATA = '@@transactions/UPDATE_TRANSACTION_DATA'
export const ADD_PENDING_TRANSACTION = '@@transactions/ADD_PENDING_TRANSACTION'
export const REMOVE_PENDING_TRANSACTION = '@@transactions/REMOVE_PENDING_TRANSACTION'
export const REMOVE_PENDING_TRANSACTIONS = '@@transactions/REMOVE_PENDING_TRANSACTIONS'

export const CHANGE_SEARCH_INPUT = '@@transactions/CHANGE_SEARCH_INPUT'
export const SET_ERROR_FILTER = '@@transactions/SET_ERROR_FILTER'
export const SET_STUCK_FILTER = '@@transactions/SET_STUCK_FILTER'
export const SET_PENDING_FILTER = '@@transactions/SET_PENDING_FILTER'

type UpdateTransactionData = {|
  +data?: TransactionData,
  +blockData?: TransactionBlockData,
  +receiptData?: TransactionReceiptData,
|}

export function fetchByOwnerRequest(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  toBlock: number,
) {
  return {
    type: FETCH_BY_OWNER_REQUEST,
    payload: {
      requestQueue,
      networkId,
      ownerAddress,
      toBlock,
    },
  }
}

export function resyncTransactionsStart(
  requestQueue: Channel,
  toBlock: number,
) {
  return {
    type: RESYNC_TRANSACTIONS_START,
    payload: {
      requestQueue,
      toBlock,
    },
  }
}

export function resyncTransactionsStop() {
  return {
    type: RESYNC_TRANSACTIONS_STOP,
  }
}

export function initItemsByAsset(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  isExistedIgnored?: boolean = false,
) {
  return {
    type: INIT_ITEMS_BY_ASSET,
    payload: {
      networkId,
      assetAddress,
      ownerAddress,
      isExistedIgnored,
    },
  }
}

export function initItemsByBlock(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
) {
  return {
    type: INIT_ITEMS_BY_BLOCK,
    payload: {
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export function removeItemsByAsset(assetAddress: AssetAddress) {
  return {
    type: REMOVE_ITEMS_BY_ASSET,
    payload: {
      assetAddress,
    },
  }
}

export function fetchByBlockError(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
) {
  return {
    type: FETCH_BY_BLOCK_ERROR,
    payload: {
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export function fetchByBlockSuccess(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  items: Transactions,
) {
  return {
    type: FETCH_BY_BLOCK_SUCCESS,
    payload: {
      items,
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export function updateTransactionData(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  transactionId: TransactionId,
  updateData: UpdateTransactionData,
) {
  return {
    type: UPDATE_TRANSACTION_DATA,
    payload: {
      updateData,
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
      transactionId,
    },
  }
}

export function addPendingTransaction(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  data: Transaction,
) {
  return {
    type: ADD_PENDING_TRANSACTION,
    payload: {
      data,
      networkId,
      assetAddress,
      ownerAddress,
    },
  }
}

export function removePendingTransaction(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  txHash: Hash,
) {
  return {
    type: REMOVE_PENDING_TRANSACTION,
    payload: {
      txHash,
      networkId,
      assetAddress,
      ownerAddress,
    },
  }
}

export function removePendingTransactions(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
) {
  return {
    type: REMOVE_PENDING_TRANSACTIONS,
    payload: {
      networkId,
      assetAddress,
      ownerAddress,
    },
  }
}

export function changeSearchInput(searchQuery: string) {
  return {
    type: CHANGE_SEARCH_INPUT,
    payload: {
      searchQuery,
    },
  }
}

export function setErrorFilter(payload: boolean) {
  return {
    type: SET_ERROR_FILTER,
    payload,
  }
}

export function setStuckFilter(payload: boolean) {
  return {
    type: SET_STUCK_FILTER,
    payload,
  }
}

export function setPendingFilter(payload: boolean) {
  return {
    type: SET_PENDING_FILTER,
    payload,
  }
}

type TransactionsAction =
  ExtractReturn<typeof fetchByOwnerRequest> |
  ExtractReturn<typeof initItemsByAsset> |
  ExtractReturn<typeof initItemsByBlock> |
  ExtractReturn<typeof removeItemsByAsset> |
  ExtractReturn<typeof fetchByBlockSuccess> |
  ExtractReturn<typeof fetchByBlockError> |
  ExtractReturn<typeof updateTransactionData> |
  ExtractReturn<typeof addPendingTransaction> |
  ExtractReturn<typeof changeSearchInput> |
  ExtractReturn<typeof setErrorFilter> |
  ExtractReturn<typeof setStuckFilter> |
  ExtractReturn<typeof setPendingFilter>

const initialState: TransactionsState = {
  persist: {
    items: {},
    pending: {},
  },
  searchQuery: '',
  isErrorFiltered: false,
  isStuckFiltered: false,
  isPendingFiltered: false,
}

function transactions(
  state: TransactionsState = initialState,
  action: TransactionsAction,
): TransactionsState {
  switch (action.type) {
    case FETCH_BY_OWNER_REQUEST: {
      const { items } = state.persist

      const {
        networkId,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: ?TransactionsByOwner = itemsByNetworkId[ownerAddress]

      return itemsByOwner ? state : {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: null,
            },
          },
        },
      }
    }

    case INIT_ITEMS_BY_ASSET: {
      const { items } = state.persist

      const {
        networkId,
        assetAddress,
        ownerAddress,
        isExistedIgnored,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: ?TransactionsByAssetAddress = itemsByOwner[assetAddress]

      return (itemsByAsset && !isExistedIgnored) ? state : {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [assetAddress]: null,
              },
            },
          },
        },
      }
    }

    case INIT_ITEMS_BY_BLOCK: {
      const { items } = state.persist

      const {
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}
      const itemsByBlock: ?TransactionsByBlockNumber = itemsByAsset[blockNumber]

      return itemsByBlock ? state : {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {},
                },
              },
            },
          },
        },
      }
    }

    case FETCH_BY_BLOCK_SUCCESS: {
      const {
        items,
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}

      const itemsByBlock: TransactionsByBlockNumber = itemsByAsset[blockNumber] || {
        items: {},
      }

      const oldTransactions: Transactions = itemsByBlock.items || {}

      const newTransactions: Transactions = Object
        .keys(items)
        .reduce((result: Transactions, id: TransactionId): Transactions => {
          if (!result[id]) {
            return {
              ...result,
              [id]: items[id],
            }
          }

          return {
            ...result,
            [id]: {
              ...result[id],
              ...items[id],
            },
          }
        }, oldTransactions)

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...state.persist.items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {
                    ...itemsByBlock,
                    isError: false,
                    items: newTransactions,
                  },
                },
              },
            },
          },
        },
      }
    }

    case UPDATE_TRANSACTION_DATA: {
      const {
        updateData,
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
        transactionId,
      } = action.payload

      const { items } = state.persist
      const itemsByNetworkId: TransactionsByNetworkId = items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}

      const itemsByBlock: TransactionsByBlockNumber = itemsByAsset[blockNumber] || {
        items: {},
      }

      const oldTransactions: Transactions = itemsByBlock.items || {}

      const newTransactions: Transactions = Object
        .keys(oldTransactions)
        .reduce((result: Transactions, id: TransactionId): Transactions => {
          if (id !== transactionId) {
            return result
          }

          return {
            ...result,
            [id]: {
              ...result[id],
              ...updateData,
            },
          }
        }, oldTransactions)

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {
                    ...itemsByBlock,
                    items: newTransactions,
                  },
                },
              },
            },
          },
        },
      }
    }

    case ADD_PENDING_TRANSACTION: {
      const {
        data,
        networkId,
        assetAddress,
        ownerAddress,
      } = action.payload

      const { pending } = state.persist
      const pendingByNetworkId: PendingTransactionsByNetworkId = pending[networkId] || {}
      const pendingByOwner: PendingTransactionsByOwner = pendingByNetworkId[ownerAddress] || {}
      const pendingByAsset: Transactions = pendingByOwner[assetAddress] || {}

      return {
        ...state,
        persist: {
          ...state.persist,
          pending: {
            ...pending,
            [networkId]: {
              ...pendingByNetworkId,
              [ownerAddress]: {
                ...pendingByOwner,
                [assetAddress]: {
                  ...pendingByAsset,
                  [data.hash]: data,
                },
              },
            },
          },
        },
      }
    }

    case REMOVE_PENDING_TRANSACTION: {
      const {
        txHash,
        networkId,
        assetAddress,
        ownerAddress,
      } = action.payload

      const { pending } = state.persist
      const pendingByNetworkId: PendingTransactionsByNetworkId = pending[networkId] || {}
      const pendingByOwner: PendingTransactionsByOwner = pendingByNetworkId[ownerAddress] || {}
      const pendingByAsset: Transactions = pendingByOwner[assetAddress] || {}

      const pendingByAssetNew: Transactions = Object.keys(pendingByAsset).reduce((
        result: Transactions,
        hash: Hash,
      ): Transactions => (hash === txHash) ? result : {
        ...result,
        [hash]: pendingByAsset[hash],
      }, {})

      return {
        ...state,
        persist: {
          ...state.persist,
          pending: {
            ...pending,
            [networkId]: {
              ...pendingByNetworkId,
              [ownerAddress]: {
                ...pendingByOwner,
                [assetAddress]: {
                  ...pendingByAssetNew,
                },
              },
            },
          },
        },
      }
    }

    case REMOVE_PENDING_TRANSACTIONS: {
      const {
        networkId,
        assetAddress,
        ownerAddress,
      } = action.payload

      const { pending } = state.persist
      const pendingByNetworkId: PendingTransactionsByNetworkId = pending[networkId] || {}
      const pendingByOwner: PendingTransactionsByOwner = pendingByNetworkId[ownerAddress] || {}

      return {
        ...state,
        persist: {
          ...state.persist,
          pending: {
            ...pending,
            [networkId]: {
              ...pendingByNetworkId,
              [ownerAddress]: {
                ...pendingByOwner,
                [assetAddress]: null,
              },
            },
          },
        },
      }
    }

    case FETCH_BY_BLOCK_ERROR: {
      const { items } = state.persist

      const {
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}

      const itemsByBlock: TransactionsByBlockNumber = itemsByAsset[blockNumber] || {
        items: {},
      }

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {
                    ...itemsByBlock,
                    isError: true,
                  },
                },
              },
            },
          },
        },
      }
    }

    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      }

    case SET_ERROR_FILTER:
      return {
        ...state,
        isErrorFiltered: action.payload,
      }

    case SET_STUCK_FILTER:
      return {
        ...state,
        isStuckFiltered: action.payload,
      }

    case SET_PENDING_FILTER:
      return {
        ...state,
        isPendingFiltered: action.payload,
      }

    default:
      return state
  }
}

export default transactions
