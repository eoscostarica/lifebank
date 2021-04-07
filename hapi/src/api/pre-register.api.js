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
      verification_code,
      requirement
    }
  }
`

const SET_EMAIL_VERIFIED = `
  mutation ($where: preregister_lifebank_bool_exp!) {
    update_preregister_lifebank(where: $where, _set: { email_verified: true }) {
      returning {
        address
        description
        email
        coordinates
        immunity_test
        invitation_code
        name
        phone
        schedule
        urgency_level
        verification_code
      }
      affected_rows
    }
  }
`

const VALIDATION_VERIFICATION_CODE = `
  query($verification_code: String!) {
    preregister_lifebank(where: { verification_code: { _eq: $verification_code } }) {
      verification_code
    }
    user(where: { verification_code: { _eq: $verification_code } }) {
      verification_code
    }
  }
`

const GET_LIFEBANK_DATA = `
  query($where: preregister_lifebank_bool_exp!) {
    preregister_lifebank(where: $where, limit: 1) {
      address
      coordinates
      description
      immunity_test
      name
      password
      phone
      schedule
      urgency_level,
      state,
      requirement
    }
  }
`

const insertLifebank = (preregister_lifebank) => {
  return hasuraUtils.request(INSERT_LIFEBANK, { preregister_lifebank })
}

const verifyEmail = (where) => {
  return hasuraUtils.request(SET_EMAIL_VERIFIED, { where })
}

const getOne = (where) => {
  return hasuraUtils.request(GET_LIFEBANK_DATA, { where })
}

const validationVerificationCode = (verification_code) => {
  return hasuraUtils.request(VALIDATION_VERIFICATION_CODE, {
    verification_code
  })
}

module.exports = {
  insertLifebank,
  verifyEmail,
  validationVerificationCode,
  getOne
}
