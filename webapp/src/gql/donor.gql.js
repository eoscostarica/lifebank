import gql from 'graphql-tag'

export const DONOR_SIGNUP = gql`
  mutation ($fullname: String!, $secret: String!) {
    donor_signup(fullname: $fullname, secret: $secret) {
      account
      token
      transaction_id
    }
  }
`
     