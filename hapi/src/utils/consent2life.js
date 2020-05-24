const eosUtil = require('./eos')

const CONTRACT_NAME = 'consent2life' // @todo: use ENV

const consent = async (contract, account, password) => {
  const { code_hash: hash } = await eosUtil.getCodeHash(contract)

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
        name: 'consent',
        data: {
          contract,
          hash,
          user: account
        }
      }
    ],
    account,
    password
  )
}

const revoke = async (contract, account, password) => {
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
        name: 'revoke',
        data: {
          contract,
          user: account
        }
      }
    ],
    account,
    password
  )
}

const getConsent = async () => {
  const { rows = [] } = await eosUtil.getTableRows({
    scope: CONTRACT_NAME,
    code: CONTRACT_NAME,
    table: 'userconsents',
    table_key: 'user'
  })

  return rows
}

module.exports = {
  consent,
  revoke,
  getConsent
}
