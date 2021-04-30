const Boom = require('@hapi/boom')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    console.log('INPUT', input)
    console.log('ACCOUNT', accountApi)
    const response = await accountApi.verifyEmail(input)
    console.log('PASS')

    return response
  } catch (error) {
    console.log('ERROR', error)
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}
