const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials } }) => {
  try {
    const profile = await accountApi.getProfile(credentials.sub)

    return {
      profile
    }
  } catch (error) {
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
