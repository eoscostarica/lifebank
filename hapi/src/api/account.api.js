const { eosConfig } = require('../config')
const {
  eosUtils,
  jwtUtils,
  consent2lifeUtils,
  lifebankcodeUtils,
  lifebankcoinUtils,
  hasuraUtils
} = require('../utils')

const historyApi = require('./history.api')
const notificationApi = require('./notification.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const preRegLifebank = require('./pre-register.api')
const verificationCodeApi = require('./verification-code.api')
const mailApi = require('../utils/mail')
const LIFEBANKCODE_CONTRACT = eosConfig.lifebankCodeContractName

const GET_SPONSORS_ACCOUNTS = `
query MyQuery {
  user(where: {account: {_ilike: "spo%"}}) {
    account
  }
}
`

const create = async ({ role, email, name, secret }) => {
  const account = await eosUtils.generateRandomAccountName(role.substring(0, 3))
  const { password, transaction } = await eosUtils.createAccount(account)
  const username = account
  const token = jwtUtils.create({ role, username, account })
  const { verification_code } = await verificationCodeApi.generate()

  await userApi.insert({
    role,
    username,
    account,
    email,
    secret,
    name,
    verification_code
  })

  await vaultApi.insert({
    account,
    password
  })

  await historyApi.insert(transaction)

  mailApi.sendVerificationCode(email, verification_code)

  return {
    account,
    token,
    transaction_id: transaction.transaction_id
  }
}

const getProfile = async account => {
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

const getDonorData = async account => {
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

const getLifebankData = async account => {
  const { tx } = (await lifebankcodeUtils.getLifebank(account)) || {}
  const { lifebank_name: name, ...profile } = await getTransactionData(tx)
  const consent = await consent2lifeUtils.getConsent(
    LIFEBANKCODE_CONTRACT,
    account
  )
  return {
    ...profile,
    name,
    consent: !!consent
  }
}

const getSponsorsAccounts = async () => {
  const { user } = await hasuraUtils.request(GET_SPONSORS_ACCOUNTS)

  return user
}

const getValidSponsors = async () => {
  const sponsorsAccounts = await getSponsorsAccounts()
  const validSponsors = []
  for (let index = 0; index < sponsorsAccounts.length; index++) {
    const { tx } =
      (await lifebankcodeUtils.getSponsor(sponsorsAccounts[index].account)) ||
      {}
    if (tx) {
      const { ...profile } = await getTransactionData(tx)
      if (
        profile.sponsor_name.length > 0 &&
        profile.schedule.length > 0 &&
        profile.address.length > 0 &&
        profile.logo_url.length > 0 &&
        profile.email.length > 0 &&
        profile.location !== 'null' &&
        profile.social_media_links.length > 0 &&
        JSON.parse(profile.telephones).length > 0
      )
        validSponsors.push({
          name: profile.sponsor_name,
          openingHours: profile.schedule,
          address: profile.address,
          logo: profile.logo_url,
          email: profile.email,
          location: profile.location,
          telephone: JSON.parse(profile.telephones)[0],
          social_media_links: profile.social_media_links
        })
    }
  }

  return validSponsors
}

const getSponsorData = async account => {
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

  return {
    ...profile,
    communities,
    balance,
    name,
    consent: !!consent
  }
}

const getTransactionData = async tx => {
  const { processed: { action_traces: actionTraces = [] } = {} } =
    (await historyApi.getOne({
      transaction_id: { _eq: tx || '' }
    })) || {}
  return actionTraces.reduce(
    (result, item) => ({ ...result, ...item.act.data }),
    {}
  )
}

const grantConsent = async account => {
  const password = await vaultApi.getPassword(account)
  const consentTransaction = await consent2lifeUtils.consent(
    LIFEBANKCODE_CONTRACT,
    account,
    password
  )

  await historyApi.insert(consentTransaction)

  return consentTransaction
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
  )
    result = true

  return {
    is_verified: result
  }
}

const login = async ({ account, secret }) => {
  const user = await userApi.getOne({
    _or: [
      { account: { _eq: account } },
      { username: { _eq: account } },
      { email: { _eq: account } }
    ]
  })

  if (!user) {
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

const revokeConsent = async account => {
  const password = await vaultApi.getPassword(account)
  const consentTransaction = await consent2lifeUtils.revoke(
    LIFEBANKCODE_CONTRACT,
    account,
    password
  )

  await historyApi.insert(consentTransaction)

  return consentTransaction
}

const transfer = async (from, details) => {
  const currentBalance = await lifebankcoinUtils.getbalance(details.to)
  const password = await vaultApi.getPassword(from)
  const user = await userApi.getOne({
    account: { _eq: from }
  })

  let transaction

  switch (user.role) {
    case 'donor' || 'sponsor':
      transaction = await lifebankcoinUtils.transfer(from, password, details)
      break
    case 'lifebank':
      transaction = await lifebankcoinUtils.issue(from, password, details)
      break
    default:
      break
  }

  const newBalance = await lifebankcoinUtils.getbalance(details.to)
  await historyApi.insert(transaction)
  await notificationApi.insert({
    account: details.to,
    title: 'New tokens',
    description: `From ${from} ${details.memo}`,
    type: 'new_tokens',
    payload: {
      currentBalance,
      newBalance,
      transaction: transaction.transaction_id
    }
  })

  return transaction
}

module.exports = {
  create,
  getProfile,
  login,
  grantConsent,
  revokeConsent,
  transfer,
  verifyEmail,
  getValidSponsors
}
