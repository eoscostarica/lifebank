const mailApi = require('../utils/mail')
const { lifebankApi, userApi } = require('../api')

const getReport = async () => {}

const sendEmail = async () => {
  try {
    await mailApi.sendConfirmMessage(
      'leisterac.1997@gmail.com',
      'SUBJECT',
      'TITLE',
      'MESSAGE'
    )

    return {
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      success: false
    }
  }
}

module.exports = {
  sendEmail,
  getReport
}
