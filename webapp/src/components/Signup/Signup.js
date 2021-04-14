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

const SignupDonor = lazy(() => import('./SignupDonor'));
const SignupLifeBank = lazy(() => import('./SignupLifeBank'));
const SimpleRegisterForm = lazy(() => import('./SignupSponsor/SimpleRegisterForm'));

const useStyles = makeStyles((theme) => ({
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
  dialog: {
    paddingTop: "53px",
    paddingLeft: "53px",
    paddingRight: "53px",
    paddingBottom: "38px",
    [theme.breakpoints.down('md')]: {
      paddingLeft: "21px",
      paddingRight: "21px",
    }
  },
  register: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '5% 0'
  },
  goBack: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    left: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  registerBack: {
    color: `${theme.palette.primary.main} !important`
  },
  stepperContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  titleRegister: {
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.18,
    letterSpacing: '0.25px',
    color: '#rgba(0, 0, 0, 0.87)',
    marginBottom: 15
  },
  text: {
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.33,
    letterSpacing: '0.4px',
    color: '#000000',
    marginBottom: 30
  },
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
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  registerBtn: {
    width: 180,
    height: 49,
    color: "#ffffff",
    backgroundColor: 'transparent',
    margin: theme.spacing(2, 0, 4, 0),
    borderRadius: ' 2px',
    border: 'solid 2px #ffffff'
  },
  registerBoxModal: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerTextModal: {
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.33,
    letterSpacing: '0.4px',
    color: '#000000',
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(3),
    fontSize: 14,
    textTransform: 'capitalize'
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  registerBtnSideBar: {
    display: 'flex',
    alignItems: 'center',
  },
}))

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
  const [openAlert, setOpenAlert] = useState(false)
  const [messegaAlert, setMessegaAlert] = useState("false")
  const [maxWidth] = useState('sm')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [errorMessage, setErrorMessage] = useState(null)
  const [isEmailValid, setEmailValid] = useState(false)
  const [checkEmailLoading, setcheckEmailLoaded] = useState(false)
  const [userName , setUserName] = useState(t('signup.defaultUsername'))

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleOpenAlert = () => {
    setOpenAlert(!openAlert)
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
    const { name, email, secret } = user
    const bcrypt = require('bcryptjs')
    const saltRounds = 10
    if(name) setUserName(name)
    bcrypt.hash(secret, saltRounds, function (err, hash) {
      if (!err) {
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
            name: userName,
            secret: hash,
            signup_method: 'lifebank'
          }
        })
      }
    })
  }

  const handleCreateAccountWithAuth = async (status, email, name, secret, signupMethod) => {
    if (status) {
      const { data } = await checkEmail({ email: email })
      if (data.user.length === 0) {
        const bcrypt = require('bcryptjs')
        const saltRounds = 10

        bcrypt.hash(secret, saltRounds, function (err, hash) {
          if (!err) {
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
                secret: hash,
                signup_method: signupMethod
              }
            })
          }
        })
      } else {
        setErrorMessage(t('errors.authError'))
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

    const bcrypt = require('bcryptjs')
    const saltRounds = 10
    const schedule = '[]'

    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (!err) {
        preRegisterLifebank({
          variables: {
            email,
            emailContent: {
              subject: t('emailMessage.subjectVerificationCode'),
              title: t('emailMessage.titleVerificationCode'),
              message: t('emailMessage.messageVerificationCode'),
              button: t('emailMessage.verifyButton')
            },
            password: hash,
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
      setMessegaAlert(t('signup.sucessfulPreregistration'))
      handleOpenAlert()

    }
  }, [preRegisterLifebankResult])

  useEffect(() => {
    if (createAccountResult) {
      handleOpen()
      setMessegaAlert(t('signup.sucessfulRegistration'))
      handleOpenAlert()
    }

  }, [createAccountResult])

  useEffect(() => {
    if (createAccountResultAuth) {
      handleOpen()
      setMessegaAlert(t('signup.sucessfulRegistration'))
      handleOpenAlert()
      login(createAccountResultAuth.token)
    }

  }, [createAccountResultAuth])


  useEffect(() => {
    if (errorcreateAccount) setErrorMessage(t('errors.authError'))

  }, [errorcreateAccount])

  useEffect(() => {
    if (errorcreateAccountAuth) setErrorMessage(t('errors.authError'))

  }, [errorcreateAccountAuth])

  useEffect(() => {
    if (errorpreRegisterLifebank) setErrorMessage(t('errors.authError'))

  }, [errorpreRegisterLifebank])

  useEffect(()=>{
    if(open){
      handleSetField('email', ' ')
      setActiveStep(0)
    }
  }, [open])

  const ErrorMessage = () => {
    return (
      <>
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
      </>
    )
  }

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
                      <ErrorMessage />
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
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleOpenAlert}>
        <Alert onClose={handleOpenAlert} severity="success">
          {messegaAlert}
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
