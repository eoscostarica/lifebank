const addOfferHandler = require('./add-offer.handler')
const addOfferValidation = require('./add-offer.validation')

module.exports = {
  method: 'POST',
  path: '/api/add-offer',
  handler: addOfferHandler,
  options: {
    validate: addOfferValidation
  }
}
