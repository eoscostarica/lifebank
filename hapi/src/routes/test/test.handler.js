const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { closeAccountReminder } = require('../../cron-jobs/daily')

module.exports = async () => {
  try {
    await closeAccountReminder()

    return {
      success: true
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}
