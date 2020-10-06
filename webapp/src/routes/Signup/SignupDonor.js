import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReCAPTCHA from 'react-google-recaptcha'

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
  const classes = useStyles()
  const [recaptchaValue, serRecaptchaValue] = useState('')

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        {children}
        <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          placeholder="Your password"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => setField('secret', event.target.value)}
        />
        <ReCAPTCHA
          style={{ bac: '100%' }}
          sitekey={captchaConfig.sitekey}
          onChange={(value) => serRecaptchaValue(value)}
        />
      </Box>

      <Box className={classes.btnWrapper}>
        <Button
          disabled={!user.secret || !isEmailValid || !recaptchaValue || loading}
          className={classes.btnSignup}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Create Account
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
