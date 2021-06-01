const changeEmailHandler = require('./change-email.handler')
const changeEmailValidation = require('./change-email.validation')

module.exports = {
  method: 'POST',
  path: '/api/change-email',
  handler: changeEmailHandler,
  options: {
    validate: changeEmailValidation,
    auth: false
  }
}
