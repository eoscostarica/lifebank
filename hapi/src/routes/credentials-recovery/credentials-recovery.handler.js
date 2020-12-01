const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const { mailUtils } = require('../../utils')
const { userApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const tempSecret = crypto.randomBytes(8).toString('hex')
    const saltRounds = 10

    const encripTempSecret = await new Promise((resolve) => {
      bcrypt.hash(tempSecret, saltRounds, function (err, hash) {
        if (!err) resolve(hash)
      })
    })

    const user = await userApi.setSecret(
      { email: { _eq: input.email } }, 
      encripTempSecret
    )

    if (user) {
      await mailUtils.sendCredentialsRecovery(
        input.email, 
        user.update_user.returning[0].account, 
        tempSecret
      )
    }

    return {
      success: true
    }
  } catch (error) {
    console.log(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
