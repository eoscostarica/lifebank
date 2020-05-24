const { lifebankcodeUtils, consent2lifeUtils } = require('../utils')
const vaultApi = require('./vault.api')
const historyApi = require('./history.api')

const signup = async (account, data) => {
  const password = await vaultApi.getPassword(account)

  const consentTransaction = await consent2lifeUtils.consent(
    'lifebankcode', // @todo: use ENV
    account,
    password
  )
  await historyApi.insert(consentTransaction)

  const adddonorTransaction = await lifebankcodeUtils.adddonor(
    account,
    password,
    data
  )
  await historyApi.insert(adddonorTransaction)
}

module.exports = {
  signup
}
