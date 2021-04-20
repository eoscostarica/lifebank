const accountApi = require('./account.api')
const {
  lifebankcoinUtils,
} = require('../utils')

// FROM liffivjjbcki
// DETAILS { memo: 'Thanks for your donation', quantity: 1, to: 'donpiub3hlno' }
const redeem = async (from, details, offer) => {
  const currentBalance = await lifebankcoinUtils.getbalance(details.to)

  const user = await userApi.getOne({
    account: { _eq: from }
  })

  const userTo = await userApi.getOne({
    account: { _eq: details.to }
  })

  if(user.role === '')

  await notificationApi.insert({
    account: details.to,
    title: 'New tokens',
    description: `From ${from} ${details.memo}`,
    type: 'new_tokens',
    payload: {
      currentBalance,
      newBalance,
      transaction: transaction.transaction_id
    }
  }) 

  return transaction
}

module.exports = {
  redeem
}