import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReCAPTCHA from 'react-google-recaptcha'

import { captchaConfig } from '../../../config'

const SimpleRegisterForm = ({
  onSubmit,
  setField,
  loading,
  classes,
  children
}) => {
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [recaptchaValue, setRecaptchaValue] = useState('')
  const [error, setError] = useState()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirmPassword && confirmPassword !== password)
        setError({ text: 'Password do not match' })
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
          label="Password"
          type="password"
          fullWidth
          placeholder="Your password"
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
          label="Confirm password"
          type="password"
          fullWidth
          error={error ? true : false}
          helperText={error && error.text}
          placeholder="Your confirmation"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
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
