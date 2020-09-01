const { hasuraUtils } = require('../utils')

const INSERT = `
  mutation ($offer: offer_insert_input!) {
    insert_user_one(object $user) {
      id
    }
  }
`

const insert = offer => {
  return hasuraUtils.request(INSERT, { offer })
}

module.exports = {
  insert
}
