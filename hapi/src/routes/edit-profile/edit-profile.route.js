const editProfileHandler = require('./edit-profile.handler')

module.exports = {
  method: 'POST',
  path: '/api/edit-profile',
  handler: editProfileHandler
}
