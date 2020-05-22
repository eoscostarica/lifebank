import gql from 'graphql-tag'

export const SPONSOR_SIGNUP_MUTATION = gql`
  mutation($sponsor: sponsor_signup_input!) {
    sponsor_signup(sponsor: $sponsor) {
      success
    }
  }
`