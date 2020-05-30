const signupHandler = require('./signup.handler')

module.exports = {
  method: 'POST',
  path: '/api/signup',
  handler: signupHandler
}
