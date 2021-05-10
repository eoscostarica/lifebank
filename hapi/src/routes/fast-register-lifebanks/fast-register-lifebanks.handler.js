const Boom = require('@hapi/boom')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const { lifebankApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    console.log('FAST-REGISTER-LIFEBANK')
    const response = await lifebankApi.fastPreRegister(input)

    return response
  } catch (error) {
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}
