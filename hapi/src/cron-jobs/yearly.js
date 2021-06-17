const mailApi = require('../utils/mail')
const { donorApi, userApi } = require('../api')

const generateDonorsTransactionReports = async () => {
  const today = new Date()
  const yearAgo = new Date()
  yearAgo.setMonth(yearAgo.getMonth() - 12)

  const users = await userApi.getMany({
    role: { _eq: 'donor' }
  })

  users.forEach(async (donor) => {
    const { notifications } = await donorApi.getReport(
      { dateFrom: yearAgo, dateTo: today },
      donor.account
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
          receivedTransaction.send_from,
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
      donor.email,
      donor.language,
      donor.role,
      stringTransactionSentHtmlContent,
      stringTransactionReceivedHtmlContent
    )
  })
}

generateDonorsTransactionReports()
