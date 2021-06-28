const { lifebankcodeUtils, bcryptjs } = require('../utils')
const { eosConfig } = require('../config')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')
const preregisterApi = require('./pre-register.api')
const verificationCodeApi = require('./verification-code.api')
const mailApi = require('../utils/mail')
const notificationApi = require('./notification.api')
const { tweet } = require('../twitterBot/statusesUpdate')

const {
  constants: {
    ENUM_DATA: { LOCATION_TYPES }
  }
} = require('../config')

const LIFE_BANK_CODE = eosConfig.lifebankCodeContractName

const preRegister = async ({
  email,
  emailContent,
  phone,
  immunity_test,
  schedule,
  urgency_level,
  address,
  coordinates,
  name,
  passwordPlainText,
  description,
  invitation_code,
  requirement
}) => {
  const { verification_code } = await verificationCodeApi.generate()
  const resultRegister = 'ok'

  const secret = await bcryptjs.createPasswordHash(passwordPlainText)

  try {
    await preregisterApi.insertLifebank({
      email,
      password: secret,
      name,
      address,
      schedule,
      phone,
      description,
      urgency_level,
      coordinates,
      immunity_test,
      invitation_code,
      verification_code,
      requirement
    })

    mailApi.sendVerificationCode(
      email,
      verification_code,
      emailContent.subject,
      emailContent.title,
      emailContent.message,
      emailContent.button
    )
  } catch (error) {
    return {
      resultRegister: 'error'
    }
  }

  return {
    resultRegister
  }
}

const editProfile = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.upLifebank(
    account,
    password,
    profile
  )

  await historyApi.insert(addSponsorTransaction)
  await userApi.setEmail({ account: { _eq: account } }, profile.email)

  await locationApi.update(account, {
    name: profile.name,
    geolocation: {
      type: 'Point',
      coordinates: [profile.geolocation.longitude, profile.geolocation.latitude]
    },
    type: LOCATION_TYPES.LIFE_BANK,
    info: profile
  })
}

const signup = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(LIFE_BANK_CODE)
  const addLifebankTransaction = await lifebankcodeUtils.addLifebank(
    LIFE_BANK_CODE,
    password,
    profile
  )
  await historyApi.insert(addLifebankTransaction)
  await userApi.setEmail({ account: { _eq: account } }, profile.email)

  await locationApi.insert({
    account,
    name: profile.name,
    geolocation: {
      type: 'Point',
      coordinates: [profile.geolocation.longitude, profile.geolocation.latitude]
    },
    type: LOCATION_TYPES.LIFE_BANK,
    info: profile
  })
  tweet(
    'New Lifebank! ' + profile.name + ', help save lives!',
    profile.logo_url
      ? profile.logo_url
      : 'https://image.freepik.com/free-vector/hospital-building-isolated-modern-medical-clinic-center-clipart_101884-663.jpg'
  )
}

const getReport = async ({ dateFrom, dateTo }, account) => {
  const where = {}
  if (dateFrom && dateTo) where.created_at = { _gte: dateFrom, _lte: dateTo }
  const notificationsSent = await notificationApi.getMany({
    account_from: { _eq: account },
    ...where
  })
  const notificationsReceived = await notificationApi.getMany({
    account_to: { _eq: account },
    ...where
  })

  const sent = notificationsSent
    ? notificationsSent.map((notification) => {
        return {
          created_at_date: notification.created_at.split('T')[0],
          created_at_time: notification.created_at.split('T')[1].split('.')[0],
          tokens:
            parseInt(notification.payload.newBalance[0].split(' ')[0]) -
            parseInt(notification.payload.currentBalance[0].split(' ')[0]),
          send_to: notification.account_to
        }
      })
    : []

  const received = notificationsReceived
    ? notificationsReceived.map((notification) => {
        return {
          created_at_date: notification.created_at.split('T')[0],
          created_at_time: notification.created_at.split('T')[1].split('.')[0],
          tokens:
            parseInt(notification.payload.newBalance[0].split(' ')[0]) -
            parseInt(notification.payload.currentBalance[0].split(' ')[0]),
          business: notification.account_from
        }
      })
    : []

  return {
    notifications: {
      sent: sent,
      received: received
    }
  }
}

module.exports = {
  preRegister,
  editProfile,
  signup,
  getReport
}
