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
import { useTranslation } from 'react-i18next'

import MapSelectLocation from '../../components/MapSelectLocation'
import Schedule from '../../components/Schedule'
import { captchaConfig, constants } from '../../config'

const {
  LOCATION_TYPES: { LIFE_BANK }
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(3)
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
  isEmailValid,
  children
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const handleOnGeolocationChange = useCallback(
    (coordinates) => setField('coordinates', JSON.stringify(coordinates)),
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
        return t('editProfile.low')
      case 2:
        return t('editProfile.medium')
      case 3:
        return t('editProfile.high')
      default:
        return 'N/A'
    }
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <div className={classes.formGroup}>{children}</div>
      <div className={classes.formGroup}>
        <TextField
          id="password"
          label={t('signup.password')}
          type="password"
          fullWidth
          placeholder={t('signup.passwordPlaceholder')}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => setField('password', event.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          id="name"
          label={t('signup.name')}
          placeholder={t('signup.namePlaceholder')}
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
          label={t('common.description')}
          placeholder={t('signup.descriptionPlaceholder')}
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
          label={t('signup.address')}
          placeholder={t('signup.addressPlaceholder')}
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
          label={t('signup.phoneNumber')}
          placeholder={t('signup.phoneNumberPlaceholder')}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('phone', event.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          id="invitationCode"
          label={t('signup.invitationCode')}
          placeholder={t('signup.invitationCodePlaceholder')}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('invitation_code', event.target.value)}
        />
      </div>
      <FormGroup className={classes.formGroup}>
        <FormControlLabel
          control={
            <Switch
              id="hasImmunityTest"
              name="hasImmunityTest"
              color="primary"
              checked={user.immunity_test || false}
              onChange={() => setField('immunity_test', !user.immunity_test)}
            />
          }
          label={t('profile.hasImmunityTest')}
        />
      </FormGroup>
      <div className={classes.formGroup}>
        <Typography gutterBottom>{t('common.bloodUrgency')}</Typography>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          onChange={(event, value) => setField('urgency_level', value)}
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
          {t('signup.chooseYourLocation')}
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
            !isEmailValid ||
            !user.password ||
            !user.name ||
            !user.address ||
            !user.phone ||
            !user.schedule ||
            !user.coordinates ||
            !recaptchaValue ||
            loading
          }
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {t('miscellaneous.continue')}
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
  isEmailValid: PropTypes.bool,
  children: PropTypes.node
}

SignupLifeBank.defaultProps = {}

export default SignupLifeBank
