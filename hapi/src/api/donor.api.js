const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')

const editProfile = async (account, { email, ...profile }) => {
  const password = await vaultApi.getPassword(account)
  const adddonorTransaction = await lifebankcodeUtils.addDonor(
    account,
    password,
    profile
  )

  if (email) {
    await userApi.setEmail({ account: { _eq: account } }, email)
  }

  await historyApi.insert(adddonorTransaction)
}

const signup = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const adddonorTransaction = await lifebankcodeUtils.addDonor(
    account,
    password,
    profile
  )

  await historyApi.insert(adddonorTransaction)
}

module.exports = {
  editProfile,
  signup
}
