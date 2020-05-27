const crypto = require('crypto')

const generateHash = async message => {
  const hashBuffer = crypto
    .createHash('sha256')
    .update(message)
    .digest('hex')
  console.log('hashHex', hashBuffer)

  return hashBuffer
}

generateHash('consent2lifeconsent2life')

module.exports = {
  generateHash
}
