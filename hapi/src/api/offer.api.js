const { hasuraUtils } = require('../utils')
const userApi = require('./user.api')

const CREATE_OFFER = `
mutation(
  $limited: Boolean!
  $online_only: Boolean!
  $quantity: Int
  $offer_type: String!
  $description: String!
  $start_date: String
  $end_date: String
  $images: String!
  $sponsor_id: Int!
  $active: Boolean!
  $offer_name: String!
  $cost_in_tokens: Int!
  $icon: String!
) {
  insert_offer_one(
    object: {
      limited: $limited
      online_only: $online_only
      quantity: $quantity
      offer_type: $offer_type
      description: $description
      start_date: $start_date
      end_date: $end_date
      images: $images
      sponsor_id: $sponsor_id
      active: $active
      offer_name: $offer_name
      cost_in_tokens: $cost_in_tokens
      icon: $icon
    }
  ) {
    id
    description
    images
    limited
    offer_type
    online_only
    quantity
    sponsor_id
    start_date
    end_date
    offer_name
    cost_in_tokens
    active
    icon
  }
}
`

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
      end_date
      offer_name
      cost_in_tokens
      active
      icon
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

const DELETE = `
  mutation ($where: offer_bool_exp!) {
    delete_offer(where: $where) {
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

const permanentDelete = async (where) => {
  const { delete_offer } = await hasuraUtils.request(DELETE, { where })
  return delete_offer.affected_rows > 0
}

const addOffer = (offer) => {
  return hasuraUtils.request(CREATE_OFFER, offer)
}

module.exports = {
  desactivate,
  activate,
  permanentDelete,
  getMany,
  addOffer
}
