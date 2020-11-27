const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')
const bcrypt = require('bcryptjs')


const { mailUtils } = require('../../utils')
const { userApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    console.log(input)
    const saltRounds = 10

    const user = await userApi.getOne({
      email: {_eq: input.email}
    })

    const currentPasswordIsOk = await new Promise((resolve) => {
      bcrypt.compare(input.currentPassword, user.secret, function (err, res) {
        if (!err && res) resolve(true)
        else resolve(false)
      })
    })
    console.log("currentPasswordIsOk:",currentPasswordIsOk)
    if(currentPasswordIsOk){
      const encripnewPassword = await new Promise((resolve) => {
        bcrypt.hash(input.newPassword, saltRounds, function (err, hash) {
          if (!err) resolve(hash)
        })
      })
      console.log("encripnewPassword:",encripnewPassword)
      const user = await userApi.setSecret({ email: {_eq: input.email} }, encripnewPassword)
      console.log("user:",user)
      if (user) {
        await mailUtils.sendConfirmChangePassword(input.email)
      }
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