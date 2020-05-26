import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
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
import Paper from '@material-ui/core/Paper'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'

const AMPM = ['am', 'pm']
const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 2),
    '& h3': {
      marginBottom: theme.spacing(3)
    }
  },
  scheduleBox: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiTextField-root': {
      width: '15ch'
    }
  },
  scheduleList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '80%',
    width: 350,
    outlineWidth: 0
  },
  list: {
    height: 250,
    overflowY: 'scroll'
  },
  saveBtn: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      width: '50%'
    }
  }
}))

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
  var hour = time % 12

  return (hour || '12') + ':00' + AMPM[Math.floor(time / 12)]
}

const Schedule = ({ handleOnAddSchedule }) => {
  const classes = useStyles()
  const [open, setOpen] = useState('06:00')
  const [close, setClose] = useState('16:00')
  const [day, setDay] = useState('Sunday')
  const [schedule, setSchedule] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const days = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wenesday', label: 'Wenesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' }
  ]
  const hours = getHours()

  const handleChangeOpen = (event) => {
    setOpen(event.target.value)
  }

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

  const handleDeleteSchedulePerDay = (item) => {
    const newSchedule = schedule.filter(({ day }) => day !== item)
    setSchedule(newSchedule)
  }

  const handleOpen = () => {
    setOpenModal(!openModal)
  }

  const onHandleOnAddSchedule = () => {
    handleOnAddSchedule(schedule)
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen} fullWidth>
        Add Schedule
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={() => {}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openModal}>
          <Paper className={classes.paper}>
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
              <Typography variant="h3">Choose Your Schedule</Typography>
              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label="Day"
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
              <Box className={classes.scheduleBox}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Open"
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
                <Typography>to</Typography>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Close"
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
                variant="contained"
                color="primary"
                onClick={handleAddSchedulePerDay}
              >
                Add
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
                          primary={item.day}
                          secondary={`${convertHour(
                            item.open.split(':')[0]
                          )} to ${convertHour(item.close.split(':')[0])}`}
                        />
                        <IconButton
                          onClick={() => handleDeleteSchedulePerDay(item.day)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Box>
              {Boolean(schedule.length) && (
                <Box className={classes.saveBtn}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onHandleOnAddSchedule}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}

Schedule.propTypes = {
  handleOnAddSchedule: PropTypes.func
}

Schedule.defaultProps = {
  handleOnAddSchedule: () => {}
}

export default Schedule
