import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

import MapSelectLocation from '../../components/MapSelectLocation'
import Schedule from '../../components/Schedule'
import { constants } from '../../config'

const {
  LOCATION_TYPES: { SPONSOR }
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '60%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '40%'
    },
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textField: {
    marginTop: theme.spacing(2)
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
  }
}))

const EditProfileSponsor = ({ profile, isCompleting, onSubmit, loading }) => {
  const classes = useStyles()
  const [user, setUser] = useState({
    benefit_description: profile.benefit_description,
    bussines_type: profile.bussines_type,
    covid_impact: profile.covid_impact,
    email: profile.email,
    geolocation: profile.location ? JSON.parse(profile.location) : null,
    name: profile.name,
    schedule: profile.schedule,
    telephone: profile.telephone,
    website: profile.website
  })

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const handleOnAddStringifyValues = (field, value) => {
    setUser({ ...user, [field]: JSON.stringify(value) })
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <TextField
          id="name"
          style={{ display: user.name ? 'none' : '' }}
          label="Name"
          variant="outlined"
          placeholder="Your Sponsor Name"
          defaultValue={user.name}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('name', event.target.value)}
        />
        <TextField
          id="email"
          style={{ display: user.email ? 'none' : '' }}
          label="Email"
          variant="outlined"
          placeholder="Your email"
          defaultValue={user.email}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('email', event.target.value)}
        />
        <TextField
          id="website"
          style={{ display: user.website ? 'none' : '' }}
          label="Website"
          variant="outlined"
          placeholder="Website"
          defaultValue={user.website}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('website', event.target.value)}
        />
        <TextField
          id="telephone"
          style={{ display: user.telephone ? 'none' : '' }}
          label="Telephone"
          variant="outlined"
          placeholder="Telephone"
          defaultValue={user.telephone}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('telephone', event.target.value)}
        />
        <TextField
          id="bussinesType"
          label="Type"
          style={{ display: user.bussines_type ? 'none' : '' }}
          variant="outlined"
          placeholder="Type"
          defaultValue={user.bussines_type}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) =>
            handleSetField('bussines_type', event.target.value)
          }
        />

        <Box
          style={{ display: user.schedule ? 'none' : '' }}
          width="100%"
          className={classes.textField}
        >
          <Schedule
            handleOnAddSchedule={(value) =>
              handleOnAddStringifyValues('schedule', value)
            }
            data={user.schedule ? JSON.parse(user.schedule) : undefined}
            showSchedule
          />
        </Box>

        <TextField
          id="covidImpact"
          style={{ display: user.covid_impact ? 'none' : '' }}
          label="Covid Impact"
          variant="outlined"
          placeholder=""
          defaultValue={user.covid_impact}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) =>
            handleSetField('covid_impact', event.target.value)
          }
        />
        <TextField
          id="benefitDescription"
          style={{ display: user.benefit_description ? 'none' : '' }}
          label="Description of benefit"
          variant="outlined"
          placeholder=""
          defaultValue={user.benefit_description}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) =>
            handleSetField('benefit_description', event.target.value)
          }
        />
        <Typography variant="subtitle2" gutterBottom>
          Choose your location
        </Typography>

        <MapSelectLocation
          onGeolocationChange={(value) => handleSetField('geolocation', value)}
          markerType={SPONSOR}
          width="100%"
          height={400}
          mb={1}
        />
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

EditProfileSponsor.propTypes = {
  profile: PropTypes.object,
  isCompleting: PropTypes.bool,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileSponsor
