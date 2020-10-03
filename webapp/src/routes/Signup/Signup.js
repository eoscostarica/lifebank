import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'

import {
  CREATE_ACCOUNT_MUTATION,
  SIGNUP_MUTATION,
  CREATE_PRE_REGITER_LIFEBANK_MUTATION,
  VALIDATE_EMAIL
} from '../../gql'
import { useUser } from '../../context/user.context'

import SignupRoleSelector from './SignupRoleSelector'
import ValidateEmail from './ValidateEmail'
import SignupDonor from './SignupDonor'
import SignupSponsor from './SignupSponsor/SignupSponsor'
import SignupLifeBank from './SignupLifeBank'
import SignupAccount from './SignupAccount'
import SignupConsent from './SignupConsent'

const useStyles = makeStyles((theme) => ({
  register: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    alignItems: 'center',
    padding: theme.spacing(2, 1),
    '& h1': {
      marginBottom: theme.spacing(4),
      fontSize: 48
    },
    '& h4': {
      marginBottom: theme.spacing(4),
      color: theme.palette.secondary.main
    }
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '5% 0'
  },
  goBack: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    '& button': {
      padding: 0,
      display: 'flex',
      alignItems: 'end',
      height: 25
    }
  },
  registerBack: {
    color: `${theme.palette.primary.main} !important`
  },
  stepperContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  text: {
    padding: theme.spacing(0, 2)
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%"
  },
}))

const Signup = () => {
  const classes = useStyles()
  const history = useHistory()
  const [user, setUser] = useReducer(
    (user, newUser) => ({ ...user, ...newUser }),
    {}
  )
  const [activeStep, setActiveStep] = useState(0)
  const [role, setRole] = useState()
  const [currentUser, { login }] = useUser()

  const [errorMessage, setErrorMessage] = useState(null)
  const [isEmailValid, setEmailValid] = useState(false)
  const [checkEmailLoading, setcheckEmailLoaded] = useState(false)

  const [
    createAccount,
    {
      loading: createAccountLoading,
      data: { create_account: createAccountResult } = {}
    }
  ] = useMutation(CREATE_ACCOUNT_MUTATION)
  const [
    preRegisterLifebank,
    {
      loading: preRegisterLifebankLoading,
      data: { create_pre_register_lifebank: preRegisterLifebankResult } = {}
    }
  ] = useMutation(CREATE_PRE_REGITER_LIFEBANK_MUTATION)
  const [
    signup,
    { loading: signupLoading, data: { signup: signupResult } = {} }
  ] = useMutation(SIGNUP_MUTATION)

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
    const { email, secret } = user
    const name = "undefined"
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;

    bcrypt.hash(secret, saltRounds, function (err, hash) {
      if (!err) {
        createAccount({
          variables: {
            role,
            email,
            name,
            secret: hash
          }
        })
      }
    });
  }


  const handleCreateAccountWithAuth = async (status, email, name, secret) => {
    if (status) {

      const { data } = await checkEmail({ email: email })

      if (data.user.length === 0) {

        const bcrypt = require('bcryptjs');
        const saltRounds = 10;

        bcrypt.hash(secret, saltRounds, function (err, hash) {
          if (!err) {
            createAccount({
              variables: {
                role,
                email,
                name,
                secret: hash
              }
            })
          }
        });

      } else {
        setErrorMessage("Something happened with the authentication")
      }
    }
  }

  const handlePreRegisterLifebank = () => {
    const { email, password, name, address, schedule, phone, description, coordinates } = user
    let { immunity_test, invitation_code, urgency_level } = user

    if (immunity_test === undefined) {
      immunity_test = false
    }
    if (invitation_code === undefined) {
      invitation_code = " "
    }
    if (urgency_level === undefined) {
      urgency_level = 1
    }

    preRegisterLifebank({
      variables: {
        email,
        password,
        name,
        address,
        schedule,
        phone,
        description,
        urgency_level,
        coordinates,
        immunity_test,
        invitation_code
      }
    })
  }

  const { refetch: checkEmail } = useQuery(VALIDATE_EMAIL, {
    variables: {
      email: user.email
    },
    skip: true
  })

  useEffect(() => {
    const regularExpresion = /\S+@\S+\.\S+/
    const validEmail = async () => {
      const { data } = await checkEmail({
        email: user.email
      })
      try {
        if (data.verification_email.length === 0) setEmailValid(true)
        else setEmailValid(false)
        setcheckEmailLoaded(true)
      } catch (error) {

      }
    }
    if (regularExpresion.test(user?.email)) validEmail()
    else {
      setEmailValid(false)
      setcheckEmailLoaded(false)
    }
  }, [user?.email, checkEmail])

  useEffect(() => {
    if (preRegisterLifebankResult) {
      alert("successful pre registration")
      history.replace('/')
    }
  }, [preRegisterLifebankResult])

  const handleSingup = () => {
    const { username, secret, ...profile } = user

    signup({
      variables: {
        profile
      }
    })
  }

  useEffect(() => {
    if (createAccountResult) {
      login(createAccountResult.token)
    }
  }, [createAccountResult])

  useEffect(() => {
    if (!currentUser) {
      return
    }

    if (!createAccountResult) {
      history.replace('/profile')

      return
    }

    setActiveStep(2)
  }, [currentUser, createAccountResult])

  useEffect(() => {
    if (signupResult) {
      history.replace('/profile')
    }
  }, [signupResult])

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
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12} sm={8} md={6} className={classes.register}>
        <Typography variant="h1">{`Step ${activeStep + 1}`}</Typography>
        <Box className={classes.stepperContent}>
          <Box className={classes.goBack}>
            <IconButton aria-label="go-back" onClick={handleGoBack}>
              <ArrowBackIcon color="primary" />
              <Typography variant="h4" className={classes.registerBack}>
                Register
              </Typography>
            </IconButton>
          </Box>
          {activeStep === 0 && (
            <>
              <Typography variant="h4">How do you want to help?</Typography>
              <SignupRoleSelector onSubmit={handleRoleChange} />
            </>
          )}

          {activeStep === 1 && role !== 'lifebank' && (
            <>
              <Typography variant="h4">Create a new account.</Typography>
              <Typography variant="body1" className={classes.text}>
                To register, all you need to do is add your email and password.
              </Typography>
            </>
          )}
          {activeStep === 1 && role === 'lifebank' && (
            <>
              <Typography variant="h4">Pre-register a new account.</Typography>
              <Typography variant="body1" className={classes.text}>
                To carry out the pre-registration, you must indicate
                the following data, necessary for the approval of the blood bank
              </Typography>
            </>
          )}
          {activeStep === 1 && role === 'donor' && (

            <SignupDonor
              onSubmit={handleCreateAccount}
              onSubmitWithAuth={handleCreateAccountWithAuth}
              loading={createAccountLoading}
              setField={handleSetField}
              user={user}
              isEmailValid={isEmailValid}
            >
              <ErrorMessage />
              <ValidateEmail
                isValid={isEmailValid}
                loading={checkEmailLoading}
                user={user}
                setField={handleSetField}
              />
            </SignupDonor>
          )}
          {activeStep === 1 && role === 'sponsor' && (
            <SignupSponsor
              onSubmit={handleCreateAccount}
              loading={createAccountLoading}
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
            </SignupSponsor>
          )}
          {activeStep === 1 && role === 'lifebank' && (
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
          )}
          {activeStep === 2 && (
            <>
              <Typography variant="h4">
                Read our Terms and Conditions
              </Typography>
              <SignupAccount data={createAccountResult} />
              <SignupConsent onSubmit={handleSingup} loading={signupLoading} />
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}


Signup.propTypes = {}

Signup.defaultProps = {}

export default Signup
