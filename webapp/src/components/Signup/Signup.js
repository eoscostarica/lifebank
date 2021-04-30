import React, { useState, useEffect, useReducer, useCallback, lazy, Suspense } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Backdrop from '@material-ui/core/Backdrop'
import Snackbar from '@material-ui/core/Snackbar'
import CircularProgress from '@material-ui/core/CircularProgress'

import {
  CREATE_ACCOUNT_MUTATION,
  CREATE_ACCOUNT_AUTH_MUTATION,
  CREATE_PRE_REGITER_LIFEBANK_MUTATION,
  VALIDATION_EMAIL
} from '../../gql'
import { useUser } from '../../context/user.context'

import SignupRoleSelector from './SignupRoleSelector'
import ValidateEmail from './ValidateEmail'
import styles from './styles'

const useStyles = makeStyles(styles)
const SignupDonor = lazy(() => import('./SignupDonor'));
const SignupLifeBank = lazy(() => import('./SignupLifeBank'));
const SimpleRegisterForm = lazy(() => import('./SignupSponsor/SimpleRegisterForm'));

const Signup = ({ isHome, isModal, isSideBar }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [user, setUser] = useReducer(
    (user, newUser) => ({ ...user, ...newUser }),
    {}
  )
  const [activeStep, setActiveStep] = useState(0)
  const [role, setRole] = useState()
  const [currentUser, { login }] = useUser()
  const [open, setOpen] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [maxWidth] = useState('sm')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [isEmailValid, setEmailValid] = useState(false)
  const [checkEmailLoading, setcheckEmailLoaded] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleOpenAlert = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const [
    createAccount,
    {
      error: errorcreateAccount,
      loading: createAccountLoading,
      data: { create_account: createAccountResult } = {}
    }
  ] = useMutation(CREATE_ACCOUNT_MUTATION)

  const [
    createAccountAuth,
    {
      error: errorcreateAccountAuth,
      loading: createAccountLoadingAuth,
      data: { create_account_auth: createAccountResultAuth } = {}
    }
  ] = useMutation(CREATE_ACCOUNT_AUTH_MUTATION)

  const [
    preRegisterLifebank,
    {
      error: errorpreRegisterLifebank,
      loading: preRegisterLifebankLoading,
      data: { create_pre_register_lifebank: preRegisterLifebankResult } = {}
    }
  ] = useMutation(CREATE_PRE_REGITER_LIFEBANK_MUTATION)

  const handleRoleChange = (role) => {
    setRole(role)
    setActiveStep(activeStep + 1)
  }

  const handleSetField = useCallback((field, value) => {
    setUser({ [field]: value })
  }, [])

  const handleGoBack = () => {
    activeStep && setActiveStep(activeStep - 1)
    handleSetField('email', ' ')
  }

  const handleCreateAccount = () => {
    const { email, name, passwordPlainText } = user

    createAccount({
      variables: {
        role,
        email,
        emailContent: {
          subject: t('emailMessage.subjectVerificationCode'),
          title: t('emailMessage.titleVerificationCode'),
          message: t('emailMessage.messageVerificationCode'),
          button: t('emailMessage.verifyButton')
        },
        name: name || t('signup.defaultUsername'),
        passwordPlainText,
        signup_method: 'lifebank'
      }
    })
  }

  const handleCreateAccountWithAuth = async (status, email, name, passwordPlainText, signupMethod) => {
    if (status) {
      const { data } = await checkEmail({ email: email })

      if (data.user.length === 0) {
        createAccountAuth({
          variables: {
            role,
            email,
            emailContent: {
              subject: t('emailMessage.subjectVerificationCode'),
              title: t('emailMessage.titleVerificationCode'),
              message: t('emailMessage.messageVerificationCode'),
              button: t('emailMessage.verifyButton')
            },
            name,
            passwordPlainText,
            signup_method: signupMethod
          }
        })
      } else {
        setOpenSnackbar({
          show: true,
          message: t('errors.authError'),
          severity: 'error'
        })
      }
    }
  }

  const handlePreRegisterLifebank = () => {
    const {
      email,
      password,
      name,
      address,
      phone,
      description,
      coordinates,
      requirement
    } = user
    let { immunity_test, invitation_code, urgency_level } = user

    if (immunity_test === undefined) immunity_test = false

    if (invitation_code === undefined || !invitation_code) invitation_code = ' '

    if (urgency_level === undefined) urgency_level = 1

    const schedule = '[]'

    preRegisterLifebank({
      variables: {
        email,
        emailContent: {
          subject: t('emailMessage.subjectVerificationCode'),
          title: t('emailMessage.titleVerificationCode'),
          message: t('emailMessage.messageVerificationCode'),
          button: t('emailMessage.verifyButton')
        },
        passwordPlainText: password,
        name,
        address,
        schedule,
        phone,
        description,
        urgency_level,
        coordinates,
        immunity_test,
        invitation_code,
        requirement
      }
    })
  }

  const { refetch: checkEmail } = useQuery(VALIDATION_EMAIL, {
    variables: {
      email: user.email
    },
    skip: true
  })

  useEffect(() => {
    const regularExpresion = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const validEmail = async () => {
      const { data } = await checkEmail({
        email: user.email
      })

      if (data) {
        data.preregister_lifebank.length === 0 && data.user.length === 0
          ? setEmailValid(true)
          : setEmailValid(false)

        setcheckEmailLoaded(true)
      }
    }

    if (regularExpresion.test(user?.email)) {
      validEmail()
    } else {
      setEmailValid(false)
      setcheckEmailLoaded(false)
    }
  }, [user?.email, checkEmail])

  useEffect(() => {
    if (preRegisterLifebankResult) {
      handleOpen()
      setOpenSnackbar({
        show: true,
        message: t('signup.sucessfulPreregistration'),
        severity: 'success'
      })
    }
  }, [preRegisterLifebankResult])

  useEffect(() => {
    if (createAccountResult) {
      handleOpen()
      setOpenSnackbar({
        show: true,
        message: t('signup.sucessfulRegistration'),
        severity: 'success'
      })
    }
  }, [createAccountResult])

  useEffect(() => {
    if (createAccountResultAuth) {
      handleOpen()
      setOpenSnackbar({
        show: true,
        message: t('signup.sucessfulRegistration'),
        severity: 'success'
      })
      login(createAccountResultAuth.token)
    }

  }, [createAccountResultAuth])


  useEffect(() => {
    if (errorcreateAccount) setOpenSnackbar({
      show: true,
      message: t('errors.authError'),
      severity: 'error'
    })

  }, [errorcreateAccount])

  useEffect(() => {
    if (errorcreateAccountAuth) setOpenSnackbar({
      show: true,
      message: t('errors.authError'),
      severity: 'error'
    })

  }, [errorcreateAccountAuth])

  useEffect(() => {
    if (errorpreRegisterLifebank) setOpenSnackbar({
      show: true,
      message: t('errors.authError'),
      severity: 'error'
    })

  }, [errorpreRegisterLifebank])

  useEffect(() => {
    if (open) {
      handleSetField('email', ' ')
      setActiveStep(0)
    }
  }, [open])

  return (
    <>
      {isHome && !currentUser &&
        <Button color="secondary" className={classes.registerBtn} onClick={handleOpen}>
          {t('signup.register')}
        </Button>
      }
      {isModal && !currentUser &&
        <Box className={classes.registerBoxModal}>
          <Button color="secondary" className={classes.registerTextModal} onClick={handleOpen}>
            {t('login.notAccount')}
          </Button>
        </Box>
      }
      {isSideBar && !currentUser &&
        <Box
          className={classes.registerBtnSideBar}
          onClick={handleOpen}
        >
          <ContactMailIcon className={classes.iconOption} />
          <Link to="/">
            <Typography
              variant="body1"
              className={classes.labelOption}
            >
              {t('signup.register')}
            </Typography>
          </Link>
        </Box>
      }
      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        fullWidth
        open={open}
        onClose={handleOpen}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dialog}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          {activeStep !== 0 && (
            <Box className={classes.goBack}>
              <IconButton aria-label="go-back" onClick={handleGoBack}>
                <ArrowBackIcon color="primary" />
              </IconButton>
            </Box>
          )}
          <Box className={classes.register}>
            <Box className={classes.stepperContent}>
              {activeStep === 0 && (
                <>
                  <Typography className={classes.titleRegister}>{t('signup.register')}</Typography>
                  <Typography className={classes.text}>{t('signup.registerText')}</Typography>
                  <SignupRoleSelector onSubmit={handleRoleChange} />
                </>
              )}
              {activeStep === 1 && role === 'donor' && (
                <>
                  <Typography className={classes.titleRegister}>{t('signup.asAdonor')}</Typography>
                  <Typography className={classes.text}>{t('signup.allYouNeed')}</Typography>
                  <Suspense fallback={<CircularProgress />}>
                    <SignupDonor
                      onSubmit={handleCreateAccount}
                      onSubmitWithAuth={handleCreateAccountWithAuth}
                      loading={createAccountLoading || createAccountLoadingAuth}
                      setField={handleSetField}
                      isEmailValid={isEmailValid}
                    >
                      <ValidateEmail
                        isValid={isEmailValid}
                        loading={checkEmailLoading}
                        setField={handleSetField}
                        user={user}
                      />
                    </SignupDonor>
                  </Suspense>
                </>
              )}
              {activeStep === 1 && role === 'sponsor' && (
                <>
                  <Typography className={classes.titleRegister}>{t('signup.asAsponsor')}</Typography>
                  <Typography className={classes.text}>{t('signup.allYouNeed')}</Typography>
                  <Suspense fallback={<CircularProgress />}>
                    <SimpleRegisterForm
                      onSubmit={handleCreateAccount}
                      loading={createAccountLoading}
                      setField={handleSetField}
                      isEmailValid={isEmailValid}
                    >
                      <ValidateEmail
                        isValid={isEmailValid}
                        loading={checkEmailLoading}
                        user={user}
                        setField={handleSetField}
                      />
                    </SimpleRegisterForm>
                  </Suspense>
                </>
              )}
              {activeStep === 1 && role === 'lifebank' && (
                <>
                  <Typography className={classes.titleRegister}>{t('signup.asAbank')}</Typography>
                  <Typography variant="body1" className={classes.text}>{t('signup.preRegistrationRequirement')}</Typography>
                  <Suspense fallback={<CircularProgress />}>
                    <SignupLifeBank
                      onSubmit={handlePreRegisterLifebank}
                      loading={preRegisterLifebankLoading}
                      setField={handleSetField}
                      user={user}
                      isEmailValid={isEmailValid}
                    >
                      <ValidateEmail
                        isValid={isEmailValid}
                        loading={checkEmailLoading}
                        user={user}
                        setField={handleSetField}
                      />
                    </SignupLifeBank>
                  </Suspense>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Dialog>
      <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleOpenAlert}>
        <Alert severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

Signup.propTypes = {
  isHome: PropTypes.bool,
  isModal: PropTypes.bool,
  isSideBar: PropTypes.bool,
}

Signup.defaultProps = {
  isHome: false,
  isModal: false,
  isSideBar: false
}

export default Signup
