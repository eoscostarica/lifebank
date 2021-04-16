import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'

import { captchaConfig } from '../../../config'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginBottom: 10
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  btnSignup: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  }
}))

const SimpleRegisterForm = ({
  onSubmit,
  setField,
  loading,
  children,
  isEmailValid,
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [recaptchaValue, setRecaptchaValue] = useState('')
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
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        {children}
        <TextField
          id="name"
          label={t('signup.nameSponsor')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => {
            setField('name', event.target.value)
            setName(event.target.value)
          }}
        />
        <TextField
          id="passwordPlainText"
          label={t('signup.password')}
          type="password"
          fullWidth
          variant="outlined"
          className={classes.textField}
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
          className={classes.btnSignup}
          disabled={
            !isEmailValid ||
            !name ||
            !password ||
            !confirmPassword ||
            !recaptchaValue ||
            loading ||
            error
          }
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {t('signup.createAccount')}
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </form >
  )
}

SimpleRegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  children: PropTypes.node
}

SimpleRegisterForm.defaultProps = {}

export default SimpleRegisterForm
