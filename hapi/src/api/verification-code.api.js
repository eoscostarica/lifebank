const preregisterApi = require('./pre-register.api')
const crypto = require('crypto')

const generate = async () => {
  let isOK = false
  let verification_code = ''

  while (!isOK) {
    verification_code = crypto.randomBytes(20).toString('hex')
    console.log("verification_code:", verification_code)
    const data = await preregisterApi.validationVerificationCode(verification_code)

    if (data.preregister_lifebank.length === 0 && data.user.length === 0) isOK = true
  }

  return {
    verification_code
  }
}

module.exports = {
  generate
}
