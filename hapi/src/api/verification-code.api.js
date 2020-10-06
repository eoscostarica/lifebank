const generate = async () => {
  const crypto = require('crypto')
  const verification_code = crypto.randomBytes(20).toString('hex')

  return {
    verification_code
  }
}

module.exports = {
  generate
}
