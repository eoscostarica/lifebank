import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import LockIcon from '@material-ui/icons/Lock'
import { useTranslation } from 'react-i18next'

import { CREDENTIALS_RECOVERY, CHANGE_PASSWORD } from '../../gql'

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(4)
  },
  textFieldWrapper: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    justifyContent: 'space-evenly'
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  labelOption: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(3),
    fontSize: 14,
    cursor: "pointer"
  },
  bodyWrapper: {
    height: '90%',
    padding: theme.spacing(0, 2)
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  marginTop: {
    marginTop: '6%'
  },
  marginTopBox: {
    marginTop: '16%'
  },
  button: {
    marginTop: '6%',
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "100%",
    height: '40px',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '15px',
    marginBottom: 10
  },
  dialog: {
    paddingTop: "53px",
    paddingLeft: "53px",
    paddingRight: "53px",
    paddingBottom: "60px",
    [theme.breakpoints.down('md')]: {
      paddingLeft: "21px",
      paddingRight: "21px"
    }
  }
}))

const CredentialsRecovery = ({ overrideBoxClass, overrideLabelClass }) => {
  const { t } = useTranslation('translations')
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [errorPassword, setErrorPassword] = useState(true)
  const classes = useStyles()
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
    { loading: loadingChangePassword, error: errorChangePassword, data: { change_password: responseChangePassword } = {} }
  ] = useMutation(CHANGE_PASSWORD)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const handleSubmit = () => {
    setErrorMessage(null)
    credentialsRecovery({
      variables: {
        email: user.email
      }
    })
  }

  const handleSubmitChangePassword = () => {
    setErrorMessage(null)
    changePassword({
      variables: {
        ...user
      }
    })
  }

  useEffect(() => {
    if (error) {
      if(error.message === `GraphQL error: Cannot read property 'account' of undefined`)
        setErrorMessage('El correo ingresado no esta asociado a ninguna cuenta')
      else setErrorMessage(error.message.replace('GraphQL error: ', ''))
    }
  }, [error])

  useEffect(() => {
    if (errorChangePassword) {
      if(errorChangePassword.message === `GraphQL error: Cannot read property 'secret' of null`)
        setErrorMessage('El correo ingresado no esta asociado a ninguna cuenta')
      else setErrorMessage(errorChangePassword.message.replace('GraphQL error: ', ''))
    }
  }, [errorChangePassword])


  useEffect(() => {
    if (response) {
      setUser({})
      setSuccess(response.success)
    }
  }, [response])

  useEffect(() => {
    if (responseChangePassword) {
      setUser({})
      setSuccess(responseChangePassword.success)
      setErrorPassword(responseChangePassword.success)
    }
  }, [responseChangePassword])

  return (
    <>
      <Box
        className={clsx(classes.loginBtn, overrideBoxClass)}
        onClick={handleOpen}
      >
        <LockIcon className={classes.iconOption} />
        <Link to="/">
          <Typography
            variant="body1"
            className={clsx(classes.labelOption, overrideLabelClass)}
          >
            {t('credentialsRecovery.credentialsRecovery')}
          </Typography>
        </Link>
      </Box>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleOpen}
        fullScreen = {!isDesktop}
        maxWidth={'xs'}
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
            <Typography variant="h3">
              {t('credentialsRecovery.credentialsRecovery')}
            </Typography>
            <form autoComplete="off">
              <Box className={classes.textFieldWrapper}>
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
                    handleSetField('email', event.target.value)
                  }
                  className={classes.marginTop}
                />
                <Button
                  disabled={!user.email || loading}
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  className={classes.button}
                >
                  {t('credentialsRecovery.recovery')}
                </Button>
                {loading && <CircularProgress />}
              </Box>
              <Box className={clsx(classes.textFieldWrapper, classes.marginTopBox)}>
                <Typography >
                  Para cambiar su contraseña ingrese el correo asociado a su cuenta, la contraseña la actual y la nueva.
                </Typography>
                <TextField
                  id="currentPassword"
                  label= 'Current password'
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={user.currentPassword || ''}
                  onChange={(event) =>
                    handleSetField('currentPassword', event.target.value)
                  }
                  className={classes.marginTop}
                />
                <TextField
                  id="newPassword"
                  label= 'New password'
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={user.newPassword || ''}
                  onChange={(event) =>
                    handleSetField('newPassword', event.target.value)
                  }
                  className={classes.marginTop}
                />
                <Button
                  disabled={(!user.newPassword || !user.currentPassword || !user.email) || loadingChangePassword}
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmitChangePassword}
                  className={classes.button}
                >
                  Change Password
                </Button>
                {loadingChangePassword && <CircularProgress />}
              </Box>
              {errorMessage && (
                <Alert
                  className={classes.alert}
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setErrorMessage(null)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errorMessage}
                </Alert>
              )}
              {!errorPassword && (
                <Alert
                  className={classes.alert}
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setErrorPassword(true)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  'La contraseña actual no coinside con su correo'
                </Alert>
              )}
              {success && (
                <Alert
                  className={classes.alert}
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setSuccess(false)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {t('credentialsRecovery.checkYourEmail')}
                </Alert>
              )}
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
