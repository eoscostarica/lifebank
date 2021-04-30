const checkEmailVerifiedHandler = require('./check-email-verified.handler')
const checkEmailVerifiedValidation = require('./check-email-verified.validation')

module.exports = {
  method: 'POST',
  path: '/api/check-email-verified',
  handler: checkEmailVerifiedHandler,
  options: {
    validate: checkEmailVerifiedValidation,
    auth: false
  }
}
