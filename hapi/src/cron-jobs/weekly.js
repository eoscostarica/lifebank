const mailApi = require('../utils/mail')
const { accountApi, userApi, offerApi } = require('../api')

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
    let nerbySponsors = []
    for(i = 0; i < newSponsors.length; i++) {
      const tempSponsor = newSponsors[i]
      const sponsorProfile = await accountApi.getProfile(tempSponsor.account)
      sponsorProfile.location && accountApi.isCoordinateInsideBox(
        JSON.parse(sponsorProfile.location),
        donor.location
      ) ? nerbySponsors.push(tempSponsor) : null
    }

    mailApi.sendNewSponsorAndOfferReport(
      donor.email,
      donor.language,
      donor.role
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
    mailApi.sendNewSponsorAndOfferReport(
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
  generateNewSponsorAndOfferReportToDonors
}
