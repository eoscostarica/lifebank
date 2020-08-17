const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials }, payload: { input } }) => {
  try {
    const transaction = await accountApi.transfer(credentials.sub, input)

    return {
      transaction_id: transaction.transaction_id
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
