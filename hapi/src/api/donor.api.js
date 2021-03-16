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

const editNotificationState = async (account, id_state) => {
  await notificationApi.edit_state({ id: { _eq: id_state } })
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

module.exports = {
  editProfile,
  signup,
  editNotificationState
}
