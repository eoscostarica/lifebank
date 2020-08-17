const profileHandler = require('./profile.handler')

module.exports = {
  method: 'POST',
  path: '/api/profile',
  handler: profileHandler
}
