// @flow

export const OPEN_VIEW = '@@addAsset/OPEN_VIEW'
export const CLOSE_VIEW = '@@addAsset/CLOSE_VIEW'

export const SET_FIELD = '@@addAsset/SET_FIELD'
export const SET_INVALID_FIELD = '@@addAsset/SET_INVALID_FIELD'

export const START_ASSET_LOADING = '@@addAsset/START_ASSET_LOADING'
export const TERM_ASSET_LOADING = '@@addAsset/TERM_ASSET_LOADING'
export const SET_ASSET_IS_VALID = '@@addAsset/SET_ASSET_IS_VALID'
export const SET_HAS_DEFAULT_FIELDS = '@@addAsset/SET_HAS_DEFAULT_FIELDS'

export const SUBMIT_ASSET_FORM = '@@addAsset/SUBMIT_ASSET_FORM'

export const CLEAN = '@@addAsset/CLEAN'

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function submitAssetForm() {
  return {
    type: SUBMIT_ASSET_FORM,
  }
}

export function startAssetLoading(contractAddress: Address) {
  return {
    type: START_ASSET_LOADING,
    payload: {
      contractAddress,
    },
  }
}

export function terminateAssetLoading() {
  return {
    type: TERM_ASSET_LOADING,
  }
}

export function setIsAssetValid(isAssetValid: boolean) {
  return {
    type: SET_ASSET_IS_VALID,
    payload: {
      isAssetValid,
    },
  }
}

export function setHasDefaultFields(hasDefaultFields: boolean) {
  return {
    type: SET_HAS_DEFAULT_FIELDS,
    payload: hasDefaultFields,
  }
}

export function setField(fieldName: $Keys<EditAssetFormFields>, value: string) {
  return {
    type: SET_FIELD,
    payload: {
      fieldName,
      value,
    },
  }
}

export function setFieldError(fieldName: $Keys<EditAssetFormFields>, message: string) {
  return {
    type: SET_INVALID_FIELD,
    payload: {
      fieldName,
      message,
    },
  }
}

export function clearFieldError(fieldName: $Keys<EditAssetFormFields>) {
  return setFieldError(fieldName, '')
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type AddAssetAction = ExtractReturn<typeof setField> |
  ExtractReturn<typeof setFieldError> |
  ExtractReturn<typeof submitAssetForm> |
  ExtractReturn<typeof startAssetLoading> |
  ExtractReturn<typeof terminateAssetLoading> |
  ExtractReturn<typeof setIsAssetValid> |
  ExtractReturn<typeof setHasDefaultFields> |
  ExtractReturn<typeof clean>

const initialState: AddAssetState = {
  invalidFields: {
    address: '',
    name: '',
    symbol: '',
    decimals: '',
  },
  formFields: {
    address: '',
    name: '',
    symbol: '',
    decimals: '',
  },
  requestedAddress: '',
  isAssetValid: false,
  isAssetLoaded: false,
  isAssetLoading: false,
  hasDefaultFields: false,
}

function addAsset(
  state: AddAssetState = initialState,
  action: AddAssetAction,
): AddAssetState {
  switch (action.type) {
    case SET_FIELD: {
      const {
        value,
        fieldName,
      } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: '',
        },
        formFields: {
          ...state.formFields,
          [fieldName]: value,
        },
      }
    }

    case SET_INVALID_FIELD: {
      const {
        message,
        fieldName,
      } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: message,
        },
      }
    }

    case START_ASSET_LOADING: {
      const { contractAddress } = action.payload

      return {
        ...state,
        isAssetValid: false,
        isAssetLoaded: false,
        isAssetLoading: true,
        requestedAddress: contractAddress,
      }
    }

    case TERM_ASSET_LOADING: {
      return {
        ...state,
        isAssetValid: false,
        isAssetLoaded: false,
        isAssetLoading: false,
        requestedAddress: '',
      }
    }

    case SET_ASSET_IS_VALID: {
      const { isAssetValid } = action.payload

      return {
        ...state,
        isAssetValid,
        isAssetLoaded: true,
        isAssetLoading: false,
        requestedAddress: '',
      }
    }

    case SET_HAS_DEFAULT_FIELDS: {
      return {
        ...state,
        hasDefaultFields: action.payload,
      }
    }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default addAsset
