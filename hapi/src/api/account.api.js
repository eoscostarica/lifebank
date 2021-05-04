const { eosConfig } = require('../config')
const {
  eosUtils,
  jwtUtils,
  consent2lifeUtils,
  lifebankcodeUtils,
  lifebankcoinUtils,
  hasuraUtils,
  bcryptjs
} = require('../utils')

const historyApi = require('./history.api')
const notificationApi = require('./notification.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')
const preRegLifebank = require('./pre-register.api')
const verificationCodeApi = require('./verification-code.api')
const mailApi = require('../utils/mail')
const LIFEBANKCODE_CONTRACT = eosConfig.lifebankCodeContractName
const MAIL_APPROVE_LIFEBANNK = eosConfig.mailApproveLifebank

const GET_LIFEBANKS_ACCOUNTS = `
query MyQuery {
  location(where: {user: {role: {_eq: "lifebank"}}}) {
    info
    user {
      account
      username
      role
    }
  }
}
`

const GET_SPONSORS_ACCOUNTS = `
query MyQuery {
  location(where: {user: {role: {_eq: "sponsor"}}}) {
    info
    user {
      account
      username
      role
    }
  }
}
`

const GET_LIFEBANK_ACCOUNT_LOWER_TOKEN = `
query MyQuery {
  user(limit: 1, order_by: {token: asc}, where: {role: {_eq: "lifebank"}}) {
    account
  }
}
`

const create = async (
  { role, email, emailContent, name, passwordPlainText, signup_method },
  withAuth
) => {
  const account = await eosUtils.generateRandomAccountName(role.substring(0, 3))
  const { password, transaction } = await eosUtils.createAccount(account)
  const username = account
  const token = jwtUtils.create({ role, username, account })
  const { verification_code } = await verificationCodeApi.generate()

  const secret = await bcryptjs.createPasswordHash(passwordPlainText)

  const data = {
    role,
    username,
    account,
    email,
    secret,
    name,
    verification_code,
    signup_method
  }

  if (withAuth) data.email_verified = true

  await userApi.insert(data)

  await vaultApi.insert({
    account,
    password: password
  })

  await historyApi.insert(transaction)
  try {
    mailApi.sendVerificationCode(
      email,
      verification_code,
      emailContent.subject,
      emailContent.title,
      emailContent.message,
      emailContent.button
    )
  } catch (error) {
    console.log(error)
  }

  return {
    account,
    token,
    transaction_id: transaction.transaction_id
  }
}

const createLifebank = async ({
  email,
  emailContent,
  name,
  secret,
  verification_code
}) => {
  const role = 'lifebank'
  const account = await eosUtils.generateRandomAccountName(role.substring(0, 3))
  const { password, transaction } = await eosUtils.createAccount(account)
  const username = account
  const token = jwtUtils.create({ role, username, account })

  await userApi.insert({
    role,
    username,
    account,
    email,
    secret,
    name,
    verification_code,
    email_verified: true,
    token: 1000000
  })

  await vaultApi.insert({
    account,
    password
  })

  await historyApi.insert(transaction)

  try {
    mailApi.sendConfirmMessage(
      email,
      emailContent.subject,
      emailContent.title,
      emailContent.message
    )
  } catch (error) {
    console.log(error)
  }

  return {
    account,
    token,
    transaction_id: transaction.transaction_id
  }
}

const getProfile = async (account) => {
  const user = await userApi.getOne({
    account: { _eq: account }
  })

  let data = {}

  switch (user.role) {
    case 'donor':
      data = await getDonorData(account)
      break
    case 'lifebank':
      data = await getLifebankData(account)
      break
    case 'sponsor':
      data = await getSponsorData(account)
      break
    default:
      break
  }

  return {
    account,
    role: user.role,
    id: user.id,
    ...data
  }
}

const isPasswordChangable = async ({ email }) => {
  const user = await userApi.getOne({
    email: { _eq: email }
  })

  if (user) {
    switch (user.signup_method) {
      case 'google':
      case 'facebook':
        return {
          password_changable: false
        }
      default:
        break
    }
  }

  return {
    password_changable: true
  }
}

const getDonorData = async (account) => {
  const networks = await lifebankcodeUtils.getUserNetworks(account)
  const communities = []

  for (let index = 0; index < networks.length; index++) {
    const comunity = await lifebankcodeUtils.getComunity(
      networks[index].community
    )
    communities.push(comunity.community_name)
  }

  const consent = await consent2lifeUtils.getConsent(
    LIFEBANKCODE_CONTRACT,
    account
  )
  const balance = await lifebankcoinUtils.getbalance(account)
  const { email, name } = await userApi.getOne({
    account: { _eq: account }
  })

  return {
    email,
    name,
    communities,
    balance,
    consent: !!consent
  }
}

const getLifebankData = async (account) => {
  const { tx } = (await lifebankcodeUtils.getLifebank(account)) || {}
  const { lifebank_name: name, ...profile } = await getTransactionData(tx)
  const consent = await consent2lifeUtils.getConsent(
    LIFEBANKCODE_CONTRACT,
    account
  )

  const info = await locationApi.infoQuery(account)

  if (Object.entries(profile).length === 0) {
    const { email } = await userApi.getOne({
      account: { _eq: account }
    })
    const data = await preRegLifebank.getOne({
      email: { _eq: email }
    })

    return {
      ...profile,
      address: data.preregister_lifebank[0].address,
      geolocation: JSON.parse(data.preregister_lifebank[0].coordinates),
      about: data.preregister_lifebank[0].description,
      email,
      photos: data.preregister_lifebank[0].photos || '[]',
      logo_url: data.preregister_lifebank[0].logo_url || '',
      immunity_test: data.preregister_lifebank[0].immunity_test,
      name: data.preregister_lifebank[0].name,
      telephones: JSON.stringify([data.preregister_lifebank[0].phone]),
      schedule: data.preregister_lifebank[0].schedule,
      blood_urgency_level: data.preregister_lifebank[0].urgency_level,
      consent: !!consent,
      requirement: data.preregister_lifebank[0].requirement
    }
  } else {
    return {
      ...profile,
      name,
      categories: info.location[0].info.categories || '[]',
      consent: !!consent
    }
  }
}

const getSponsorsAccounts = async () => {
  const { location } = await hasuraUtils.request(GET_SPONSORS_ACCOUNTS)

  return location
}

const getValidSponsors = async () => {
  const sponsorsAccounts = await getSponsorsAccounts()
  const validSponsors = []

  for (let index = 0; index < sponsorsAccounts.length; index++) {
    if (
      sponsorsAccounts[index].info.name.length > 0 &&
      sponsorsAccounts[index].info.schedule.length > 0 &&
      sponsorsAccounts[index].info.address.length > 0 &&
      sponsorsAccounts[index].info.email.length > 0 &&
      sponsorsAccounts[index].info.location !== 'null' &&
      JSON.parse(sponsorsAccounts[index].info.telephones).length > 0
    )
      validSponsors.push({
        account: sponsorsAccounts[index].user.account,
        name: sponsorsAccounts[index].info.name,
        openingHours: sponsorsAccounts[index].info.schedule,
        address: sponsorsAccounts[index].info.address,
        description: sponsorsAccounts[index].info.about,
        logo: sponsorsAccounts[index].info.logo_url,
        email: sponsorsAccounts[index].info.email,
        location: JSON.stringify(sponsorsAccounts[index].info.geolocation),
        telephone: sponsorsAccounts[index].info.telephones,
        social_media_links: sponsorsAccounts[index].info.social_media_links,
        photos: sponsorsAccounts[index].info.photos,
        website: sponsorsAccounts[index].info.website,
        businessType: sponsorsAccounts[index].info.business_type,
        userName: sponsorsAccounts[index].user.username,
        role: sponsorsAccounts[index].user.role
      })
  }

  return validSponsors
}

const getLifebanksAccounts = async () => {
  const { location } = await hasuraUtils.request(GET_LIFEBANKS_ACCOUNTS)

  return location
}

const getValidLifebanks = async () => {
  const lifebankAccounts = await getLifebanksAccounts()
  const validLifebanks = []

  for (let index = 0; index < lifebankAccounts.length; index++) {
    if (
      lifebankAccounts[index].info.name.length > 0 &&
      lifebankAccounts[index].info.schedule.length > 0 &&
      lifebankAccounts[index].info.address.length > 0 &&
      lifebankAccounts[index].info.email.length > 0 &&
      lifebankAccounts[index].info.about.length > 0 &&
      lifebankAccounts[index].info.geolocation !== 'null' &&
      JSON.parse(lifebankAccounts[index].info.telephones).length > 0
    )
      validLifebanks.push({
        account: lifebankAccounts[index].user.account,
        name: lifebankAccounts[index].info.name,
        openingHours: lifebankAccounts[index].info.schedule,
        address: lifebankAccounts[index].info.address,
        logo: lifebankAccounts[index].info.logo_url,
        description: lifebankAccounts[index].info.about,
        email: lifebankAccounts[index].info.email,
        location: JSON.stringify(lifebankAccounts[index].info.geolocation),
        telephone: lifebankAccounts[index].info.telephones,
        photos: lifebankAccounts[index].info.photos,
        role: lifebankAccounts[index].user.role,
        urgencyLevel: lifebankAccounts[index].info.blood_urgency_level,
        userName: lifebankAccounts[index].user.username,
        requirement: lifebankAccounts[index].info.requirement
      })
  }

  return validLifebanks
}

const getSponsorData = async (account) => {
  const { tx } = (await lifebankcodeUtils.getSponsor(account)) || {}
  const { sponsor_name: name, ...profile } = await getTransactionData(tx)
  const networks = await lifebankcodeUtils.getUserNetworks(account)
  const communities = []

  for (let index = 0; index < networks.length; index++) {
    const comunity = await lifebankcodeUtils.getComunity(
      networks[index].community
    )
    communities.push(comunity.community_name)
  }

  const consent = await consent2lifeUtils.getConsent(
    LIFEBANKCODE_CONTRACT,
    account
  )
  const balance = await lifebankcoinUtils.getbalance(account)

  const user = await userApi.getOne({
    account: { _eq: account }
  })

  const profileAndEmail = {
    ...profile,
    email: user.email
  }

  return {
    ...profileAndEmail,
    communities,
    balance,
    name,
    consent: !!consent
  }
}

const getTransactionData = async (tx) => {
  const { processed: { action_traces: actionTraces = [] } = {} } =
    (await historyApi.getOne({
      transaction_id: { _eq: tx || '' }
    })) || {}
  return actionTraces.reduce(
    (result, item) => ({ ...result, ...item.act.data }),
    {}
  )
}

const grantConsent = async (account) => {
  const password = await vaultApi.getPassword(account)
  const consentTransaction = await consent2lifeUtils.consent(
    LIFEBANKCODE_CONTRACT,
    account,
    password
  )

  await historyApi.insert(consentTransaction)

  return consentTransaction
}

const formatSchedule = (schedule) => {
  let scheduleFormat = ''

  let hours
  for (hours of schedule)
    scheduleFormat += `, ${hours.day} ${hours.open} - ${hours.close}`

  return scheduleFormat.replace(',', ' ')
}

const formatLifebankData = (lifebankData) => {
  lifebankData.schedule = formatSchedule(JSON.parse(lifebankData.schedule))
  lifebankData.coordinates = JSON.parse(lifebankData.coordinates)
  if (lifebankData.immunity_test) lifebankData.immunity_test = 'Yes'
  else lifebankData.immunity_test = 'No'

  if (lifebankData.urgency_level === 1) lifebankData.urgency_level = 'Low'
  else if (lifebankData.urgency_level === 2)
    lifebankData.urgency_level = 'Medium'
  else lifebankData.urgency_level = 'High'

  return lifebankData
}

const verifyEmail = async ({ code }) => {
  const resUser = await userApi.verifyEmail({
    verification_code: { _eq: code }
  })
  const resLifebank = await preRegLifebank.verifyEmail({
    verification_code: { _eq: code }
  })
  let result = false

  if (
    resUser.update_user.affected_rows !== 0 ||
    resLifebank.update_preregister_lifebank.affected_rows !== 0
  ) {
    if (resLifebank.update_preregister_lifebank.affected_rows !== 0) {
      resLifebank.update_preregister_lifebank.returning[0] = formatLifebankData(
        resLifebank.update_preregister_lifebank.returning[0]
      )
      try {
        mailApi.sendRegistrationRequest(
          MAIL_APPROVE_LIFEBANNK,
          resLifebank.update_preregister_lifebank.returning[0]
        )
      } catch (error) {
        console.log(error)
      }
    }
    result = true
  }
  return {
    is_verified: result
  }
}

const login = async ({ account, password }) => {
  const bcrypt = require('bcryptjs')
  const user = await userApi.getOne({
    _or: [
      { email: { _eq: account } },
      { username: { _eq: account } },
      { account: { _eq: account } }
    ],
    email_verified: { _eq: true }
  })

  if (!user) {
    throw new Error('Invalid account or secret')
  }

  const comparison = await bcrypt.compare(password, user.secret)

  if (!comparison) {
    throw new Error('Invalid account or secret')
  }

  const token = jwtUtils.create({
    account: user.account,
    role: user.role,
    username: user.username
  })

  return {
    token
  }
}

const revokeConsent = async (account) => {
  const password = await vaultApi.getPassword(account)
  const consentTransaction = await consent2lifeUtils.revoke(
    LIFEBANKCODE_CONTRACT,
    account,
    password
  )

  await historyApi.insert(consentTransaction)

  return consentTransaction
}

const transfer = async (from, details, notification) => {
  const currentBalance = await lifebankcoinUtils.getbalance(details.to)
  const password = await vaultApi.getPassword(from)
  const user = await userApi.getOne({
    account: { _eq: from }
  })

  const userTo = await userApi.getOne({
    account: { _eq: details.to }
  })

  let transaction

  switch (user.role) {
    case 'donor':
      transaction = await lifebankcoinUtils.transfer(from, password, details)
      break
    case 'sponsor':
      transaction = await lifebankcoinUtils.transfer(from, password, details)
      break
    case 'lifebank':
      transaction = await lifebankcoinUtils.issue(from, password, details)
      break
    default:
      break
  }

  if (transaction.processed) {
    await userApi.setToken(
      { account: { _eq: user.account } },
      user.token - details.quantity
    )
    await userApi.setToken(
      { account: { _eq: details.to } },
      userTo.token + details.quantity
    )
  }

  const newBalance = await lifebankcoinUtils.getbalance(details.to)
  await historyApi.insert(transaction)

  if (notification) {
    notification.payload.currentBalance = currentBalance
    notification.payload.newBalance = newBalance
    notification.payload.transaction = transaction.transaction_id
    await notificationApi.insert(notification)
  } else {
    await notificationApi.insert({
      account_from: from,
      account_to: details.to,
      title: 'New tokens',
      description: `From ${from} ${details.memo}`,
      type: 'new_tokens',
      payload: {
        currentBalance,
        newBalance,
        transaction: transaction.transaction_id
      }
    })
  }

  if (user.role === 'donor') {
    const tempDetail = {}
    Object.assign(tempDetail, details)

    const { user } = await hasuraUtils.request(GET_LIFEBANK_ACCOUNT_LOWER_TOKEN)
    if (user.length === 1) {
      tempDetail.to = user[0].account
      await transfer(details.to, tempDetail)
    }
  }

  return transaction
}

module.exports = {
  create,
  createLifebank,
  getProfile,
  isPasswordChangable,
  login,
  grantConsent,
  revokeConsent,
  transfer,
  verifyEmail,
  getValidSponsors,
  getValidLifebanks
}
