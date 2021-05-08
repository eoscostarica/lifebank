const accountApi = require('./account.api')
const userApi = require('./user.api')

const redeem = async (from, details) => {
  const user = await userApi.getOne({
    account: { _eq: from }
  })

  if (user.role !== 'donor') {
    throw new Error('Only donors can redeem an offer')
  }

  const userTo = await userApi.getOne({
    account: { _eq: details.to }
  })

  if (userTo.role !== 'sponsor') {
    throw new Error('Only sponsor can receive tokens by an offer redemption')
  }

  const notificationData = {
    account_from: from,
    account_to: details.to,
    title: 'Redeem offer',
    description: `From ${from} ${details.memo}`,
    type: 'new_tokens',
    payload: {
      offer: details.offer
    }
  }

  return await accountApi.transfer(from, details, notificationData)
}

module.exports = {
  redeem
}
