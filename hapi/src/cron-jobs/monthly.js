const mailApi = require('../utils/mail')
const { sponsorApi, lifebankApi, userApi, offerApi } = require('../api')

const generateSponsorsTransactionReports = async () => {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const users = await userApi.getMany({
    role: { _eq: 'sponsor' }
  })
  users.forEach(async (sponsor) => {
    const report = await sponsorApi.getReport(
      { dateFrom: monthAgo, dateFrom: today },
      sponsor.account
    )
    mailApi.sendTransactionReport(sponsor.email, sponsor.language, sponsor.role)
  })
}

const generateLifebanksTransactionReports = async () => {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const users = await userApi.getMany({
    role: { _eq: 'lifebank' }
  })

  users.forEach(async (lifebank) => {
    const report = await lifebankApi.getReport(
      { dateFrom: monthAgo, dateTo: today },
      lifebank.account
    )
    mailApi.sendTransactionReport(
      lifebank.email,
      lifebank.language,
      lifebank.role
    )
  })
}

const sendEmail = async () => {
  try {
    await mailApi.sendConfirmMessage(
      'leisterac.1997@gmail.com',
      'MONTHLY',
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

// generateSponsorsTransactionReports()
// generateLifebanksTransactionReports()
