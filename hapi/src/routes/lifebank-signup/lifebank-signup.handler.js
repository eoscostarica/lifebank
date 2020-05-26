const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { lifebankApi } = require('../../api')

module.exports = async ({ auth: { credentials }, payload: { input } }) => {
  try {
    await lifebankApi.signup(credentials.sub, input)

    return {
      success: true
    }
  } catch (error) {
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
