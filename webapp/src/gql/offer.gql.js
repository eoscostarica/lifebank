import gql from 'graphql-tag'

export const CREATE_OFFER_MUTATION = gql`
  mutation(
    $limited: Boolean!
    $online_only: Boolean!
    $quantity: Int!
    $offer_type: String!
    $description: String!
    $start_date: String!
    $end_date: String!
    $images: String!
    $sponsor_id: Int!
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
      }
    ) {
      id
    }
  }
`

export const GET_SPONSOR_OFFERS_QUERY = gql`
  query($sponsor_id: Int!) {
    offer(where: { sponsor_id: { _eq: $sponsor_id } }) {
      id
      images
      limited
      offer_type
      online_only
      quantity
      sponsor_id
      start_date
      end_date
    }
  }
`
