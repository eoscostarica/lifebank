const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')
const notificationApi = require('./notification.api')
const { tweet } = require('../twitterBot/statusesUpdate')
const i18n = require('i18next')

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
  const user = await userApi.getOne({
    account: { _eq: account }
  })
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
  tweet(
    i18n.t('twitterText.sponsorNews') +
      user.name +
      i18n.t('twitterText.sponsorThanks') +
      i18n.t('twitterText.sponsorText') +
      i18n.t('twitterText.hashtags'),
    profile.logo_url
      ? profile.logo_url
      : 'https://newyorkyimby.com/wp-content/uploads/2020/04/1641-Undecliff-Avenue-Rendering01-777x441.jpg'
  )
}

const getReport = async ({ dateFrom, dateTo }, account) => {
  const where = {}
  if (dateFrom && dateTo) where.created_at = { _gte: dateFrom, _lte: dateTo }
  const notificationsSent = await notificationApi.getMany({
    account_from: { _eq: account },
    ...where
  })
  const notificationsReceived = await notificationApi.getMany({
    account_to: { _eq: account },
    ...where
  })

  const sent = notificationsSent
    ? notificationsSent.map((notification) => {
        return {
          created_at_date: notification.created_at.split('T')[0],
          created_at_time: notification.created_at.split('T')[1].split('.')[0],
          tokens:
            parseInt(notification.payload.newBalance[0].split(' ')[0]) -
            parseInt(notification.payload.currentBalance[0].split(' ')[0]),
          send_to: notification.account_to
        }
      })
    : []

  const received = notificationsReceived
    ? notificationsReceived.map((notification) => {
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
      sent: sent,
      received: received
    }
  }
}

module.exports = {
  editProfile,
  signup,
  getReport
}
