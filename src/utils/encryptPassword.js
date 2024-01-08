import crypto from 'crypto'

export function encryptPassword (originalPassword, salt){
  return crypto
    .createHash('sha256')
    .update('][' + originalPassword + salt)
    .digest('hex')
}