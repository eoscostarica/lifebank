const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials } }) => {
  try {
    const { transaction_id } = await accountApi.grantConsent(credentials.sub)

    return {
      transaction_id
    }
  } catch (error) {
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
