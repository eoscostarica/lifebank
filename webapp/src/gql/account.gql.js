import gql from 'graphql-tag'

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation($role: String!, $email: String!, $emailContent: jsonb!, $name: String!, $passwordPlainText: String!, $signup_method: String!) {
    create_account(role: $role, email: $email, emailContent: $emailContent, name: $name, passwordPlainText: $passwordPlainText, signup_method: $name) {
      account
      token
      transaction_id
    }
  }
`

export const CREATE_ACCOUNT_AUTH_MUTATION = gql`
  mutation($role: String!, $email: String!, $emailContent: jsonb!, $name: String!, $passwordPlainText: String!, $signup_method: String) {
    create_account_auth(role: $role, email: $email, emailContent: $emailContent, name: $name, passwordPlainText: $passwordPlainText, signup_method: $name) {
      account
      token
      transaction_id
    }
  }
`

export const CREATE_ACCOUNT_LIFEBANK_MUTATION = gql`
  mutation($email: String!, $emailContent: jsonb!, $name: String!, $secret: String!, $verification_code: String!) {
    create_account_lifebank (email: $email, emailContent: $emailContent, name: $name, secret: $secret, verification_code: $verification_code){
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
  mutation($account: String!, $password: String!) {
    login(account: $account, password: $password) {
      token
    }
  }
`

export const SEND_EMAIL_MUTATION = gql`
  mutation($account: String!, $emailContent: jsonb!) {
    send_email(account: $account, emailContent: $emailContent) {
      success
    }
  }
`

export const CHECK_EMAIL_VERIFIED = gql`
  mutation($account: String!) {
    check_email_verified(account: $account) {
      verified
    }
  }
`

export const GET_INFO = gql`
  query info($account: String!) {
    location(where: {account: {_eq: $account}}) {
      info
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

export const GET_VALID_SPONSORS_QUERY = gql`
  query {
    get_valid_sponsors {
      account
      name
      openingHours
      address
      description
      logo
      email
      location
      telephone
      social_media_links
      photos
      website
      businessType
      userName
      role
    }
  }
`

export const GET_VALID_LIFEBANKS_QUERY = gql`
  query {
    get_valid_lifebanks {
      account
      name
      openingHours
      address
      logo
      description
      email
      location
      telephone
      role
      userName
      photos
      urgencyLevel
      requirement
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
  mutation($email: String!, $emailContent: jsonb!) {
    credentials_recovery(email: $email, emailContent: $emailContent) {
      success
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation($email: String!, $emailContent: jsonb!, $currentPassword: String!, $newPassword: String!) {
    change_password(email: $email, emailContent: $emailContent, currentPassword: $currentPassword, newPassword: $newPassword) {
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

export const TOKEN_SUBSCRIPTION = gql`
  subscription ($account: String!) {
    user(where: {account: {_eq: $account}}) {
      token
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

export const VERIFY_EMAIL = gql`
  mutation($code: String!) {
    verify_email(code: $code) {
      is_verified
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

export const GET_ACCOUNT_SIGNUP_METHOD = gql`
  mutation ($email: String!) {
    signup_method(email: $email) {
      password_changable
    }
  }
`

export const GET_SECRET_BY_ACCOUNT = gql`
  query ($account: String!) {
    user(where: {_or: [{account: {_eq: $account}}, {username: {_eq: $account}}, {email: {_eq: $account}}], _and: {email_verified: {_eq: true}}}) {
      secret
    }
  }
`

export const GET_ACCOUNT_NAME = gql`
  query ($account: String!) {
    user(where: {account: {_eq: $account}}, limit: 1) {
      name
    }
  }
`

export const GET_USERNAME = gql`
  query($account: String!) {
    user(where: { account: { _eq: $account } }) {
      username
    }
  }
`

export const SET_USERNAME = gql`
  mutation($account: String!, $username: String!) {
    update_user(
      _set: { username: $username }
      where: { account: { _eq: $account } }
    ) {
      affected_rows
    }
  }
`

export const VERIFY_USERNAME = gql`
  query($account: String!, $username: String!) {
    user(where: {username: {_eq: $username}, account: {_neq: $account}}) {
      username
    }
  }
`

export const GET_ID = gql`
  query($username: String!) {
    user(where: { username: { _eq: $username } }) {
      id
    }
  }
`
