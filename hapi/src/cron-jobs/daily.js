const mailApi = require('../utils/mail')
const {
  userApi
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
  const DAY_TO_DELETE = 0
  const ONE_DAY = 1
  const ONE_WEEK = 7
  const ONE_MONTH = 30

  const inactiveUsers = await userApi.getMany({
    state: { _eq: 'inactive' }
  })

  inactiveUsers.forEach(user => {
    const startCloseAccountDate = new Date(user.updated_at)
    const finalCloseAccountDate = startCloseAccountDate
    finalCloseAccountDate.setMonth(startCloseAccountDate.getMonth() + 3)

    const differenceDays = getDaysBetweenDates(startCloseAccountDate)

    switch(differenceDays) {
      case DAY_TO_DELETE:
        mailApi.closeAccount(
          user.email,
          user.language
        )
        break
      case ONE_DAY:
        mailApi.closeAccountDayRemaining(
          user.email,
          user.language,
          finalCloseAccountDate.toISOString().split('T')[0]
        )
        break
      case ONE_WEEK:
        mailApi.closeAccountWeekRemaining(
          user.email,
          user.language,
          finalCloseAccountDate.toISOString().split('T')[0]
        )
        break
      case ONE_MONTH:
        mailApi.closeAccountMonthRemaining(
          user.email,
          user.language,
          finalCloseAccountDate.toISOString().split('T')[0]
        )
        break
      default: break
    }
  })
}

module.exports = {
  closeAccountReminder
}