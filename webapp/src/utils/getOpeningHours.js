export const getOpeningHours = (schedule) => {
  return JSON.parse(schedule).map(
    (el) => `${el.day.substr(0, 2)} ${el.open}-${el.close}`
  )
}
