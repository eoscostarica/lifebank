const Boom = require('@hapi/boom')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const lifebankApi = require('../../api/lifebank.api')

module.exports = async ({ payload: { input } }) => {
  console.log("input:", input)
  try {
    const response = await lifebankApi.preRegister(input)

    return response
  } catch (error) {
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}
