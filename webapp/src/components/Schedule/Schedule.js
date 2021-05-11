import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const useStyles = makeStyles(styles)
const AMPM = ['am', 'pm']

const getWeekDaysSorted = (data) => {
  const sorter = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  }

  return data.sort((a, b) => {
    const day1 = a.day.toLowerCase()
    const day2 = b.day.toLowerCase()
    return sorter[day1] - sorter[day2]
  })
}

const getHours = () => {
  const times = []

  for (let s = 6; s < 24; s++) {
    const hour = s % 12
    times.push({
      label: (hour || '12') + ':00' + AMPM[Math.floor(s / 12)],
      value: ('0' + s).slice(-2) + ':00'
    })
  }

  return times
}

const convertHour = (time) => {
  const hour = time % 12

  return (hour || '12') + ':00' + AMPM[Math.floor(time / 12)]
}

const Schedule = ({
  handleOnAddSchedule,
  scheduleLoad,
  data,
  loading,
  showSchedule,
  showButton
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = useState('06:00')
  const [close, setClose] = useState('16:00')
  const [day, setDay] = useState('Sunday')
  const theme = useTheme()
  const [scheduleList, setscheduleList] = useState([])
  const [schedule, setSchedule] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const days = [
    { value: 'Sunday', label: t('schedule.sunday') },
    { value: 'Monday', label: t('schedule.monday') },
    { value: 'Tuesday', label: t('schedule.tuesday') },
    { value: 'Wednesday', label: t('schedule.wednesday') },
    { value: 'Thursday', label: t('schedule.thursday') },
    { value: 'Friday', label: t('schedule.friday') },
    { value: 'Saturday', label: t('schedule.saturday') }
  ]
  const hours = getHours()

  const handleChangeOpen = (event) => {
    setOpen(event.target.value)
  }

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const handleChangeClose = (event) => {
    setClose(event.target.value)
  }

  const handleChangeDay = (event) => {
    setDay(event.target.value)
  }

  const handleAddSchedulePerDay = () => {
    const isRepeated = schedule.some((item) => item.day === day)

    !isRepeated && setSchedule([...schedule, { day, open, close }])
  }

  const loadSchedule = () => {
    if (scheduleLoad) setSchedule(JSON.parse(scheduleLoad))
  }

  const handleDeleteSchedulePerDay = (item) => {
    const newSchedule = schedule.filter(({ day }) => day !== item)
    setSchedule(newSchedule)
  }

  const handleOpen = () => {
    setOpenModal(!openModal)
    if (loading) loadSchedule(scheduleLoad)
  }

  const onHandleOnAddSchedule = () => {
    handleOnAddSchedule(schedule)
    setOpenModal(false)
  }

  useEffect(() => {
    if (data) showSchedule && setscheduleList(getWeekDaysSorted(data))
  }, [showSchedule, data])

  return (
    <>
      {showButton && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          fullWidth
          className={classes.addBtn}
        >
          {t('schedule.addSchedule')}
        </Button>
      )}
      {showSchedule &&
        scheduleList.map((scheduleItem) => (
          <Box key={scheduleItem.day} className={classes.resultList}>
            <List>
              <ListItem>
                <Box className={classes.boxDivider}>
                  <Divider />
                </Box>
                <Box className={classes.scheduleListResult}>
                  <Typography variant="h6">{scheduleItem.day}</Typography>
                  <Typography variant="body1">
                    {`${convertHour(
                      scheduleItem.open.split(':')[0]
                    )} - ${convertHour(scheduleItem.close.split(':')[0])}`}
                  </Typography>
                </Box>
                <Box className={classes.boxDivider}>
                  <Divider />
                </Box>
              </ListItem>
            </List>
          </Box>
        ))}
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => { }}
        fullScreen={!isDesktop}
        maxWidth='xs'
        fullWidth
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dialog}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box className={classes.root}>
            <Typography variant="h3">
              {t('schedule.chooseYourSchedule')}
            </Typography>
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              label={t('schedule.day')}
              value={day}
              onChange={handleChangeDay}
              variant="outlined"
            >
              {days.map((option) => {
                const isSelected = schedule.some(
                  ({ day }) => day === option.value
                )

                return (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    disabled={isSelected}
                    selected={isSelected}
                  >
                    {option.label}
                  </MenuItem>
                )
              })}
            </TextField>
            <Box className={classes.componentBox}>
              <TextField
                id="outlined-select-currency"
                select
                label={t('schedule.open')}
                value={open}
                onChange={handleChangeOpen}
                variant="outlined"
              >
                {hours.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Typography>{t('offerView.to')}</Typography>
              <TextField
                id="outlined-select-currency"
                select
                label={t('schedule.close')}
                value={close}
                onChange={handleChangeClose}
                variant="outlined"
              >
                {hours.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Button
              className={classes.addBtn}
              variant="contained"
              color="default"
              onClick={handleAddSchedulePerDay}
            >
              {t('miscellaneous.add')}
            </Button>
            <Box className={classes.list}>
              <List className={classes.scheduleList}>
                {schedule.map((item) => (
                  <div key={item.day}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ScheduleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={t(`schedule.${item.day.toLowerCase()}`)}
                        secondary={`${convertHour(
                          item.open.split(':')[0]
                        )} to ${convertHour(item.close.split(':')[0])}`}
                      />
                      <IconButton
                        onClick={() => handleDeleteSchedulePerDay(item.day)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Box>
            {Boolean(schedule.length) && (
              <Button
                className={classes.saveBtn}
                variant="contained"
                color="primary"
                onClick={onHandleOnAddSchedule}
              >
                {t('common.save')}
              </Button>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

Schedule.propTypes = {
  handleOnAddSchedule: PropTypes.func,
  scheduleLoad: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
  showSchedule: PropTypes.bool,
  showButton: PropTypes.bool
}

Schedule.defaultProps = {
  handleOnAddSchedule: () => { },
  scheduleLoad: '',
  data: null,
  loading: false,
  showSchedule: false,
  showButton: true
}

export default Schedule
