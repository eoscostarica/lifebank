const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const locationApi = require('./location.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')

const signup = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.addSponsor(
    account,
    password,
    profile
  )

  await historyApi.insert(addSponsorTransaction)
  await userApi.setEmail({ account: { _eq: account } }, profile.email)
  await locationApi.insert({
    ...JSON.parse(profile.location || '{}'),
    name: profile.name,
    description: profile.benefit_description,
    phone_number: profile.telephone,
    type: 'sponsor'
  })
}

module.exports = {
  signup
}
