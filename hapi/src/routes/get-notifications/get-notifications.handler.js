const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const response = await accountApi.getNotifications(input)

    return response
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
