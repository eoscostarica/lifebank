const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { eosUtils } = require('../../utils')
const { userApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    if (!/^[a-z12345.]{9}$/.test(input.username)) {
      return {
        is_valid: false
      }
    }

    const user = await userApi.getOne({
      username: { _eq: input.username }
    })

    if (user) {
      return {
        is_valid: false
      }
    }

    const account = await eosUtils.getAccount(
      `${input.role.substring(0, 3)}${input.username}`.substring(0, 12)
    )

    if (account) {
      return {
        is_valid: false
      }
    }

    return {
      is_valid: true
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
