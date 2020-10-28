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

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    height: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  btnWrapper: {
    display: 'block',
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  btnSignup: {
    display: 'block',
    marginBottom: theme.spacing(2),
    width: '40%',
    margin: 'auto',
    '@media only screen and (max-width: 900px)': {
      width: '100%'
    }
  }
}))

const DonorSignup = ({
  onSubmit,
  onSubmitWithAuth,
  setField,
  user,
  loading,
  isEmailValid,
  children
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [password, setPassword] = useState()
  const [recaptchaValue, serRecaptchaValue] = useState('')
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirmPassword && confirmPassword !== password)
        setError({ text: t('signup.passwordNotMatch') })
      else setError(undefined)
    }, 1500)
    return () => clearTimeout(timer)
  }, [confirmPassword])

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        {children}
        <TextField
          id="secret"
          label={t('signup.password')}
          type="password"
          fullWidth
          placeholder={t('signup.passwordPlaceholder')}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => {
            setField('secret', event.target.value)
            setPassword(event.target.value)
          }}
        />
        <TextField
          id="confirm-password"
          label={t('signup.confirmPassword')}
          type="password"
          fullWidth
          error={error}
          helperText={error && error.text}
          placeholder={t('signup.confirmPasswordPlaceholder')}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
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
            !user.secret ||
            !isEmailValid ||
            !recaptchaValue ||
            loading ||
            error !== undefined
          }
          className={classes.btnSignup}
          variant="contained"
          color="primary"
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
  user: PropTypes.object,
  loading: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  children: PropTypes.node
}

DonorSignup.defaultProps = {}

export default DonorSignup
