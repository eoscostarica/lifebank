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

  if (user)
    return sendEmailAux(user.email, emailContent, user.verification_code)

  const preRegisterUser = await preRegisterLifebankApi.getOne({
    email: { _eq: account },
    email_verified: { _eq: false }
  })

  if (preRegisterUser.preregister_lifebank.length > 0)
    return sendEmailAux(
      preRegisterUser.preregister_lifebank[0].email,
      emailContent,
      preRegisterUser.preregister_lifebank[0].verification_code
    )

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

const checkEmailVerified = async ({ account }) => {
  const user = await userApi.getOne({
    _or: [
      { email: { _eq: account } },
      { username: { _eq: account } },
      { account: { _eq: account } }
    ]
  })

  if (user) return { verified: user.email_verified }

  const preRegisterUser = await preRegisterLifebankApi.getOne({
    email: { _eq: account }
  })

  if (preRegisterUser.preregister_lifebank.length > 0)
    return { verified: preRegisterUser.preregister_lifebank[0].email_verified }

  return {
    verified: false
  }
}

module.exports = {
  sendEmail,
  checkEmailVerified
}
