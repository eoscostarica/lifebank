const mailApi = require('../utils/mail')
const {
  sponsorApi,
  lifebankApi,
  userApi,
  offerApi,
  accountApi
} = require('../api')

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

const generateNewSponsorAndOfferReportToDonors = async () => {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const donors = await userApi.getMany({
    role: { _eq: 'donor' },
    email_subscription: { _eq: true }
  })

  const donorsWithLocation = await accountApi.getDonorsCoordinates(donors)

  const newSponsors = await userApi.getMany({
    role: { _eq: 'sponsor' },
    created_at: { _gte: monthAgo, _lte: today }
  })

  const newOffers = await offerApi.getMany({
    created_at: { _gte: monthAgo, _lte: today }
  })

  donorsWithLocation.forEach(async (donor) => {
    const nerbySponsors = []
    for (i = 0; i < newSponsors.length; i++) {
      const tempSponsor = newSponsors[i]
      const sponsorProfile = await accountApi.getProfile(tempSponsor.account)
      sponsorProfile.location &&
      accountApi.isCoordinateInsideBox(
        JSON.parse(sponsorProfile.location),
        donor.location
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
      donor.email,
      donor.language,
      donor.role,
      stringSponsorHtmlContent,
      stringOfferHtmlContent
    )
  })
  return {
    success: true
  }
}

generateSponsorsTransactionReports()
generateLifebanksTransactionReports()
generateNewSponsorAndOfferReportToDonors()
