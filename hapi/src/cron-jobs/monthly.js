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
    const { notifications } = await sponsorApi.getReport(
      { dateFrom: monthAgo, dateFrom: today },
      sponsor.account
    )

    let stringTransactionSentHtmlContent = ''
    notifications.sent.forEach((sentTransaction) => {
      stringTransactionSentHtmlContent =
        stringTransactionSentHtmlContent.concat(
          '<tr>',
          '<td>',
          sentTransaction.send_to,
          '</td>',
          '<td>',
          sentTransaction.tokens,
          '</td>',
          '<td>',
          sentTransaction.created_at_date,
          '</td>',
          '</tr>'
        )
    })

    let stringTransactionReceivedHtmlContent = ''
    notifications.received.forEach((receivedTransaction) => {
      stringTransactionReceivedHtmlContent =
        stringTransactionReceivedHtmlContent.concat(
          '<tr>',
          '<td>',
          receivedTransaction.payerUser,
          '</td>',
          '<td>',
          receivedTransaction.tokens ? receivedTransaction.tokens : 1,
          '</td>',
          '<td>',
          receivedTransaction.created_at_date,
          '</td>',
          '</tr>'
        )
    })

    mailApi.sendTransactionReport(
      sponsor.email,
      sponsor.language,
      sponsor.role,
      stringTransactionSentHtmlContent,
      stringTransactionReceivedHtmlContent
    )
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
    const { notifications } = await lifebankApi.getReport(
      { dateFrom: monthAgo, dateTo: today },
      lifebank.account
    )

    let stringTransactionSentHtmlContent = ''
    notifications.sent.forEach((sentTransaction) => {
      stringTransactionSentHtmlContent =
        stringTransactionSentHtmlContent.concat(
          '<tr>',
          '<td>',
          sentTransaction.send_to,
          '</td>',
          '<td>',
          sentTransaction.tokens,
          '</td>',
          '<td>',
          sentTransaction.created_at_date,
          '</td>',
          '</tr>'
        )
    })

    let stringTransactionReceivedHtmlContent = ''
    notifications.received.forEach((receivedTransaction) => {
      stringTransactionReceivedHtmlContent =
        stringTransactionReceivedHtmlContent.concat(
          '<tr>',
          '<td>',
          receivedTransaction.business,
          '</td>',
          '<td>',
          receivedTransaction.tokens,
          '</td>',
          '<td>',
          receivedTransaction.created_at_date,
          '</td>',
          '</tr>'
        )
    })

    mailApi.sendTransactionReport(
      lifebank.email,
      lifebank.language,
      lifebank.role,
      stringTransactionSentHtmlContent,
      stringTransactionReceivedHtmlContent
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

// generateSponsorsTransactionReports()
// generateLifebanksTransactionReports()
module.exports = {
  generateSponsorsTransactionReports,
  generateLifebanksTransactionReports
}
