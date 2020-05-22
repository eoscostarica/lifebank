const { hasuraUtils } = require('../utils')

const INSERT_HISTORY = `
  mutation insert($transaction: history_insert_input!) {
    insert_history_one(object: $transaction) {
      transaction_id
      processed 
      created_at
      updated_at
    }
  }
`

const insert = transaction => {
  return hasuraUtils.request(INSERT_HISTORY, { transaction })
}

module.exports = {
  insert
}
