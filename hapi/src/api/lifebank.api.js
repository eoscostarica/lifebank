const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const vaultApi = require('./vault.api')

const signup = async (account, data) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.addLifebank(
    account,
    password,
    data
  )

  await historyApi.insert(addSponsorTransaction)
}

module.exports = {
  signup
}
