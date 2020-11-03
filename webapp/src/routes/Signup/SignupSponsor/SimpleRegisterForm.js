import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'

import { captchaConfig } from '../../../config'

const SimpleRegisterForm = ({
  onSubmit,
  setField,
  loading,
  classes,
  children
}) => {
  const { t } = useTranslation('translations')
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [recaptchaValue, setRecaptchaValue] = useState('')
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
          label={t('signup.Password')}
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
        <br />
        <ReCAPTCHA
          sitekey={captchaConfig.sitekey}
          onChange={(value) => setRecaptchaValue(value)}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Button
          disabled={!recaptchaValue || error !== undefined || loading}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Create account
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </form>
  )
}

SimpleRegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.node
}

SimpleRegisterForm.defaultProps = {}

export default SimpleRegisterForm
