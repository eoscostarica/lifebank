import gql from 'graphql-tag'

export const DONOR_SIGNUP_MUTATION = gql`
  mutation($fullname: String!) {
    donor_signup(fullname: $fullname) {
      success
    }
  }
`
