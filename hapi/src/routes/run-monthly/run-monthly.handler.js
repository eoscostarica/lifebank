const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const {
  sendEmail,
  generateDonorsTransactionReports,
  generateSponsorsTransactionReports,
  generateLifebanksTransactionReports,
  generateNewSponsorAndOfferReportToDonors,
  generateNewSponsorAndOfferReportToLifebanks
} = require('../../cron-jobs')

module.exports = async () => {
  try {
    
    sendEmail()
    // generateDonorsTransactionReports()
    // generateNewSponsorAndOfferReportToDonors()
    // generateNewSponsorAndOfferReportToLifebanks()

    return {
      successful: true
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
