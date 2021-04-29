const sendEmailHandler = require('./send-email.handler')
const sendEmailValidation = require('./send-email.validation')

module.exports = {
  method: 'POST',
  path: '/api/send-email',
  handler: sendEmailHandler,
  options: {
    validate: sendEmailValidation,
    auth: false
  }
}
