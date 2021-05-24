const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')
const notificationApi = require('./notification.api')

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

  const user = await userApi.getOne({
    account: { _eq: account }
  })

  await historyApi.insert(addSponsorTransaction)
  await userApi.setEmail({ account: { _eq: account } }, user.email)

  const profileAndEmail = {
    ...profile,
    email: user.email
  }

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
      info: profileAndEmail
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

const getReport = async ({ dateFrom, dateTo }, account) => {
  const where = { account_to: { _eq: account } }
  if (dateFrom && dateTo) where.created_at = { _gte: dateFrom, _lte: dateTo }
  const notifications = await notificationApi.getMany(where)

  const received = notifications
    ? notifications.map((notification) => {
        return {
          payerUser: notification.account_from,
          created_at_date: notification.created_at.split('T')[0],
          created_at_time: notification.created_at.split('T')[1].split('.')[0],
          offer: notification.payload.offer
        }
      })
    : []

  return {
    notifications: {
      received: received
    }
  }
}

module.exports = {
  editProfile,
  signup,
  getReport
}
