const crypto = require('crypto')

const generate = async () => {
  const verificationCode = crypto.randomBytes(20).toString('hex')

  return {
    verificationCode
  }
}

module.exports = {
  generate
}
