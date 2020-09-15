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
      }
    ) {
      id
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
      active
    }
  }
`
