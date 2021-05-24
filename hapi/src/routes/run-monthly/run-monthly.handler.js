const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

// const { accountApi } = require('../../api')
const { sendEmail, generateReportToUsers } = require('../../cron-jobs/monthly')

module.exports = async () => {
  try {
    
    // sendEmail()
    generateReportToUsers()
    // const response = await accountApi.login(input)

    return {
      successful: true
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
