const { hasuraUtils } = require('../utils')

const GET_ONE = `
  query ($where: user_bool_exp) {
    user(where: $where, limit: 1) {
      id
      role
      username
      secret
      account
      email
      name
      token
      signup_method
      verification_code
      email_verified
      email_subscription
      language
    }
  }
`

const GET_MANY = `
  query ($where: user_bool_exp) {
    user(where: $where) {
      id
      role
      username
      secret
      account
      email
      name
      token
      signup_method
      verification_code
      email_verified
      email_subscription
      language
      updated_at
    }
  }
`

const INSERT = `
  mutation ($user: user_insert_input!) {
    insert_user_one(object: $user) {
      id
      role
      username
      account
      email
      name,
      verification_code
    }
  }
`

const CHANGE_STATE = `
  mutation ($where: user_bool_exp!, $state: String!) {
    update_user(where: $where, _set: {state: $state}) {
      returning {
        id
        account
        name
        role
      }
    }
  }
`

const SET_EMAIL = `
  mutation ($where: user_bool_exp!, $email: String) {
    update_user(where: $where, _set: { email: $email }) {
      affected_rows
    }
  }
`

const SET_TOKEN = `
  mutation ($where: user_bool_exp!, $token: Int) {
    update_user(where: $where, _set: { token: $token }) {
      affected_rows
    }
  }
`

const SET_NAME = `
  mutation ($where: user_bool_exp!, $name: String) {
    update_user(where: $where, _set: { name: $name }) {
      affected_rows
    }
  }
`

const SET_EMAIL_VERIFIED = `
  mutation ($where: user_bool_exp!) {
    update_user(where: $where, _set: { email_verified: true }) {
      affected_rows
    }
  }
`

const SET_SECRET = `
  mutation ($where: user_bool_exp!, $secret: String!) {
    update_user(where: $where, _set: {secret: $secret}) {
      returning {
        account
      }
    }
  }
`

const getOne = async (where = {}) => {
  const { user } = await hasuraUtils.request(GET_ONE, { where })

  if (user && user.length > 0) return user[0]

  return null
}

const getMany = async (where = {}) => {
  const { user } = await hasuraUtils.request(GET_MANY, { where })

  return user && user.length > 0 ? user : null
}

const insert = (user) => {
  return hasuraUtils.request(INSERT, { user })
}

const setEmail = (where, email) => {
  return hasuraUtils.request(SET_EMAIL, { where, email })
}

const setToken = (where, token) => {
  return hasuraUtils.request(SET_TOKEN, { where, token })
}

const setName = (where, name) => {
  return hasuraUtils.request(SET_NAME, { where, name })
}

const setSecret = (where, secret) => {
  return hasuraUtils.request(SET_SECRET, { where, secret })
}

const verifyEmail = async (where) => {
  const { update_user } = await hasuraUtils.request(SET_EMAIL_VERIFIED, {
    where
  })
  return update_user.affected_rows > 0
}

const desactivate = async (where) => {
  const { update_user: { returning } } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'inactive'
  })
  
  return returning[0] ? returning[0] : null
}

const activate = async (where) => {
  const { update_user: { returning } } = await hasuraUtils.request(CHANGE_STATE, {
    where,
    state: 'active'
  })
  
  return returning[0] ? returning[0] : null
}

module.exports = {
  getOne,
  getMany,
  insert,
  setEmail,
  setToken,
  setName,
  verifyEmail,
  setSecret,
  desactivate,
  activate
}
