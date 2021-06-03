const { hasuraUtils } = require('../utils')

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

const REMOVE_OFFER = `
  mutation ($where: offer_bool_exp!) {
    delete_offer(where: $where) {
      returning {
        offer_name
      }
    }
  }
`

const addOffer = (offer) => {
  return hasuraUtils.request(CREATE_OFFER, offer)
}

const removeOffer = async (where) => {
  const { delete_offer } = await hasuraUtils.request(REMOVE_OFFER, { where })
  return delete_offer.returning.length > 0
    ? delete_offer.returning[0]
    : false
}

module.exports = {
  addOffer,
  removeOffer
}
