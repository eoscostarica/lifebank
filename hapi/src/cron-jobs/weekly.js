const mailApi = require('../utils/mail')
const { accountApi, userApi, offerApi } = require('../api')
const { getProfile } = require('../api/account.api')

const generateNewSponsorAndOfferReportToDonors = async () => {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const donors = await userApi.getMany({
    role: { _eq: 'donor' },
    email_subscription: { _eq: true }
  })

  const donorsWithLocation = await accountApi.getDonorsCoordinates(donors || [])

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
    nerbySponsors.forEach((sponsor) =>  {
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
    newOffers.forEach((offer) =>  {
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

const generateNewSponsorAndOfferReportToLifebanks = async () => {
  const today = new Date()
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const lifebanks = await userApi.getMany({
    role: { _eq: 'lifebank' }
  })

  const newSponsors = await userApi.getMany({
    role: { _eq: 'sponsor' },
    created_at: { _gte: weekAgo, _lte: today }
  })

  const newOffers = await offerApi.getMany({
    created_at: { _gte: weekAgo, _lte: today }
  })

  lifebanks.forEach(async (lifebank) => {
    const lifebankProfile = await getProfile(lifebank.account)
    
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
    nerbySponsors.forEach((sponsor) =>  {
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
    newOffers.forEach((offer) =>  {
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

const sendEmail = async () => {
  try {
    await mailApi.sendConfirmMessage(
      'leisterac.1997@gmail.com',
      'WEEKLY',
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
// sendEmail()

// generateNewSponsorAndOfferReportToDonors()
// generateNewSponsorAndOfferReportToLifebanks()

module.exports = {
  generateNewSponsorAndOfferReportToDonors,
  generateNewSponsorAndOfferReportToLifebanks
}
