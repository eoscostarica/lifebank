const { hasuraUtils } = require('../utils')

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
      account
      created_at
      updated_at
    }
  }
`

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
  insert,
  getPassword
}
