const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials } }) => {
  try {
    await accountApi.grantConsent(credentials.sub)

    return {
      success: true
    }
  } catch (error) {
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
