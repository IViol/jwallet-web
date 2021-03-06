// @flow

const KNOWN_DERIVATION_PATHS: Array<{
  +path: string,
}> = [{
  path: 'm/44\'/60\'/0\'/0',
}, {
  path: 'm/44\'/60\'/0\'',
}, {
  path: 'm/44\'/60\'/160720\'/0\'',
}, {
  path: 'm/44\'/61\'/0\'/0',
}, {
  path: 'm/44\'/1\'/0\'/0',
}, {
  path: 'm/44\'/40\'/0\'/0',
}]

export default KNOWN_DERIVATION_PATHS
