const { hasuraUtils } = require('../utils')

const INSERT = `
  mutation ($pre_register_lifebank: pre_register_lifebank_insert_input!) {
    insert_pre_register_lifebank_one(object: $pre_register_lifebank) {
      email
      password
      name
      address
      schedule
      phone
      description
      urgency_level
      coordinates
      immunity_test
      invitation_code
      verification_code
    }
  }
`
const insert = lifebankData => {
  return hasuraUtils.request(INSERT, { lifebankData })
}

module.exports = {
  insert
}