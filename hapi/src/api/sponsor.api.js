const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const vaultApi = require('./vault.api')

const signup = async (account, { sponsor }) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.addSponsor(
    account,
    password,
    sponsor
  )

  await historyApi.insert(addSponsorTransaction)
}

module.exports = {
  signup
}
