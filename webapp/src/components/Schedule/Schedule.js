import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '15ch'
    }
  },
  labelDay: {
    fontSize: '14px !important',
    marginBottom: '0px !important'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiCheckbox-root': {
      paddingLeft: '0px !important',
      paddingRight: '5px !important'
    }
  }
}))

const getHours = () => {
  const times = []
  const ap = ['am', 'pm']

  for (let s = 0; s < 24; s++) {
    const hour = s % 12
    times.push({
      label: `${hour || '12'}:00 ${ap[Math.floor(s / 12)]}`,
      value: `${('0' + s).slice(-2)}:00`
    })
  }

  return times
}

const ScheduleRow = () => {
  // const days = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wenesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday'
  // ]
  const schedule = getHours()
  const classes = useStyles()
  const [open, setOpen] = React.useState('06:00')
  const [close, setClose] = React.useState('06:00')
  const [checked, setChecked] = React.useState(false)

  const handleChangeOpen = (event) => {
    setOpen(event.target.value)
  }
  const handleChangeClose = (event) => {
    setClose(event.target.value)
  }

  const handleChecked = () => {
    setChecked(!checked)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Checkbox
          checked={checked}
          onChange={handleChecked}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        {/* <Typography className={classes.labelDay}>{day}</Typography> */}
      </Box>
      <Box className={classes.box}>
        <TextField
          id="outlined-select-currency"
          select
          label="Open"
          value={open}
          onChange={handleChangeOpen}
          variant="outlined"
        >
          {schedule.map((option) => (
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
          {schedule.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  )
}

export default ScheduleRow
