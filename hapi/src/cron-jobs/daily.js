const mailApi = require('../utils/mail')
const {
  sponsorApi,
  lifebankApi,
  userApi,
  offerApi,
  accountApi
} = require('../api')

const getDaysBetweenDates = (date) => {
  const currentDate = new Date('2021-06-15')
  const secondInMiliseconds = 1000
  const minuteInSeconds = 60
  const hoursInMinutes = 60
  const dayInHours = 24
  return Math.trunc((currentDate - date) / (secondInMiliseconds * minuteInSeconds * hoursInMinutes * dayInHours))
}

const closeAccountReminder = async () => {
  console.log('CLOSE ACCOUNT REMINDER')
  const ONE_DAY = 1
  const ONE_WEEK = 7
  const ONE_MONTH = 30

  const inactiveUsers = await userApi.getMany({
    state: { _eq: 'inactive' }
  })

  inactiveUsers.forEach(user => {
    const closeAccountDate = new Date(user.updated_at)
    const differenceDays = getDaysBetweenDates(closeAccountDate)

    switch(differenceDays) {
      case ONE_DAY:
        
        break
      case ONE_WEEK:
        
        break
      case ONE_MONTH:
        
        break
      default: break
    }

    console.log('TIME-AGO', differenceDays)
  })
}

module.exports = {
  closeAccountReminder
}