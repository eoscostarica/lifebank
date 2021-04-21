const offerHandler = require('./redeem-offer.handler')
const offerValidation = require('./redeem-offer.validation')

module.exports = {
  method: 'POST',
  path: '/api/redeem-offer',
  handler: offerHandler,
  options: {
    validate: offerValidation
  }
}
