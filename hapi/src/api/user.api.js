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

const getOne = async (where = {}) => {
  const { user } = await hasuraUtils.request(GET_ONE, { where })

  if (user && user.length > 0) {
    return user[0]
  }

  return null
}

const insert = user => {
  return hasuraUtils.request(INSERT, { user })
}

const setEmail = (where, email) => {
  return hasuraUtils.request(SET_EMAIL, { where, email })
}

module.exports = {
  getOne,
  insert,
  setEmail
}
