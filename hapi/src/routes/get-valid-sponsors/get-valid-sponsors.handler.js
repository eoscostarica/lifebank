const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async () => {
  try {
    const validSponsors = await accountApi.getValidSponsors()
    return validSponsors
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
