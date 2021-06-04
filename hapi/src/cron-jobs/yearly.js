const mailApi = require('../utils/mail')
const { lifebankApi, userApi } = require('../api')

const generateDonorsTransactionReports = async () => {
  const today = new Date()
  const yearAgo = new Date()
  yearAgo.setMonth(yearAgo.getMonth() - 12)
  const users = await userApi.getMany({
    role: { _eq: 'donor' }
  })
  users.forEach(async (donor) => {
    const report = await lifebankApi.getReport(
      { dateFrom: yearAgo, dateTo: today },
      donor.account
    )
    mailApi.sendTransactionReport(donor.email, donor.language, donor.role)
  })
}

const sendEmail = async () => {
  try {
    await mailApi.sendConfirmMessage(
      'leisterac.1997@gmail.com',
      'YEARLY',
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
sendEmail()

// generateDonorsTransactionReports()
