const Boom = require('@hapi/boom')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const { eosUtils } = require('../../utils')

module.exports = async ({ payload: { input } }) => {
  try {
    const { abi = {} } = await eosUtils.getAbi(input.contract)

    return { abi }
  } catch (error) {
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}
