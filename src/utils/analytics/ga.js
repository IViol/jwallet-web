// @flow strict

// import { getAgreementValue } from 'utils/agreements'

type GAException = {|
  +exDescription?: string,
  +exFatal?: boolean,
|}

const REPORTED_ONCE = {}

// numeric parameters for analytics
export const METRICS = {
  WALLETS: 'metric1',
  WALLETS_READONLY: 'metric2',
  WALLETS_MNEMONIC: 'metric3',
  ASSETS_ACTIVE: 'metric4',
  ASSETS_CUSTOM: 'metric5',
  FAVORITES: 'metric6',
}

// string parameters for analytics
export const DIMENSIONS = {
  CURRENCY: 'dimension1',
  LANGUAGE: 'dimension2',
  FIRST_WALLET_DATE: 'dimension3',
  TRANSACTION_ASSET_SYMBOL: 'dimension4',
  TRANSACTION_PRIORITY: 'dimension5',
}

const reportOnce = (message) => {
  if (!REPORTED_ONCE[message]) {
    // eslint-disable-next-line fp/no-mutation
    REPORTED_ONCE[message] = true
    // eslint-disable-next-line no-console
    console.warn(message)
  }
}

// We pass parameters directly to external library function, so:
// eslint-disable-next-line fp/no-rest-parameters
export const ga = (...args) => {
  // if (getAgreementValue('consentTrackingCookies')) {
  try {
    window.ga(...args)
  } catch (err) {
    reportOnce('Google Analytics is not available')
  }
  // }
}

export const gaSendPageView = (location) => {
  ga('send', 'pageview', location)
}

// eslint-disable-next-line fp/no-rest-parameters
export const gaSendEvent = (...args) => {
  ga('send', 'event', ...args)
}

export const gaSendException = (gaException: GAException) => {
  ga('send', 'exception', gaException)
}

export const gaSetUserMetric = (metric, value) => {
  if (!metric) {
    reportOnce('You tried to set undefined metric')
  } else {
    ga('set', metric, value)
  }
}

export const gaSetUserDimension = (dimension, text) => {
  if (!dimension) {
    reportOnce('You tried to set undefined dimension')
  } else {
    ga('set', dimension, text)
  }
}
