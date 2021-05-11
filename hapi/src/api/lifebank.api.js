const { lifebankcodeUtils, bcryptjs } = require('../utils')
const { eosConfig } = require('../config')

const crypto = require('crypto')
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

const fastPreRegister = async ({
  lifebanks
}) => {
  let added = 0
  let failed = 0
  lifebanks.forEach(async lifebank => {
    const preLifebank = await preregisterApi.getOne({
      email: { _eq: lifebank.email }
    })

    if(preLifebank.preregister_lifebank.lenght) {
      failed += 1
    }
    else {
      added += 1
      const tempPassword = crypto.randomBytes(8).toString('hex')
      const secret = await bcryptjs.createPasswordHash(tempPassword)

      const lifebankData = {
        email: lifebank.email,
        emailContent: lifebank.emailContent,
        phone: lifebank.phone.toString(),
        immunity_test: false,
        schedule: '[]',
        urgency_level: 1,
        address: lifebank.address,
        coordinates: '{"longitude": -84.07916749095011, "latitude": 9.909844117235366}',
        name: lifebank.name,
        passwordPlainText: secret,
        description: lifebank.description,
        invitation_code: '',
        requirement: ''
      }
      const result = await preRegister(lifebankData)
    }
  })

  return {
    success: true,
    added,
    failed
  }
}

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
    console.log('ERROR', error)
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
}

module.exports = {
  fastPreRegister,
  preRegister,
  editProfile,
  signup
}
