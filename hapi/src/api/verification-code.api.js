const crypto = require('crypto')

const generate = async () => {
  const verification_code = crypto.randomBytes(20).toString('hex')

  return {
    verification_code
  }
}

module.exports = {
  generate
}
