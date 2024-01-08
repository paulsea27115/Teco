import { checkString } from './string.mjs'

//  Regex = REGular Expression
const emilPartRegex = /^[0-9a-zA-Z_]{4,20}$/

export function checkEmail (input) {
  if (!checkString(input)) return false

  const [frontmail, backmail] = input.split('@')
  if (backmail !== 'sdh.hs.kr') return false
  if (!emilPartRegex.test(frontmail)) return false

  return true
}
