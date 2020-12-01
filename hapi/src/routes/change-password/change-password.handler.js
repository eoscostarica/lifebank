const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')
const bcrypt = require('bcryptjs')

const { mailUtils } = require('../../utils')
const { userApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const saltRounds = 10
    const user = await userApi.getOne({
      email: { _eq: input.email }
    })
    const currentPasswordIsOk = await new Promise((resolve) => {
      bcrypt.compare(input.currentPassword, user.secret, function (err, res) {
        if (!err && res) resolve(true)
        else resolve(false)
      })
    })

    if (currentPasswordIsOk) {
      const encripnewPassword = await new Promise((resolve) => {
        bcrypt.hash(input.newPassword, saltRounds, function (err, hash) {
          if (!err) resolve(hash)
        })
      })

      const user = await userApi.setSecret(
        { email: { _eq: input.email } },
        encripnewPassword
      )

      if (user)
        await mailUtils.sendConfirmMessage(
          input.email,
          'Lifebank Change Password',
          'Change Password',
          'Your password has been successfully changed, thank you for donating life'
        )

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
