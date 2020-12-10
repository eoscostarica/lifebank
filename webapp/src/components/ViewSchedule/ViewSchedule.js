import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  text: {
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))

const ViewSchedule = ({schedule}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  const generateSchedule = (schedules) => {
    const scheduleFinal = []
    let schedule
    for (schedule of schedules) {
      if (scheduleFinal.length > 0) {
        let insert = 0
        scheduleFinal.forEach((element) => {
          if (
            schedule.open === element[1][0] &&
            schedule.close === element[1][1]
          ) {
            element[0] = `${element[0]}, ${t(`schedule.${schedule.day.toLowerCase()}`)}`
            insert++
          }
        })
        if (insert === 0) {
          const tempaSchedule = [
            [t(`schedule.${schedule.day.toLowerCase()}`)],
            [schedule.open, schedule.close]
          ]
          scheduleFinal.push(tempaSchedule)
        }
      } else {
        const tempaSchedule = [[t(`schedule.${schedule.day.toLowerCase()}`)], [schedule.open, schedule.close]]
        scheduleFinal.push(tempaSchedule)
      }
    }

    return scheduleFinal
  }

  return (
    <>
      {JSON.parse(schedule).length > 0 &&
      generateSchedule(
        JSON.parse(schedule)
      ).map((scheduleItem, index) => (
        <Typography
          key={index}
          className={classes.text}
          id={index}
          variant="body1"
        >{`${scheduleItem[0]} ${t('schedule.from')} ${scheduleItem[1][0]} ${t('offerView.to')} ${scheduleItem[1][1]}`}</Typography>
      ))}
    </>
  )
}

ViewSchedule.propTypes = {
  schedule: PropTypes.any
}

export default ViewSchedule
