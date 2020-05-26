const eosUtil = require('./eos')

const CONTRACT_NAME = 'lifebankcoin' // @todo: use ENV
const TOKEN_NAKE = '0 LIFE' // @todo: use ENV

const getbalance = async account => {
  const result = await eosUtil.getCurrencyBalance(
    CONTRACT_NAME,
    account,
    TOKEN_NAKE
  )

  if (result.length < 1) {
    return [TOKEN_NAKE]
  }

  return result
}

module.exports = {
  getbalance
}
