import React, { memo, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import Snackbar from '@material-ui/core/Snackbar'
import DialogContent from '@material-ui/core/DialogContent'

import {
  LOGIN_MUTATION,
  SEND_EMAIL_MUTATION,
  CHECK_EMAIL_VERIFIED
} from '../../gql'
import { useUser } from '../../context/user.context'
import LoginWithFacebook from './LoginWithFacebook'
import LoginWithGoogle from './LoginWithGoogle'
import Signup from '../Signup/Signup'
import ResendComponent from '../ResendComponent'

import CredentialsRecovery from '../CredentialsRecovery/CredentialsRecovery'
import styles from './styles'

const useStyles = makeStyles(styles)

const LoginModal = ({ isNavBar, isSideBar }) => {
  const { t } = useTranslation('translations')
  const history = useHistory()
  const [user, setUser] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [currentUser, { login }] = useUser()


  const [
    loginMutation,
    { loading, error, data: { login: loginResult } = {} }
  ] = useMutation(LOGIN_MUTATION, { fetchPolicy: 'no-cache' })

  const [
    checkEmailVerified,
    {
      error: errorCheckEmailVerified,
      loading: checkEmailVerifiedLoading,
      data: { check_email_verified: checkEmailVerifiedResult } = {}
    }
  ] = useMutation(CHECK_EMAIL_VERIFIED)

  const [
    sendEmail,
    {
      error: errorSendEmail,
      loading: sendEmailLoading,
      data: { send_email: sendEmailResult } = {}
    }
  ] = useMutation(SEND_EMAIL_MUTATION)

  const handleSendEmail = () => {
    handleOpen()
    sendEmail({
      variables: {
        account: user.account,
        emailContent: {
          subject: t('emailMessage.subjectVerificationCode'),
          title: t('emailMessage.titleVerificationCode'),
          message: t('emailMessage.messageVerificationCode'),
          button: t('emailMessage.verifyButton')
        }
      }
    })
  }

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const [openVerify, setopenVerify] = useState(false)

  const handlerSetOpenVerify = () => {
    setopenVerify(!openVerify)
  }

  const verify = () => {
    setopenVerify(true)
  }

  const handleOpen = () => {
    setOpen(!open)
    setActiveStep(0)
  }

  const handleOpenCredentialsRecovery = () => {
    setActiveStep(2)
  }

  const handleOpenSignUp = () => {
    setActiveStep(1)
  }

  const handleOnCloseComponent = () => {
    setActiveStep(0)
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const handleLogin = async () => {
    loginMutation({
      variables: {
        account: user.account,
        password: user.secret
      }
    })
  }

  const handleLoginWithAuth = async (status, email, secret) => {
    if (status) {
      loginMutation({
        variables: {
          account: email,
          password: secret
        }
      })
    } else setOpenSnackbar({
      show: true,
      message: t('login.somethingHappenedWithAuth'),
      severity: 'error'
    })
  }

  const handleOpenAlert = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  useEffect(() => {
    if (error) {
      if (error.graphQLErrors[0].message === 'Inactive account') {
        handleOpen()
        history.replace('/reopen-account/' + user.account)
      }
      else if (error.graphQLErrors[0].message === 'Invalid account or secret') {
        setOpenSnackbar({
          show: true,
          message: error.message.replace('GraphQL error: ', ''),
          severity: 'error'
        })
        checkEmailVerified({
          variables: {
            account: user.account
          }
        })
      }
    }
  }, [checkEmailVerified, user, history, error])

  useEffect(() => {
    if (loginResult) {
      login(loginResult.token)
      setOpen(false)
    }
  }, [loginResult])

  useEffect(() => {
    if (errorCheckEmailVerified) {
      setOpenSnackbar({
        show: true,
        message: errorCheckEmailVerified.message.replace('GraphQL error: ', ''),
        severity: 'error'
      })
    }
    if (errorSendEmail) {
      setOpenSnackbar({
        show: true,
        message: errorSendEmail.message.replace('GraphQL error: ', ''),
        severity: 'error'
      })
    }
  }, [errorSendEmail, errorCheckEmailVerified])

  useEffect(() => {
    if (checkEmailVerifiedResult && checkEmailVerifiedResult.exist && !checkEmailVerifiedResult.verified) {
      verify()
    }
  }, [checkEmailVerifiedResult])

  useEffect(() => {
  }, [sendEmailResult])

  useEffect(() => {
    if (currentUser) {
      setOpen(false)
    }

  }, [currentUser])

  function executeLogin(e) {
    if (e.key === 'Enter' && (user.account && user.secret && !loading)) {
      e.preventDefault()
      handleLogin()
    }
  }

  return (
    <>
      {isNavBar && !currentUser &&
        <Button className={classes.btnLoginModal} onClick={handleOpen}>
          {t('login.login')}
        </Button>
      }
      {isSideBar && !currentUser &&
        <Box
          className={classes.registerBtnSideBar}
          onClick={handleOpen}
        >
          <FingerprintIcon className={classes.iconOption} />
          <Link to="/">
            <Typography
              variant="body1"
              className={classes.labelOption}
            >
              {t('login.login')}
            </Typography>
          </Link>
        </Box>
      }
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        fullScreen={!isDesktop}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        {activeStep === 0 && (
          <DialogContent className={classes.dimensions} >
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
            <Box>
              <Typography className={classes.title}>
                {t('login.letsStarted')}
              </Typography>
              <Typography className={classes.subTitle}>
                {t('login.subtitle')}
              </Typography>
            </Box>
            <form autoComplete="off">
              <Box>
                <TextField
                  id="account"
                  label={t('common.email')}
                  variant="outlined"
                  className={classes.inputStyle}
                  onChange={(event) =>
                    handleSetField('account', event.target.value.toLowerCase().replace(/\s/g, ''))
                  }
                  onKeyPress={(event) =>
                    executeLogin(event)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="secret"
                  label={t('signup.password')}
                  type="password"
                  variant="outlined"
                  className={classes.inputStyle}
                  onChange={(event) =>
                    handleSetField('secret', event.target.value)
                  }
                  onKeyPress={(event) =>
                    executeLogin(event)
                  }
                />
              </Box>
              <FormControlLabel
                className={classes.formCheckBox}
                control={
                  <Checkbox
                    name="checkLogin"
                  />
                }
                label={t('login.loggedIn')}
              />
              <Box className={classes.centerBox}>
                <Button
                  id="buttonLogin"
                  className={classes.btnLogin}
                  disabled={!user.account || !user.secret || loading}
                  variant="contained"
                  color="secondary"
                  onClick={handleLogin}
                >
                  {t('login.login')}
                </Button>
              </Box>
              <Box className={classes.centerBox}>
                {(loading || checkEmailVerifiedLoading || sendEmailLoading) && <CircularProgress />}
              </Box>
              <Box className={classes.centerBox}>
                <LoginWithFacebook onSubmit={handleLoginWithAuth} />
              </Box>
              <Box className={classes.centerBox}>
                <LoginWithGoogle onSubmit={handleLoginWithAuth} />
              </Box>
              <Box className={classes.registerBox}>
                <Button color="secondary" className={classes.registerTextModal} onClick={handleOpenSignUp}>
                  {t('login.notAccount')}
                </Button>
              </Box>
              <ResendComponent
                open={openVerify}
                handlerOpen={handlerSetOpenVerify}
                handlerSendEmail={handleSendEmail}
              />
              <Box className={classes.credentialsBox}>
                <Button color="secondary" className={classes.recoveryButton} onClick={handleOpenCredentialsRecovery}>
                  {t('signup.forgetPassword')}
                </Button>
              </Box>
            </form>
          </DialogContent>
        )}
        {activeStep === 1 && (
          <Signup isModal onCloseSignUp={handleOnCloseComponent} />
        )}
        {activeStep === 2 && (
          <CredentialsRecovery onCloseCredentialsRecovery={handleOnCloseComponent} />
        )}
        <Snackbar open={openSnackbar.show} autoHideDuration={6000} onClose={handleOpenAlert}>
          <Alert
            severity={openSnackbar.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleOpenAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  )
}

LoginModal.propTypes = {
  isNavBar: PropTypes.bool,
  isSideBar: PropTypes.bool,
}

LoginModal.defaultProps = {
  isNavBar: false,
  isSideBar: false
}

export default memo(LoginModal)