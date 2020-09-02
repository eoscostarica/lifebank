const eosUtil = require('./eos')
const { eosConfig } = require('../config')

const CONTRACT_NAME = eosConfig.lifebankCoinContractName
const TOKEN_NAME = eosConfig.communityAsset

const getbalance = async account => {
  const result = await eosUtil.getCurrencyBalance(
    CONTRACT_NAME,
    account,
    TOKEN_NAME
  )

  if (result.length < 1) {
    return [`0 ${TOKEN_NAME}`]
  }

  return result
}

const transfer = async (account, password, { to, quantity, memo }) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: CONTRACT_NAME,
        name: 'transfer',
        data: {
          to,
          memo,
          quantity: `${quantity} ${TOKEN_NAME}`,
          from: account
        }
      }
    ],
    account,
    password
  )
}

const issue = async (account, password, { to, memo }) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: CONTRACT_NAME,
        name: 'issue',
        data: {
          to,
          memo,
          lifebank: account
        }
      }
    ],
    account,
    password
  )
}

module.exports = {
  getbalance,
  transfer,
  issue
}
