import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation } from 'react-i18next'
import InputLabel from '@material-ui/core/InputLabel'

import { CREDENTIALS_RECOVERY, GET_ACCOUNT_SIGNUP_METHOD } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const CredentialsRecovery = ({ onCloseCredentialsRecovery }) => {
  const { t } = useTranslation('translations')
  const [user, setUser] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [open, setOpen] = useState(true)
  const [validEmailFormat, setValidEmailFormat] = useState(false)
  const classes = useStyles()
  const [
    credentialsRecovery,
    { loading, error, data: { credentials_recovery: response } = {} }
  ] = useMutation(CREDENTIALS_RECOVERY)

  const [
    getAccountSignupMethod,
    { data: { signup_method: getAccountSignupMethodResult } = {} }
  ] = useMutation(GET_ACCOUNT_SIGNUP_METHOD)

  const handleOpen = () => {
    setOpen(!open)
    onCloseCredentialsRecovery()
  }

  const handleCloseSnackBar = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const handleSetFieldEmail = (field, value) => {
    const regularExpresion = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (regularExpresion.test(value)) setValidEmailFormat(true)
    else setValidEmailFormat(false)
    setUser({ ...user, [field]: value })
  }

  const handleSubmit = async () => {
    if (getAccountSignupMethodResult && getAccountSignupMethodResult.password_changable) {
      credentialsRecovery({
        variables: {
          email: user.email,
          emailContent: {
            subject: t('emailMessage.subjectCredentialsRecovery'),
            title: t('emailMessage.titleCredentialsRecovery'),
            message: t('emailMessage.messageCredentialsRecovery'),
            account: t('common.account'),
            password: t('signup.password')
          }
        }
      })
      setValidEmailFormat(false)
    } else setOpenSnackbar({
      show: true,
      message: t('setting.passwordNotChangeable'),
      severity: 'error'
    })
  }

  useEffect(() => {
    if (user.email) {
      getAccountSignupMethod({
        variables: {
          email: user.email
        }
      })
    }
  }, [getAccountSignupMethod, user])

  useEffect(() => {
    if (error) {
      if (error.message === `GraphQL error: Cannot read property 'account' of undefined`)
        setOpenSnackbar({
          show: true,
          message: t('credentialsRecovery.emailError'),
          severity: 'error'
        })
      else setOpenSnackbar({
        show: true,
        message: error.message.replace('GraphQL error: ', ''),
        severity: 'error'
      })
    }
  }, [error, t])

  useEffect(() => {
    if (response) {
      setOpenSnackbar({
        show: response.success,
        message: t('credentialsRecovery.checkYourEmail'),
        severity: 'success'
      })
    }
  }, [t, response])

  function executeCredentialsRecovery(e) {
    if (e.key === 'Enter' && (validEmailFormat && !loading)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <Box className={classes.dimensions}>
        <Box className={classes.goBack}>
          <IconButton aria-label="go-back" onClick={handleOpen}>
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Box>
        <Box className={classes.bodyWrapper}>
          <form autoComplete="off">
            <Box className={classes.textFieldWrapper}>
              <Typography variant="h3" className={classes.title}>
                {t('credentialsRecovery.passwordRecovery')}
              </Typography>
              <Box className={classes.textBox}>
                <Typography className={classes.text} variant="body1">
                  {t('credentialsRecovery.instructionCredentialsRecovery')}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.textFieldWrapper}>
              <TextField
                id="email"
                variant="filled"
                InputLabelProps={{
                  shrink: false
                }}
                InputProps={{
                  endAdornment: (
                    <InputLabel id="select-label">
                      {t('common.registeredEmail')}
                    </InputLabel>
                  )
                }}
                onChange={(event) =>
                  handleSetFieldEmail('email', event.target.value.toLowerCase().replace(/\s/g, ''))
                }
                onKeyPress={(event) =>
                  executeCredentialsRecovery(event)
                }
                className={classes.inputStyle}
              />
              <Button
                disabled={!validEmailFormat || loading}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                className={classes.button}
              >
                {t('credentialsRecovery.recovery')}
              </Button>
            </Box>
            <Box className={classes.loadingBox}>
              {loading && <CircularProgress />}
            </Box>
            <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleCloseSnackBar}>
              <Alert
                className={classes.alert}
                severity={openSnackbar.severity}
              >
                {openSnackbar.message}
              </Alert>
            </Snackbar>
          </form>
        </Box >
      </Box>
    </>
  )
}

CredentialsRecovery.propTypes = {
  onCloseCredentialsRecovery: PropTypes.func
}

export default CredentialsRecovery