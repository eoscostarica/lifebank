const { hasuraUtils } = require('../utils')

const GET_ALL = `
query ($where: vault_bool_exp) {
  vault(where: $where) {
    id
    type
    account
    created_at
    updated_at
  }
}
`

const GET_ONE = `
query ($where: vault_bool_exp) {
  vault(where: $where, limit: 1) {
    id
    type
    account
    created_at
    updated_at
  }
}
`

const GET_PASSWORD = `
  query get_password($account: String!) {
    vault(where: {account: {_eq: $account}},  limit: 1) {
      password
    }
  }
`

const INSERT = `
  mutation insert($vault: vault_insert_input!) {
    insert_vault_one(object: $vault) {
      id
      type
      account
      created_at
      updated_at
    }
  }
`

const getAll = async (where = {}) => {
  const { vault } = await hasuraUtils.request(GET_ALL, { where })

  return vault
}

const getOne = async (where = {}) => {
  const { vault } = await hasuraUtils.request(GET_ONE, { where })

  if (vault && vault.length > 0) {
    return vault[0]
  }

  return null
}

const getPassword = async account => {
  const { vault } = await hasuraUtils.request(GET_PASSWORD, { account })

  if (vault && vault.length > 0) {
    return vault[0].password
  }

  return null
}

const insert = vault => {
  return hasuraUtils.request(INSERT, { vault })
}

module.exports = {
  getAll,
  getOne,
  insert,
  getPassword
}
