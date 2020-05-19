const donorSignupHandler = require('./donor-signup.handler')
const donorSignupValidation = require('./donor-signup.validation')

module.exports = {
  method: 'POST',
  path: '/api/donors',
  handler: donorSignupHandler,
  options: {
    validate: donorSignupValidation
  }
}
