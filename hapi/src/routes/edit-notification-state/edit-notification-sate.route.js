const editNotificationState = require('./edit-notification-state.handler')

module.exports = {
  method: 'POST',
  path: '/api/edit-notification-state',
  handler: editNotificationState
}