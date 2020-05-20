import gql from 'graphql-tag'

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation($type: String!, $secret: String!) {
    create_account(type: $type, secret: $secret) {
      account
      token
      transaction_id
    }
  }
`
