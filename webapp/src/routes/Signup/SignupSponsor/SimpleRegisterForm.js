import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ReCAPTCHA from 'react-google-recaptcha'

import { captchaConfig } from '../../../config'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(3)
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}))

const SimpleRegisterForm = ({ setField, children }) => {
  const classes = useStyles()
  const [recaptchaValue, setRecaptchaValue] = useState('')

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        {children}
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
          className={classes.textField}
          onChange={(event) => setField('secret', event.target.value)}
        />
        <ReCAPTCHA
          sitekey={captchaConfig.sitekey}
          onChange={(value) => setRecaptchaValue(value)}
        />
      </Box>
    </form>
  )
}

export default SimpleRegisterForm
