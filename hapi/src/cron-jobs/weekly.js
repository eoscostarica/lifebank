const mailApi = require('../utils/mail')
const { accountApi, userApi, offerApi } = require('../api')

const generateNewSponsorAndOfferReportToDonors = async () => {
  const today = new Date()
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const donors = await userApi.getMany({
    role: { _eq: 'donor' },
    email_subscription: { _eq: true }
  })

  const donorsWithLocation = await accountApi.getDonorsCoordinates(donors || [])

  const newSponsors = await userApi.getMany({
    role: { _eq: 'sponsor' },
    created_at: { _gte: weekAgo, _lte: today }
  })

  const newOffers = await offerApi.getMany({
    created_at: { _gte: weekAgo, _lte: today }
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

generateNewSponsorAndOfferReportToDonors()
