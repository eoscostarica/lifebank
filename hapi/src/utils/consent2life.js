const crypto = require('crypto')

const eosUtil = require('./eos')
const { eosConfig } = require('../config')

const CONTRACT_NAME = eosConfig.consent2LifeContractName

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

const getConsent = async (contract, account) => {
  const record = crypto
    .createHash('sha256')
    .update(`${account}${contract}`)
    .digest('hex')

  const { rows = [] } = await eosUtil.getTableRows({
    scope: CONTRACT_NAME,
    code: CONTRACT_NAME,
    table: 'userconsents',
    index_position: 2,
    key_type: 'sha256',
    lower_bound: record,
    upper_bound: record
  })

  return rows.length > 0 ? rows[0] : null
}

module.exports = {
  consent,
  revoke,
  getConsent
}
