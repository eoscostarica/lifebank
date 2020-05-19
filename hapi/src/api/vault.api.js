const { hasuraUtils } = require('../utils')

const NEW_VAULT = `
  mutation newVault($vault: vault_insert_input!) {
    insert_vault_one(object: $vault) {
      id
      secret
      account
      password
      created_at
      updated_at
    }
  }
`

const newVaut = vault => {
  return hasuraUtils.request(NEW_VAULT, { vault })
}

module.exports = {
  newVaut
}
