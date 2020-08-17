import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'

import {
  CHECK_USERNAME_MUTATION,
  CREATE_ACCOUNT_MUTATION,
  SIGNUP_MUTATION
} from '../../gql'
import { useUser } from '../../context/user.context'

import SignupRoleSelector from './SignupRoleSelector'
import SignupUsername from './SignupUsername'
import SignupDonor from './SignupDonor'
import SignupSponsor from './SignupSponsor'
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
  goBack: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(10),
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
  }
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
  const [
    checkUsername,
    {
      loading: checkUsernameLoading,
      data: { check_username: { is_valid: isUsernameValid } = {} } = {}
    }
  ] = useMutation(CHECK_USERNAME_MUTATION)
  const [
    createAccount,
    {
      loading: createAccountLoading,
      data: { create_account: createAccountResult } = {}
    }
  ] = useMutation(CREATE_ACCOUNT_MUTATION)
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
  }

  const handleCreateAccount = () => {
    const { username, secret } = user
    createAccount({
      variables: {
        role,
        username,
        secret
      }
    })
  }

  const handleSingup = () => {
    const { username, secret, ...profile } = user

    signup({
      variables: {
        profile
      }
    })
  }

  useEffect(() => {
    if (user?.username?.length === 9 || isUsernameValid) {
      checkUsername({
        variables: {
          role,
          username: user.username
        }
      })
    }
  }, [user?.username, checkUsername, isUsernameValid, role, user])

  useEffect(() => {
    if (createAccountResult) {
      login(createAccountResult.token)
    }
  }, [createAccountResult, login])

  useEffect(() => {
    if (!currentUser) {
      return
    }

    if (!createAccountResult) {
      history.replace('/profile')

      return
    }

    setActiveStep(2)
  }, [currentUser, createAccountResult, history])

  useEffect(() => {
    if (signupResult) {
      history.replace('/profile')
    }
  }, [signupResult])

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={6} className={classes.register}>
        <Box className={classes.goBack}>
          <IconButton aria-label="go-back" onClick={handleGoBack}>
            <ArrowBackIcon color="primary" />
            <Typography variant="h4" className={classes.registerBack}>
              Register
            </Typography>
          </IconButton>
        </Box>
        <Typography variant="h1">{`Step ${activeStep + 1}`}</Typography>
        <Box className={classes.stepperContent}>
          {activeStep === 0 && (
            <>
              <Typography variant="h4">How do you want to help?</Typography>
              <SignupRoleSelector onSubmit={handleRoleChange} />
            </>
          )}
          {activeStep === 1 && (
            <>
              <Typography variant="h4">Create a new account.</Typography>
              <Typography variant="body1" className={classes.text}>
                To sign up all you need is to pick a 9 letter username and a
                password, a unique blockchain account name will be generated
                you.
              </Typography>
            </>
          )}
          {activeStep === 1 && role === 'donor' && (
            <SignupDonor
              onSubmit={handleCreateAccount}
              loading={createAccountLoading}
              setField={handleSetField}
              user={user}
              isUsernameValid={isUsernameValid}
            >
              <SignupUsername
                isValid={isUsernameValid}
                loading={checkUsernameLoading}
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
              isUsernameValid={isUsernameValid}
            >
              <SignupUsername
                isValid={isUsernameValid}
                loading={checkUsernameLoading}
                user={user}
                setField={handleSetField}
              />
            </SignupSponsor>
          )}
          {activeStep === 1 && role === 'lifebank' && (
            <SignupLifeBank
              onSubmit={handleCreateAccount}
              loading={createAccountLoading}
              setField={handleSetField}
              user={user}
              isUsernameValid={isUsernameValid}
            >
              <SignupUsername
                isValid={isUsernameValid}
                loading={checkUsernameLoading}
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
