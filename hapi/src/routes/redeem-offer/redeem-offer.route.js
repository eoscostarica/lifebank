const offerHandler = require('./create-account.handler')
const offerValidation = require('./create-account.validation')

module.exports = {
  method: 'POST',
  path: '/api/redeem-offer',
  handler: offerHandler,
  options: {
    validate: offerValidation,
    auth: true
  }
}
