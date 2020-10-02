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
      name
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

const SET_NAME = `
  mutation ($where: user_bool_exp!, $name: String) {
    update_user(where: $where, _set: { name: $name }) {
      affected_rows
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

const setName = (where, name) => {
  return hasuraUtils.request(SET_NAME, { where, name })
}

module.exports = {
  getOne,
  insert,
  setEmail,
  setName
}
