const eosUtil = require('./eos')

const CONTRACT_NAME = process.env.LIFEBANKCOIN_CONTRACTNAME
const TOKEN_NAKE = process.env.COMMUNITY_ASSET

const getbalance = async account => {
  const result = await eosUtil.getCurrencyBalance(
    CONTRACT_NAME,
    account,
    TOKEN_NAKE
  )

  if (result.length < 1) {
    return [`0 ${TOKEN_NAKE}`]
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
          quantity: `${quantity} ${TOKEN_NAKE}`,
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
