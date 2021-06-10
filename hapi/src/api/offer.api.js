const { hasuraUtils } = require('../utils')

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

const CHANGE_STATE = `
  mutation ($where: offer_bool_exp!, $state: String!) {
    update_offer(where: $where, _set: {state: $state}) {
      affected_rows
    }
  }
`

const getMany = async (where = {}) => {
  const { offer } = await hasuraUtils.request(GET_MANY, { where })

  return offer && offer.length > 0 ? offer : null
}

const desactivate = async (where) => {
  const { update_offer } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'inactive'
  })
  return update_offer.affected_rows > 0
}

const activate = async (where) => {
  const { update_offer } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'active'
  })
  return update_offer.affected_rows > 0
}

module.exports = {
  desactivate,
  activate,
  getMany,
}
