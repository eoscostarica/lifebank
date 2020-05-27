const signupHandler = require('./signup.handler')
// const signupValidation = require('./sponsor-signup.validation')

module.exports = {
  method: 'POST',
  path: '/api/signup',
  handler: signupHandler
  // options: {
  //   validate: sponsorSignupValidation
  // }
}
