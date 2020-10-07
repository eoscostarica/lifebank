const { eosConfig } = require('../config')
const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')
const preregisterApi = require('./pre-register.api')
const verificationCodeApi = require('./verification-code.api')
const mailApi = require('../utils/mail')
const {
  constants: {
    ENUM_DATA: { LOCATION_TYPES }
  }
} = require('../config')

const LIFE_BANK_CODE = eosConfig.lifebankCodeContractName

const preRegister = async ({
  email,
  phone,
  immunity_test,
  schedule,
  urgency_level,
  address,
  coordinates,
  name,
  password,
  description,
  invitation_code
}) => {
  const { verification_code } = await verificationCodeApi.generate()
  let resultRegister = 'ok'

  try {
    await preregisterApi.insertLifebank({
      email,
      password,
      name,
      address,
      schedule,
      phone,
      description,
      urgency_level,
      coordinates,
      immunity_test,
      invitation_code,
      verification_code
    })

    mailApi.sendVerificationCode(email, verification_code)
  } catch (error) {
    resultRegister = 'error'

    return {
      resultRegister
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
  const addSponsorTransaction = await lifebankcodeUtils.addLifebank(
    LIFE_BANK_CODE,
    password,
    profile
  )

  await historyApi.insert(addSponsorTransaction)
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
}

module.exports = {
  preRegister,
  editProfile,
  signup
}
