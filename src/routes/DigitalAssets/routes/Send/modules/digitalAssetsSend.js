// @flow

export const OPEN_VIEW = '@@digitalAssetsSend/OPEN_VIEW'

export const SET_PRIORITY = '@@digitalAssetsSend/SET_PRIORITY'
export const SET_IS_LOADING = '@@digitalAssetsSend/SET_IS_LOADING'
export const GO_TO_NEXT_STEP = '@@digitalAssetsSend/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP = '@@digitalAssetsSend/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP = '@@digitalAssetsSend/SET_CURRENT_STEP'

export const SET_FORM_FIELD_VALUE = '@@digitalAssetsSend/SET_FORM_FIELD_VALUE'
export const SET_FORM_FIELD_ERROR = '@@digitalAssetsSend/SET_FORM_FIELD_ERROR'

export const CLEAN = '@@digitalAssetsSend/CLEAN'

export const STEPS: DigitalAssetsSendSteps = {
  FORM: 0,
  CONFIRM: 1,
}

export const TXPRIORITY: TXPriority = {
  LOW: 1,
  NORMAL: 1.5,
  HIGH: 2,
  CUSTOM: 0,
}

export function openView(params?: DigitalAssetsSendRouteParams) {
  return {
    type: OPEN_VIEW,
    payload: {
      params,
    },
  }
}

export function setPriority(priority: TXPriorityKey) {
  return {
    type: SET_PRIORITY,
    payload: {
      priority,
    },
  }
}

export function setIsLoading(isLoading: boolean) {
  return {
    type: SET_IS_LOADING,
    payload: {
      isLoading,
    },
  }
}

export function goToNextStep() {
  return {
    type: GO_TO_NEXT_STEP,
  }
}

export function goToPrevStep() {
  return {
    type: GO_TO_PREV_STEP,
  }
}

export function setCurrentStep(currentStep: DigitalAssetsSendStepIndex) {
  return {
    type: SET_CURRENT_STEP,
    payload: {
      currentStep,
    },
  }
}

export function setFormFieldValue(
  fieldName: $Keys<DigitalAssetsSendFormFields>,
  value: string,
) {
  return {
    type: SET_FORM_FIELD_VALUE,
    payload: {
      value,
      fieldName,
    },
  }
}

export function setFormFieldError(
  fieldName: $Keys<DigitalAssetsSendFormFields>,
  message: string,
) {
  return {
    type: SET_FORM_FIELD_ERROR,
    payload: {
      message,
      fieldName,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type DigitalAssetsSendAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof setIsLoading> |
  ExtractReturn<typeof goToNextStep> |
  ExtractReturn<typeof goToPrevStep> |
  ExtractReturn<typeof setCurrentStep> |
  ExtractReturn<typeof setFormFieldValue> |
  ExtractReturn<typeof setFormFieldError> |
  ExtractReturn<typeof clean>

const initialState: DigitalAssetsSendState = {
  formFieldValues: {
    nonce: '',
    amount: '',
    comment: '',
    gasLimit: '',
    gasPrice: '',
    password: '',
    recepient: '',
    amountFiat: '',
    assetAddress: '',
  },
  formFieldErrors: {
    nonce: '',
    amount: '',
    comment: '',
    gasLimit: '',
    gasPrice: '',
    password: '',
    recepient: '',
    amountFiat: '',
    assetAddress: '',
  },
  currentStep: STEPS.FORM,
  priority: 'NORMAL',
  isLoading: false,
}

function digitalAssetsSend(
  state: DigitalAssetsSendState = initialState,
  action: DigitalAssetsSendAction,
): DigitalAssetsSendState {
  switch (action.type) {
    case SET_PRIORITY:
      return {
        ...state,
        priority: action.payload.priority,
      }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }

    case SET_FORM_FIELD_VALUE: {
      const {
        value,
        fieldName,
      } = action.payload

      return {
        ...state,
        formFieldErrors: {
          ...state.formFieldErrors,
          [fieldName]: '',
        },
        formFieldValues: {
          ...state.formFieldValues,
          [fieldName]: value,
        },
      }
    }

    case SET_FORM_FIELD_ERROR: {
      const {
        message,
        fieldName,
      } = action.payload

      return {
        ...state,
        formFieldErrors: {
          ...state.formFieldErrors,
          [fieldName]: message,
        },
      }
    }

    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload.currentStep,
      }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default digitalAssetsSend