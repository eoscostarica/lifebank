const removeOfferHandler = require('./remove-offer.handler')
const removeOfferValidation = require('./remove-offer.validation')

module.exports = {
  method: 'POST',
  path: '/api/remove-offer',
  handler: removeOfferHandler,
  options: {
    validate: removeOfferValidation,
    auth: false
  }
}
