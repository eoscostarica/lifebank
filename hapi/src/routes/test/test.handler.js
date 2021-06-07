const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const weekCron = require('../../cron-jobs/weekly')
const monthCron = require('../../cron-jobs/monthly')
const yearlyCron = require('../../cron-jobs/yearly')

module.exports = async () => {
  try {
    // const response = await weekCron.generateNewSponsorAndOfferReportToLifebanks()
    const response = await yearlyCron.generateDonorsTransactionReports()

    return {
      response
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
