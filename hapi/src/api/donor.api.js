const { lifebankcodeUtils } = require('../utils')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const notificationApi = require('./notification.api')

const editProfile = async (account, { email, name, ...profile }) => {
  const password = await vaultApi.getPassword(account)
  const adddonorTransaction = await lifebankcodeUtils.addDonor(
    account,
    password,
    profile
  )

  if (email) {
    await userApi.setEmail({ account: { _eq: account } }, email)
  }

  if (name) {
    await userApi.setName({ account: { _eq: account } }, name)
  }

  await historyApi.insert(adddonorTransaction)
}

const signup = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const adddonorTransaction = await lifebankcodeUtils.addDonor(
    account,
    password,
    profile
  )

  await historyApi.insert(adddonorTransaction)
}

const getReport = async ({ dateFrom, dateTo }, account) => {
  const where = { }
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
          created_at_date: notification.created_at.split('T')[0],
          created_at_time: notification.created_at.split('T')[1].split('.')[0],
          tokens:
            parseInt(notification.payload.newBalance[0].split(' ')[0]) -
            parseInt(notification.payload.currentBalance[0].split(' ')[0]),
          business: notification.account_from
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
