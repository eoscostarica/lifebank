const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const vaultApi = require('./vault.api')

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
  signup
}
