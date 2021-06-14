const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { donorApi, sponsorApi, lifebankApi } = require('../../api')

module.exports = async ({ auth: { credentials }, payload: { input } }) => {
  try {
    const role =
      credentials['https://hasura.io/jwt/claims']['x-hasura-default-role']

    await donorApi.editNotificationState(credentials.sub, input.id)

    return {
      success: true
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
