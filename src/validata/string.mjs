export function checkString (input, length) {
    if (typeof input !== 'string') return false
    if (
      Array.isArray(length) &&
      (input.length < length[0] || input.length >= length[1])
    ) {
      return false
    }
    return true
  }
  