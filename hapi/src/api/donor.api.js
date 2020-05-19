const { eosUtils } = require('../utils')
const vaultApi = require('./vault.api')

const signup = async ({ secret }) => {
  const account = await eosUtils.generateRandomAccountName('donor')
  const { password, transactionId } = await eosUtils.createAccount(account)
  await vaultApi.newVaut({
    secret,
    account,
    password
  })

  return {
    account,
    transaction_id: transactionId,
    token: '' // @todo: generate token
  }
}

module.exports = {
  signup
}
