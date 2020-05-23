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

export const LOGIN_MUTATION = gql`
  mutation($account: String!, $secret: String!) {
    login(account: $account, secret: $secret) {
      token
    }
  }
`
