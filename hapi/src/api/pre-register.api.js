const { hasuraUtils } = require('../utils')

const INSERTLIFEBANK = `
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

const INSERTVERIFICATEEMAIL = `
  mutation ($verificate_email: verificate_email_insert_input!) {
    insert_verificate_email_one(object: $verificate_email) {
      email
      verification_code
    }
  }
`

const insertLifebank = (preregister_lifebank) => {
  return hasuraUtils.request(INSERTLIFEBANK, { preregister_lifebank })
}

const insertVerificateEmail = (verificate_email) => {
  return hasuraUtils.request(INSERTVERIFICATEEMAIL, { verificate_email })
}

module.exports = {
  insertLifebank,
  insertVerificateEmail
}
