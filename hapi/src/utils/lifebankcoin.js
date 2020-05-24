const eosUtil = require('./eos')

const CONTRACT_NAME = 'eosio.token' // @todo: use ENV
const TOKEN_NAKE = 'EOS' // @todo: use ENV

const getbalance = async account => {
  const result = await eosUtil.getCurrencyBalance(
    CONTRACT_NAME,
    account,
    TOKEN_NAKE
  )

  return result
}

module.exports = {
  getbalance
}
