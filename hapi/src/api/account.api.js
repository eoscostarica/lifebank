const { eosUtils, jwtUtils } = require('../utils')

const vaultApi = require('./vault.api')
const historyApi = require('./history.api')

const create = async ({ type, secret }) => {
  const account = await eosUtils.generateRandomAccountName(type)
  const { password, transaction } = await eosUtils.createAccount(account)
  const token = jwtUtils.create({ account, type })

  await vaultApi.insert({
    type,
    account,
    secret,
    password
  })

  await historyApi.insert(transaction)

  return {
    account,
    token,
    transaction_id: transaction.transaction_id,
  }
}

module.exports = {
  create
}
