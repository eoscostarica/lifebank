const { hasuraUtils } = require('../utils')

const INSERT_LIFEBANK = `
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
    }
  }
`

const INSERT_VERIFICATION_EMAIL = `
  mutation ($verification_email: verification_email_insert_input!) {
    insert_verification_email_one(object: $verification_email) {
      email
      verification_code
    }
  }
`

const insertLifebank = (preregister_lifebank) => {
  return hasuraUtils.request(INSERT_LIFEBANK, { preregister_lifebank })
}

const insertVerificateEmail = (verification_email) => {
  return hasuraUtils.request(INSERT_VERIFICATION_EMAIL, { verification_email })
}

module.exports = {
  insertLifebank,
  insertVerificateEmail
}
