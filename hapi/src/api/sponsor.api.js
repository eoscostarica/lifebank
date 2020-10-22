const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')

const {
  constants: {
    ENUM_DATA: { LOCATION_TYPES }
  }
} = require('../config')

const editProfile = async (account, profile) => {
  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.addSponsor(
    account,
    password,
    profile
  )

  await historyApi.insert(addSponsorTransaction)
  await userApi.setEmail({ account: { _eq: account } }, profile.email)

  if (profile.geolocation) {
    const { location } = await locationApi.verifyExistence(account)

    const requestParams = {
      name: profile.name,
      geolocation: {
        type: 'Point',
        coordinates: [
          profile.geolocation.longitude,
          profile.geolocation.latitude
        ]
      },
      type: LOCATION_TYPES.SPONSOR,
      info: profile
    }

    location[0]
      ? await locationApi.update(account, requestParams)
      : await locationApi.insert({ account, ...requestParams })
  }
}

const signup = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.addSponsor(
    account,
    password,
    profile
  )

  await historyApi.insert(addSponsorTransaction)
  await userApi.setEmail({ account: { _eq: account } }, profile.email)

  if (profile.geolocation)
    await locationApi.insert({
      account,
      name: profile.name,
      geolocation: {
        type: 'Point',
        coordinates: [
          profile.geolocation.longitude,
          profile.geolocation.latitude
        ]
      },
      type: LOCATION_TYPES.SPONSOR,
      info: profile
    })
}

module.exports = {
  editProfile,
  signup
}
