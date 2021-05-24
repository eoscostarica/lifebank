const mailApi = require('../utils/mail')
const {
  sponsorApi,
  lifebankApi,
  userApi
} = require('../api')


const generateReportToUsers = async() => {
  await generateLifebankReports()
  await generateSponsorsReports()
}

const generateLifebankReports = async() => {
  var today = new Date();
  var monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  
  const users = await userApi.getMany({
    role: { _eq: 'lifebank' }
  })

  users.forEach(async (lifebank) => {
    const report = await lifebankApi.getReport( { dateFrom: monthAgo, dateTo: today }, lifebank.account )
    mailApi.sendMonthlyReport(
      lifebank.email,
      'Monthly report',
      'Report',
      'You have '.concat(report.notifications.sent.length,' sent transactions and ', report.notifications.received.length, ' received transactions')
    )
  });
}

const generateSponsorsReports = async() => {
  var today = new Date();
  var monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const users = await userApi.getMany({
    role: { _eq: 'sponsor' }
  })
  users.forEach(async (sponsor) => {
    const report = await sponsorApi.getReport( { dateFrom: monthAgo, dateFrom: today }, sponsor.account )
    mailApi.sendMonthlyReport(
      sponsor.email,
      'Monthly report',
      'Report',
      'You have '.concat(report.notifications.received.length, ' received transactions')
    )
  });
}

const sendEmail = async() => {
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
  generateReportToUsers
}