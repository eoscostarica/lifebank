const mailApi = require('../utils/mail')
const userApi = require('./user.api')
const preRegisterLifebankApi = require('./pre-register.api')

const sendEmail = async ({ account, emailContent }) => {
  const user = await userApi.getOne({
    _or: [
      { email: { _eq: account } },
      { username: { _eq: account } },
      { account: { _eq: account } }
    ],
    email_verified: { _eq: false }
  })

  if (user) return sendEmailAux(account, emailContent, user.verification_code)

  const preRegsiterUser = await preRegisterLifebankApi.getOne({
    email: { _eq: account },
    email_verified: { _eq: false }
  })

  if(preRegsiterUser.preregister_lifebank.length > 0) return sendEmailAux(account, emailContent, preRegsiterUser.preregister_lifebank[0].verification_code)

  return {
    success: false
  }
}

const sendEmailAux = (account, emailContent, verification_code) => {
  try {
    mailApi.sendVerificationCode(
      account,
      verification_code,
      emailContent.subject,
      emailContent.title,
      emailContent.message,
      emailContent.button
    )
  } catch (error) {
    console.log(error)
    return {
      success: false
    }
  }

  return {
    success: true
  }
}

module.exports = {
  sendEmail
}
