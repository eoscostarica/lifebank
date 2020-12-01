const changePasswordHandler = require('./change-password.handler')
const changePasswordValidation = require('./change-password.validation')

module.exports = {
  method: 'POST',
  path: '/api/change-password',
  handler: changePasswordHandler,
  options: {
    validate: changePasswordValidation,
    auth: false
  }
}
