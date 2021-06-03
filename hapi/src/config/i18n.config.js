const i18n = require('i18next')
const resources = require('../language')

i18n.init({
  resources,
  lng: 'en'
})

module.exports = i18n
