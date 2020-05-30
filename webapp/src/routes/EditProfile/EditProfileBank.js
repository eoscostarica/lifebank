import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    }
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  boxBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    '& a': {
      textDecoration: 'none'
    }
  },
  labelBtn: {
    color: theme.palette.white
  },
  bloodDemand: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  levelReward: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiTextField-root': {
      width: 65,
      margin: '0px !important'
    },
    '& h4': {
      letterSpacing: '0.25px',
      width: '65%'
    }
  },
  text: {
    color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
    margin: theme.spacing(2, 0)
  }
}))

const EditProfileBank = ({ profile, onSubmit, loading }) => {
  const classes = useStyles()
  const [user, setUser] = useState({
    description: profile.description,
    address: profile.address,
    phone_number: profile.phone_number,
    email: profile.email,
    geolocation: JSON.parse(profile.location),
    name: profile.name,
    schedule: profile.schedule,
    blood_urgency_level: profile.blood_urgency_level,
    has_immunity_test: Boolean(profile.has_immunity_test)
  })
  const marks = [
    {
      value: 1,
      label: 'Low'
    },
    {
      value: 2,
      label: 'Medium'
    },
    {
      value: 3,
      label: 'High'
    }
  ]
  const valueLabelFormat = (value) => {
    switch (value) {
      case 1:
        return 'Low'
      case 2:
        return 'Medium'
      case 3:
        return 'High'
      default:
        return 'N/A'
    }
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <TextField
          id="fullname"
          label="Organization"
          fullWidth
          variant="outlined"
          placeholder="Your Organization Name"
          defaultValue={user.name}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('name', event.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          fullWidth
          placeholder="Your Email"
          defaultValue={user.email}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('email', event.target.value)}
        />
        <Typography variant="h4">Blood Demand Level</Typography>
        <Typography variant="body1" className={classes.text}>
          Drag or tap to the demand level that represent your Lifebank actual
          necesities. You can set the token rewards depending on this levels.
        </Typography>

        <Box className={classes.bloodDemand}>
          <Slider
            valueLabelDisplay="auto"
            defaultValue={user.blood_urgency_level}
            valueLabelFormat={valueLabelFormat}
            onChange={(event, value) =>
              handleSetField('blood_urgency_level', value)
            }
            marks={marks}
            step={null}
            min={1}
            max={3}
          />
        </Box>

        <Box className={classes.levelReward}>
          <Typography variant="h4">Low Level Reward</Typography>
          <TextField
            id="lowLevelReward"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={1}
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) =>
              handleSetField('low_leve_reward', event.target.value)
            }
          />
        </Box>
        <Box className={classes.levelReward}>
          <Typography variant="h4">Medium Level Reward</Typography>
          <TextField
            id="mediumLevelReward"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={2}
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) =>
              handleSetField('mid_leve_reward', event.target.value)
            }
          />
        </Box>
        <Box className={classes.levelReward}>
          <Typography variant="h4">Urgent Level Reward</Typography>
          <TextField
            id="urgentLevelReward"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={3}
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) =>
              handleSetField('urgent_leve_reward', event.target.value)
            }
          />
        </Box>
      </Box>
      <Box className={classes.btnWrapper}>
        <Box className={classes.boxBtn}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit(user)}
          >
            Save
          </Button>
          <Link to="/profile" className={classes.labelBtn}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.labelBtn}
            >
              cancel
            </Button>
          </Link>
        </Box>
        {loading && <CircularProgress />}
      </Box>
    </form>
  )
}

EditProfileBank.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileBank
