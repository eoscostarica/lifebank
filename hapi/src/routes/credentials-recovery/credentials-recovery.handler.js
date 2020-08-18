const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { mailUtils } = require('../../utils')
const { userApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const user = await userApi.getOne({
      email: { _eq: input.email }
    })

    if (user) {
      await mailUtils.sendCredentialsRecovery(input.email, user)
    }

    return {
      success: true
    }
  } catch (error) {
    console.log(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
