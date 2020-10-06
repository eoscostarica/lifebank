import gql from 'graphql-tag'

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation($role: String!, $email: String!, $name: String!, $secret: String!) {
    create_account(role: $role, email: $email, name: $name, secret: $secret) {
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
  mutation($role: String!, $username: String!) {
    check_username(role: $role, username: $username) {
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

export const PROFILE_ID_QUERY = gql`
  query {
    profile {
      profile
    }
  }
`

export const GRANT_CONSENT_MUTATION = gql`
  mutation {
    grant_consent {
      transaction_id
    }
  }
`

export const REVOKE_CONSENT_MUTATION = gql`
  mutation {
    revoke_consent {
      transaction_id
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

export const EDIT_PROFILE_MUTATION = gql`
  mutation($profile: jsonb!) {
    edit_profile(profile: $profile) {
      success
    }
  }
`
export const VALIDATE_EMAIL = gql`
  query($email: String!) {
    user(where: { email: { _eq: $email } }) {
      email
    }
  }
`

export const GET_SECRET_BY_ACCOUNT = gql`
  query($email: String!) {
    user(where: { email: { _eq: $email } }) {
      secret
    }
  }
`