const mailApi = require('../utils/mail')
const {
  userApi,
  accountApi
} = require('../api')

const getDaysBetweenDates = (date) => {
  const currentDate = new Date()
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
        accountApi.finalCloseAccount(user.account)
        mailApi.closeAccount(
          user.email,
          user.language
        )
        break
      case ONE_DAY && user.email_subscription:
        mailApi.closeAccountDayRemaining(
          user.email,
          user.account,
          user.language,
          finalCloseAccountDate.toISOString().split('T')[0]
        )
        break
      case ONE_WEEK && user.email_subscription:
        mailApi.closeAccountWeekRemaining(
          user.email,
          user.account,
          user.language,
          finalCloseAccountDate.toISOString().split('T')[0]
        )
        break
      case ONE_MONTH && user.email_subscription:
        mailApi.closeAccountMonthRemaining(
          user.email,
          user.account,
          user.language,
          finalCloseAccountDate.toISOString().split('T')[0]
        )
        break
      default: break
    }
  })
}

closeAccountReminder()