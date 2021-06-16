const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ auth: { credentials } }) => {
  console.log('CLOSE-ACCOUNT')
  try {
    await accountApi.closeAccount(credentials.sub)

    return {
      success: true
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
