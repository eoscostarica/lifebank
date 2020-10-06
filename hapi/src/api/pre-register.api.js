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
      invitation_code,
      verification_code
    }
  }
`

const SET_EMAIL_VERIFIED = `
  mutation ($where: preregister_lifebank_bool_exp!) {
    update_preregister_lifebank(where: $where, _set: { email_verified: true }) {
      affected_rows
    }
  }
`

const insertLifebank = (preregister_lifebank) => {
  return hasuraUtils.request(INSERT_LIFEBANK, { preregister_lifebank })
}

const verifyEmail = (where) => {
  return hasuraUtils.request(SET_EMAIL_VERIFIED, { where })
}

module.exports = {
  insertLifebank,
  verifyEmail
}
