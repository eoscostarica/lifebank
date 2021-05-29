const donateHandler = require('./donate.handler')
const donateValidation = require('./donate.validation')

module.exports = {
  method: 'POST',
  path: '/api/donate',
  handler: donateHandler,
  options: {
    validate: donateValidation
  }
}
