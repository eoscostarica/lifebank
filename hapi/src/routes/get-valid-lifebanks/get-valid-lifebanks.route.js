const getValidLifebanksHandler = require('./get-valid-lifebanks.handler')

module.exports = {
  method: 'POST',
  path: '/api/get-valid-lifebanks',
  handler: getValidLifebanksHandler,
  options: {
    auth: false
  }
}