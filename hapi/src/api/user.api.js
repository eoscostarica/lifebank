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

const insert = user => {
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

const verifyEmail = (where) => {
  return hasuraUtils.request(SET_EMAIL_VERIFIED, { where })
}

module.exports = {
  getOne,
  insert,
  setEmail,
  setToken,
  setName,
  verifyEmail,
  setSecret
}
