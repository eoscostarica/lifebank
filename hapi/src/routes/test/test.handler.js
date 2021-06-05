const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const weekCron = require('../../cron-jobs/weekly')

module.exports = async () => {
  try {
    const response = await weekCron.generateNewSponsorAndOfferReportToDonors()

    return {
      response
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
