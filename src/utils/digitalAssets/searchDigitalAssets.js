// @flow

import escapeRegExp from 'utils/regexp/escapeRegExp'

function searchDigitalAssets(
  items: DigitalAssetWithBalance[],
  searchQuery: string,
): DigitalAssetWithBalance[] {
  const query: string = searchQuery.trim()
  const searchRe: RegExp = new RegExp(escapeRegExp(query), 'ig')

  return !query ? items : items.filter(({
    name,
    symbol,
    blockchainParams: {
      address,
    },
  }: DigitalAssetWithBalance) => {
    if (
      (query.length < 2) ||
      (name.search(searchRe) !== -1) ||
      (symbol.search(searchRe) !== -1) ||
      (address.toLowerCase() === query.toLowerCase())
    ) {
      return true
    }

    return false
  })
}

export default searchDigitalAssets
