const offerHandler = require('./offer.handler')

module.exports = {
  method: 'POST',
  path: '/api/offer',
  handler: offerHandler
  // options: {
  //   auth: true
  // }
}
