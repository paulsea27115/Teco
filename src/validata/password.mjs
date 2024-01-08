import { checkString } from './string.mjs'

//  Regex = REGular Expression
const passwordPartRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(){}[\]\-+=~:?><]).{6,20}$/

export function checkPassword (input) {
  if (!checkString(input)) return false
  if (!passwordPartRegex.test(input)) return false

  return true
}
