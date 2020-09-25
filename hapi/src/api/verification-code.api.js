const generate = async () => {
  const crypto = require('crypto')
  const verificationCode = crypto.randomBytes(20).toString('hex')

  return {
    verificationCode
  }
}

module.exports = {
  generate
}
