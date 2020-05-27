const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')
const {
  constants: {
    ENUM_DATA: { LOCATION_TYPES }
  }
} = require('../config')

const signup = async (account, data) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.addLifebank(
    account,
    password,
    data
  )

  await historyApi.insert(addSponsorTransaction)

  await locationApi.insert({
    name: data.name,
    geolocation: {
      type: 'Point',
      coordinates: [data.geolocation.longitude, data.geolocation.latitude]
    },
    type: LOCATION_TYPES.LIFE_BANK
  })
}

module.exports = {
  signup
}
