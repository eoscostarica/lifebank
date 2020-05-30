import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import ReCAPTCHA from 'react-google-recaptcha'

import MapSelectLocation from '../../components/MapSelectLocation'
import Schedule from '../../components/Schedule'
import { captchaConfig, constants } from '../../config'

const {
  LOCATION_TYPES: { LIFE_BANK }
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  formGroup: {
    marginBottom: theme.spacing(2)
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  mapBox: {
    marginTop: theme.spacing(2)
  }
}))

const SignupLifeBank = ({
  onSubmit,
  setField,
  user,
  loading,
  isUsernameValid,
  children
}) => {
  const classes = useStyles()
  const handleOnGeolocationChange = useCallback(
    (geolocation) => setField('geolocation', geolocation),
    [setField]
  )
  const handleOnAddSchedule = useCallback(
    (data) => setField('schedule', JSON.stringify(data)),
    [setField]
  )
  const [recaptchaValue, serRecaptchaValue] = useState('')

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

  return (
    <form autoComplete="off" className={classes.form}>
      <div className={classes.formGroup}>{children}</div>
      <div className={classes.formGroup}>
        <TextField
          id="secret"
          label="Secret"
          type="password"
          fullWidth
          placeholder="Your Secret"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => setField('secret', event.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          placeholder="Your Email"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('email', event.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          id="name"
          label="Name"
          placeholder="Name"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('name', event.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          id="description"
          label="Description"
          placeholder="Description"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('description', event.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          id="address"
          label="Address"
          placeholder="Address"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('address', event.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          id="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('phone_number', event.target.value)}
        />
      </div>
      <FormGroup className={classes.formGroup}>
        <FormControlLabel
          control={
            <Switch
              id="hasImmunityTest"
              name="hasImmunityTest"
              color="primary"
              checked={user.has_immunity_test || false}
              onChange={(event) =>
                setField('has_immunity_test', !user.has_immunity_test)
              }
            />
          }
          label="Has immunity test?"
        />
      </FormGroup>
      <div className={classes.formGroup}>
        <Typography gutterBottom>Blood urgency level</Typography>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          onChange={(event, value) => setField('blood_urgency_level', value)}
          marks={marks}
          step={null}
          min={0}
          max={4}
        />
      </div>
      <div className={classes.formGroup}>
        <Schedule handleOnAddSchedule={handleOnAddSchedule} />
      </div>
      <div className={classes.formGroup}>
        <Typography variant="subtitle2" gutterBottom>
          Choose your location
        </Typography>
        <MapSelectLocation
          onGeolocationChange={handleOnGeolocationChange}
          markerType={LIFE_BANK}
          width="100%"
          height={400}
          mb={1}
        />
      </div>
      <div className={classes.formGroup}>
        <ReCAPTCHA
          sitekey={captchaConfig.sitekey}
          onChange={(value) => serRecaptchaValue(value)}
        />
      </div>
      <div className={classes.btnWrapper}>
        <Button
          disabled={
            !user.secret ||
            !user.name ||
            !user.description ||
            !user.address ||
            !user.phone_number ||
            !user.blood_urgency_level ||
            !user.schedule ||
            !isUsernameValid ||
            !user.geolocation ||
            !recaptchaValue ||
            loading
          }
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Continue
        </Button>
        {loading && <CircularProgress />}
      </div>
    </form>
  )
}

SignupLifeBank.propTypes = {
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
  isUsernameValid: PropTypes.bool,
  children: PropTypes.node
}

SignupLifeBank.defaultProps = {}

export default SignupLifeBank
