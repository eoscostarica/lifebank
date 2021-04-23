const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials } }) => {
  try {
    const response = await accountApi.getNotifications(credentials.sub)

    console.log('RESPONSE', response)

    return response
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
