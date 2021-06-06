const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { userApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const email = await userApi.setEmail({ 
      account: { _eq: input.account } }, 
      input.email)

    if (email) {
      return {
        success: true
      }
    } else {
      return {
        success: false
      }
    }
  } catch (error) {
    console.log(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
