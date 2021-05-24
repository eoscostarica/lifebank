const { hasuraUtils } = require('../utils')
const accountApi = require('./account.api')
const userApi = require('./user.api')

const GET_MANY = `
  query ($where: offer_bool_exp) {
    offer(where: $where) {
      active
      cost_in_tokens
      created_at
      description
      end_date
      icon
      id
      images
      limited
      offer_name
      offer_type
      online_only
      quantity
      sponsor_id
      start_date
      updated_at
    }
  }
`

const getMany = async (where = {}) => {
  const { offer } = await hasuraUtils.request(GET_MANY, { where })

  return offer && offer.length > 0 ? user : null
}

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
  getMany,
  redeem
}
