import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'

import SignupWithFacebook from './socialSingup/SignupWithFacebook'
import SignupWithGoogle from './socialSingup/SignupWithGoogle'
import { captchaConfig } from '../../config'
import styles from './styles'

const useStyles = makeStyles(styles)

const DonorSignup = ({
  onSubmit,
  onSubmitWithAuth,
  setField,
  loading,
  isEmailValid,
  children
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [password, setPassword] = useState()
  const [recaptchaValue, serRecaptchaValue] = useState('')
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirmPassword && confirmPassword !== password)
        setError(true)
      else setError(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [confirmPassword])

  return (
    <form autoComplete="off" className={classes.formDonor}>
      <Box className={classes.textFieldWrapper}>
        {children}
        <TextField
          id="passwordPlainText"
          label={t('signup.password')}
          type="password"
          fullWidth
          variant="outlined"
          className={classes.textFieldDonor}
          onChange={(event) => {
            setField('passwordPlainText', event.target.value)
            setPassword(event.target.value)
          }}
        />
        <TextField
          id="confirm-password"
          label={t('signup.confirmPassword')}
          type="password"
          fullWidth
          error={error}
          helperText={error && t('signup.passwordNotMatch')}
          variant="outlined"
          className={classes.textFieldDonor}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <ReCAPTCHA
          sitekey={captchaConfig.sitekey}
          onChange={(value) => serRecaptchaValue(value)}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Button
          disabled={
            !isEmailValid ||
            !password ||
            !confirmPassword ||
            !recaptchaValue ||
            loading ||
            error
          }
          className={classes.btnSignup}
          variant="contained"
          color="secondary"
          onClick={onSubmit}
        >
          {t('signup.createAccount')}
        </Button>
        {loading && <CircularProgress />}
        <SignupWithFacebook handlerSubmit={onSubmitWithAuth} />
        <SignupWithGoogle handlerSubmit={onSubmitWithAuth} />
      </Box>
    </form>
  )
}

DonorSignup.propTypes = {
  onSubmit: PropTypes.func,
  onSubmitWithAuth: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  children: PropTypes.node
}

DonorSignup.defaultProps = {}

export default DonorSignup
