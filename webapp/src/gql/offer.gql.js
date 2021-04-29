import gql from 'graphql-tag'

export const CREATE_OFFER_MUTATION = gql`
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
    }
  }
`

export const DELETE_OFFER_MUTATION = gql`
  mutation($id: Int!) {
    delete_offer(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

export const UPDATE_OFFER_AVAILABILITY_MUTATION = gql`
  mutation($active: Boolean!, $id: Int!) {
    update_offer(_set: { active: $active }, where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

export const UPDATE_OFFER_MUTATION = gql`
  mutation(
    $limited: Boolean
    $online_only: Boolean
    $quantity: Int
    $offer_type: String
    $description: String
    $start_date: String
    $end_date: String
    $images: String
    $active: Boolean
    $offer_name: String
    $cost_in_tokens: Int
    $id: Int!
  ) {
    update_offer(
      _set: {
        limited: $limited
        online_only: $online_only
        quantity: $quantity
        offer_type: $offer_type
        description: $description
        start_date: $start_date
        end_date: $end_date
        images: $images
        active: $active
        offer_name: $offer_name
        cost_in_tokens: $cost_in_tokens
      }
      where: { id: { _eq: $id } }
    ) {
      returning {
        id
      }
    }
  }
`

export const GET_SPONSOR_OFFERS_QUERY = gql`
  query($sponsor_id: Int!) {
    offer(where: { sponsor_id: { _eq: $sponsor_id } }) {
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
    }
  }
`

export const GET_OFFERS_QUERY = gql`
  query($active: Boolean!) {
    offer(where: { active: { _eq: $active } }) {
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
      description
      cost_in_tokens
      active
      user {
        account
        name
        location {
          info
        }
      }
    }
  }
`

export const GET_ALL_OFFERS_QUERY = gql`
  query {
    offer {
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
      description
      cost_in_tokens
      active
      user {
        account
        name
        location {
          info
        }
      }
    }
  }
`

export const GET_OFFER_QUERY = gql`
  query($active: Boolean!, $id: Int!) {
    offer(
      where: { _and: [{ active: { _eq: $active } }, { id: { _eq: $id } }] }
    ) {
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
      description
      cost_in_tokens
      active
      user {
        account
        name
        location {
          info
        }
      }
    }
  }
`

export const GET_OFFER_BY_SPONSOR_QUERY = gql`
  query($active: Boolean!, $sponsor_id: Int!) {
    offer(
      where: { _and: [{ active: { _eq: $active } }, { sponsor_id: { _eq: $sponsor_id } }] }
    ) {
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
      description
      cost_in_tokens
      active
      user {
        account
        name
        location {
          info
        }
      }
    }
  }
`
export const REDEEM_OFFER_MUTATION = gql`
  mutation redeem_offer($to: String!, $memo: String!, $quantity: Int, $offer: jsonb!) {
    redeem_offer(to: $to, memo: $memo, quantity: $quantity, offer: $offer) {
      transaction_id
    }
  }
`