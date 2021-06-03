const mailApi = require('../utils/mail')
const { sponsorApi, lifebankApi, userApi, offerApi } = require('../api')

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
    mailApi.sendTransactionReport(
      donor.email,
      donor.language,
      donor.role
    )
  })
}

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
    mailApi.sendTransactionReport(
      sponsor.email,
      sponsor.language,
      sponsor.role
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

const generateNewSponsorAndOfferReportToDonors = async () => {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const donors = await userApi.getMany({
    role: { _eq: 'donor' }
  })

  const newSponsors = await userApi.getMany({
    role: { _eq: 'sponsor' },
    created_at: { _gte: monthAgo, _lte: today }
  })

  const newOffers = await offerApi.getMany({
    created_at: { _gte: monthAgo, _lte: today }
  })

  donors.forEach(async (donor) => {
    mailApi.sendNewSponsorAndOfferReport(
      donor.email,
      donor.language,
      donor.role
    )
  })
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
sendEmail()

