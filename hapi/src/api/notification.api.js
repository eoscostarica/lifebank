const { hasuraUtils } = require('../utils')

const INSERT_NOTIFICATION = `
  mutation insert($notification: notification_insert_input!) {
    insert_notification_one(object: $notification) {
      id
      account_from
      account_to
      title
      description
      type
      payload
      created_at
      updated_at
    }
  }
`

const insert = notification => {
  return hasuraUtils.request(INSERT_NOTIFICATION, { notification })
}

module.exports = {
  insert
}
