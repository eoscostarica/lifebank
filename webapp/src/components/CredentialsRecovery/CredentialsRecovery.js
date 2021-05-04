import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import Snackbar from '@material-ui/core/Snackbar'
import { useTranslation } from 'react-i18next'

import { CREDENTIALS_RECOVERY, CHANGE_PASSWORD, GET_ACCOUNT_SIGNUP_METHOD } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const CredentialsRecovery = ({ overrideBoxClass, overrideLabelClass }) => {
  const { t } = useTranslation('translations')
  const [user, setUser] = useState({})
  const [validEmailFormat, setValidEmailFormat] = useState(false)
  const classes = useStyles()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })
  const [
    credentialsRecovery,
    { loading, error, data: { credentials_recovery: response } = {} }
  ] = useMutation(CREDENTIALS_RECOVERY)
  const [
    changePassword,
    { loading: loadingChangePassword, error: errorChangePassword }
  ] = useMutation(CHANGE_PASSWORD)
  const [open, setOpen] = useState(false)

  const [
    getAccountSignupMethod,
    { data: { signup_method: getAccountSignupMethodResult } = {} }
  ] = useMutation(GET_ACCOUNT_SIGNUP_METHOD)

  const handleOpen = () => {
    setOpen(!open)
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
      message: t('credentialsRecovery.passwordNotChangeable'),
      severity: 'error'
    })
  }

  const handleSubmitChangePassword = async () => {
    if (getAccountSignupMethodResult && getAccountSignupMethodResult.password_changable) {
      changePassword({
        variables: {
          ...user,
          emailContent: {
            subject: t('emailMessage.subjectChangePassword'),
            title: t('emailMessage.titleChangePassword'),
            message: t('emailMessage.messageChangePassword')
          }
        }
      })
      setValidEmailFormat(false)
    } else setOpenSnackbar({
      show: true,
      message: t('credentialsRecovery.passwordNotChangeable'),
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
  }, [user])

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
    if (errorChangePassword) {
      if (errorChangePassword.message === `GraphQL error: Cannot read property 'secret' of null`)
        setOpenSnackbar({
          show: true,
          message: t('credentialsRecovery.emailError'),
          severity: 'error'
        })
      else setOpenSnackbar({
        show: true,
        message: errorChangePassword.message.replace('GraphQL error: ', ''),
        severity: 'error'
      })
    }
  }, [errorChangePassword, t])


  useEffect(() => {
    if (response) {
      setOpenSnackbar({
        show: response.success,
        message: t('credentialsRecovery.checkYourEmail'),
        severity: 'success'
      })
    }
  }, [response])

  function executeCredentialsRecovery(e) {
    if (e.key === 'Enter' && ((user.newPassword && user.currentPassword && validEmailFormat) && !loadingChangePassword)) {
      e.preventDefault()
      handleSubmitChangePassword()
    }
    else if (e.key === 'Enter' && (validEmailFormat && !loading)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <Box className={classes.recoveryBox}>
        <Button color="secondary" className={classes.recoveryButton} onClick={handleOpen}>
          {t('signup.forgetPassword')}
        </Button>
      </Box>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleOpen}
        fullScreen={!isDesktop}
        maxWidth='xs'
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dialog}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box className={classes.bodyWrapper}>
            <form autoComplete="off">
              <Box className={classes.textFieldWrapper}>
                <Typography variant="h3" className={classes.title}>
                  {t('credentialsRecovery.credentialsRecovery')}
                </Typography>
                <Typography >
                  {t('credentialsRecovery.instructionCredentialsRecovery')}
                </Typography>
                <TextField
                  id="email"
                  label={t('common.email')}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={user.email || ''}
                  onChange={(event) =>
                    handleSetFieldEmail('email', event.target.value.toLowerCase().replace(/\s/g, ''))
                  }
                  onKeyPress={(event) =>
                    executeCredentialsRecovery(event)
                  }
                  className={classes.marginTop}
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
                <Box className={classes.recoveryBox}>
                  {loading && <CircularProgress />}
                </Box>
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
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

CredentialsRecovery.propTypes = {
  overrideBoxClass: PropTypes.any,
  overrideLabelClass: PropTypes.any
}

export default CredentialsRecovery