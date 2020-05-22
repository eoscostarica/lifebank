const eosUtil = require('./eos')

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
        account: 'consent2life', // @todo: use ENV
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

module.exports = {
  consent
}
