const Boom = require('@hapi/boom')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials }, payload: { input } }) => {
  try {
    const response = await accountApi.addOffer(credentials.sub, input)

    return response
  } catch (error) {
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}
