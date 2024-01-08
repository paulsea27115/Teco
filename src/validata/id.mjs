import { checkString } from './string.mjs'
const idPartRegex = /^[0-9a-zA-Z]{4,20}$/

export function checkId (input) {
  if (!checkString(input)) return false
  if (!idPartRegex.test(input)) return false

  return true
}
