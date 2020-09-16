const { hasuraUtils } = require('../utils')

const INSERT = `
  mutation ($preregister_lifebank: preregister_lifebank_insert_input!) {
    insert_preregister_lifebank_one(object: $preregister_lifebank) {
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
const insert = preregister_lifebank => {
  console.log("preregister_lifebank: ", preregister_lifebank)
  return hasuraUtils.request(INSERT, { preregister_lifebank })
}

module.exports = {
  insert
}