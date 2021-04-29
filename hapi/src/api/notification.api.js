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

// const EDIT_NOTIFICATION_STATE = `
//   mutation edit_state ($id: Int) {
//     edit_notification_state {
//       success
//     }
//   }
// `

const EDIT_NOTIFICATION_STATE = `
  mutation ($where: user_bool_exp!) {
    update_notification(where: $where, _set: {state: true}){
      affected_rows
    }
  }
`


/*const EDIT_NOTIFICATION_STATE = `
  mutation edit_state($where: user_bool_exp!) {
    edit_notification_state(where: $where, _set: { state: true }) {
      affected_rows
    }
  }
`
*/
const insert = notification => {
  return hasuraUtils.request(INSERT_NOTIFICATION, { notification })
}

const edit_state = where => {
  return hasuraUtils.request(EDIT_NOTIFICATION_STATE, { where })
}

module.exports = {
  insert,
  edit_state
}
