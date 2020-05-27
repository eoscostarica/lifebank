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

const signup = async (account, { sponsor }) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.addSponsor(
    account,
    password,
    sponsor
  )

  await historyApi.insert(addSponsorTransaction)

  await locationApi.insert({
    name: sponsor.sponsorName,
    geolocation: {
      type: 'Point',
      coordinates: [sponsor.geolocation.longitude, sponsor.geolocation.latitude]
    },
    type: LOCATION_TYPES.SPONSOR
  })
}

module.exports = {
  signup
}
