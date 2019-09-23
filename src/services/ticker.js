// @flow strict

import config from 'config'
import getENVVar from 'utils/config/getENVVar'
import { typeUtils } from 'utils'
import { CURRENCIES } from 'data'

type TickerAPIParams = {|
  +base_asset: FiatId[],
  +quote_asset: FiatCurrency[],
|}

const { tickerAPIOptions }: AppConfig = config
const AVAILABLE_CURRENCIES: string[] = Object.keys(CURRENCIES)
const TICKER_API: string = getENVVar('_TICKER_API__') || __DEFAULT_TICKER_API__

function handleRequestError(
  params: TickerAPIParams,
  retryCount: number,
) {
  if (retryCount > 0) {
    // eslint-disable-next-line no-use-before-define
    return callApi(params, (retryCount - 1))
  }

  throw new Error('Ticker Request Error')
}

function callApi(
  params: TickerAPIParams,
  retryCount: number = 4,
): Promise<any> {
  const requestInfo: RequestInfo = `${TICKER_API}/v1/quotes/latest`

  return fetch(requestInfo, {
    ...tickerAPIOptions,
    body: JSON.stringify(params),
  }).catch(() => handleRequestError(
    params,
    retryCount,
  )).then((response: Response): Promise<any> => {
    if (response.ok) {
      return response.json()
    }

    return handleRequestError(
      params,
      retryCount,
    )
  })
}

function handleFiatCoursesResponse(response: any): Object {
  if (typeUtils.isVoid(response) || !typeUtils.isObject(response)) {
    return {}
  }

  if (!(response.data && response.status && response.status.success)) {
    return {}
  }

  return response.data.quotes
}

function prepareFiatCourses(data: Object): FiatCoursesAPI {
  const responseKeys: string[] = Object.keys(data)

  return responseKeys.reduce((
    reduceResult: FiatCoursesAPI,
    fiatId: string,
  ): FiatCoursesAPI => {
    if (!fiatId) {
      return reduceResult
    }

    const value: any = data[fiatId]

    if (typeUtils.isVoid(value) || !typeUtils.isObject(value)) {
      return reduceResult
    }

    const fiatCodes: string[] = Object.keys(value)

    const fiatCourse: FiatCourse = fiatCodes.reduce((
      resultCourse: FiatCourse,
      fiatCode: any,
    ): FiatCourse => {
      // filter invalid currency codes
      if (!AVAILABLE_CURRENCIES.includes(fiatCode)) {
        return resultCourse
      }

      return {
        ...resultCourse,
        [fiatCode]: value[fiatCode] ? value[fiatCode].price.toString() : '0',
      }
    }, {})

    reduceResult[fiatId] = fiatCourse

    return reduceResult
  }, {})
}

function requestLatestCourses(
  fiatCurrency: FiatCurrency,
  fiatIds: FiatId[],
): Promise<FiatCoursesAPI> {
  return callApi({
    base_asset: fiatIds,
    quote_asset: [fiatCurrency],
  })
    .then(handleFiatCoursesResponse)
    .then(prepareFiatCourses)
}

export default {
  requestLatestCourses,
}
