const sponsorSignupHandler = require('./sponsor-signup.handler')
const sponsorSignupValidation = require('./sponsor-signup.validation')

module.exports = {
  method: 'POST',
  path: '/api/sponsors',
  handler: sponsorSignupHandler,
  options: {
    validate: sponsorSignupValidation
  }
}
