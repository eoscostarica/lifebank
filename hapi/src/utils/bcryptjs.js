const bcrypt = require('bcryptjs')
const saltRounds = 10

const createPasswordHash = async password => {
  return await bcrypt.hash(password, saltRounds)
}

module.exports = {
  createPasswordHash
}