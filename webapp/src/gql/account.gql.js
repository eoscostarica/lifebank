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

export const PROFILE_QUERY = gql`
  query {
    profile {
      profile
    }
  }
`

export const GRANT_CONSENT_MUTATION = gql`
  mutation {
    grant_consent {
      success
    }
  }
`

export const REVOKE_CONSENT_MUTATION = gql`
  mutation {
    revoke_consent {
      success
    }
  }
`
