import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'

import MapSelectLocation from '../../components/MapSelectLocation'
import { captchaConfig, constants } from '../../config'
import styles from './styles'

const useStyles = makeStyles(styles)
const {
  LOCATION_TYPES: { LIFE_BANK }
} = constants

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
  const [recaptchaValue, serRecaptchaValue] = useState('')

  return (
    <form autoComplete="off" className={classes.formLifeBank}>
      <Box className={classes.textFieldWrapper}>
        {children}
        <TextField
          id="password"
          label={t('signup.password')}
          type="password"
          fullWidth
          variant="outlined"
          className={classes.textField}
          onChange={(event) => setField('password', event.target.value)}
        />
        <TextField
          id="name"
          label={t('signup.nameLifebank')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('name', event.target.value)}
        />
        <TextField
          id="description"
          label={t('common.description')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('description', event.target.value)}
        />
        <TextField
          id="address"
          label={t('signup.address')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('address', event.target.value)}
        />
        <TextField
          id="phoneNumber"
          label={t('signup.phoneNumber')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('phone', event.target.value)}
        />
        <TextField
          id="requirement"
          label={t('signup.requirement')}
          variant="outlined"
          fullWidth
          multiline
          rowsMax={6}
          className={classes.textField}
          onChange={(event) => setField('requirement', event.target.value)}
        />
        <Box className={classes.boxCenter}>
          <Typography gutterBottom>
            {t('signup.chooseYourLocation')}
          </Typography>
          <MapSelectLocation
            onGeolocationChange={handleOnGeolocationChange}
            markerType={LIFE_BANK}
            width="100%"
            height={400}
            mb={1}
          />
        </Box>
        <Box className={classes.btnWrapper}>
          <ReCAPTCHA
            className={classes.grecaptcha}
            sitekey={captchaConfig.sitekey}
            onChange={(value) => serRecaptchaValue(value)}
          />
          <Button
            disabled={
              !isEmailValid ||
              !user.password ||
              !user.name ||
              !user.address ||
              !user.phone ||
              !user.coordinates ||
              !recaptchaValue ||
              loading
            }
            className={classes.btnContinue}
            variant="contained"
            color="secondary"
            onClick={onSubmit}
          >
            {t('miscellaneous.continue')}
          </Button>
          {loading && <CircularProgress />}
        </Box>
      </Box>
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
