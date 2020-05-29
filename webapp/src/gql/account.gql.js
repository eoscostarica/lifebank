import gql from 'graphql-tag'

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation($role: String!, $username: String!, $secret: String!) {
    create_account(role: $role, username: $username, secret: $secret) {
      account
      token
      transaction_id
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation($profile: jsonb!) {
    signup(profile: $profile) {
      success
    }
  }
`

export const CHECK_USERNAME_MUTATION = gql`
  mutation($username: String!) {
    check_username(username: $username) {
      is_valid
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

export const CREDENTIALS_RECOVERY = gql`
  mutation($email: String!) {
    credentials_recovery(email: $email) {
      success
    }
  }
`

export const TRANSFER_MUTATION = gql`
  mutation transfer($to: String!, $memo: String!, $quantity: Int) {
    transfer(to: $to, memo: $memo, quantity: $quantity) {
      transaction_id
    }
  }
`

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription {
    notification(order_by: { created_at: desc }, limit: 1) {
      id
      title
      description
      type
      payload
    }
  }
`
