import KSUID = require('ksuid')

export function generatePrefixedId(prefix: string): string {
  return `${prefix}${KSUID.randomSync().string}`
}
