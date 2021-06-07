const mailApi = require('../utils/mail')
const { sponsorApi, lifebankApi, userApi, offerApi, accountApi } = require('../api')

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

const generateNewSponsorAndOfferReportToLifebanks = async () => {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setDate(monthAgo.getDate() - 7)

  const lifebanks = await userApi.getMany({
    role: { _eq: 'lifebank' }
  })

  const newSponsors = await userApi.getMany({
    role: { _eq: 'sponsor' },
    created_at: { _gte: monthAgo, _lte: today }
  })

  const newOffers = await offerApi.getMany({
    created_at: { _gte: monthAgo, _lte: today }
  })

  lifebanks.forEach(async (lifebank) => {
    const lifebankProfile = await accountApi.getProfile(lifebank.account)

    const nerbySponsors = []
    for (i = 0; i < newSponsors.length; i++) {
      const tempSponsor = newSponsors[i]
      const sponsorProfile = await accountApi.getProfile(tempSponsor.account)
      sponsorProfile.location &&
      accountApi.isCoordinateInsideBox(
        JSON.parse(sponsorProfile.location),
        JSON.parse(lifebankProfile.location)
      )
        ? nerbySponsors.push(tempSponsor)
        : null
    }

    let stringSponsorHtmlContent = ''
    nerbySponsors.forEach((sponsor) => {
      stringSponsorHtmlContent = stringSponsorHtmlContent.concat(
        '<br><a href="',
        'https://lifebank.io/info/',
        sponsor.account,
        '">',
        sponsor.name,
        '</a>'
      )
    })

    let stringOfferHtmlContent = ''
    newOffers.forEach((offer) => {
      stringOfferHtmlContent = stringOfferHtmlContent.concat(
        '<br><a href="https://lifebank.io/">',
        offer.offer_name,
        '</a>'
      )
    })

    mailApi.sendNewSponsorAndOfferReport(
      lifebank.email,
      lifebank.language,
      lifebank.role,
      stringSponsorHtmlContent,
      stringOfferHtmlContent
    )
  })
}

generateSponsorsTransactionReports()
generateLifebanksTransactionReports()
generateNewSponsorAndOfferReportToLifebanks()