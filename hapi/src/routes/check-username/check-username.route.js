const checkUsernameHandler = require('./check-username.handler')
const checkUsernameValidation = require('./check-username.validation')

module.exports = {
  method: 'POST',
  path: '/api/check-username',
  handler: checkUsernameHandler,
  options: {
    validate: checkUsernameValidation,
    auth: false
  }
}
