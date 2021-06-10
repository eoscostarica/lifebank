const Boom = require('@hapi/boom')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials }, payload: { input } }) => {
  try {
    const response = await accountApi.redeem(credentials.sub, input)

    return {
      transaction_id: response.transaction_id
    }
  } catch (error) {
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}
