const verifyEmailHandler = require('./verify-email.handler')
const verifyEmailValidation = require('./verify-email.validation')

module.exports = {
  method: 'POST',
  path: '/api/verify-email',
  handler: verifyEmailHandler,
  options: {
    validate: verifyEmailValidation,
    auth: false
  }
}
