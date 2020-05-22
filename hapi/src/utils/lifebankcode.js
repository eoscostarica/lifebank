const eosUtil = require('./eos')

const adddonor = (account, password, { fullname }) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: 'lifebankcode', // @todo: use ENV
        name: 'adddoner',
        data: {
          account,
          doner_name: fullname
        }
      }
    ],
    account,
    password
  )
}

module.exports = {
  adddonor
}
