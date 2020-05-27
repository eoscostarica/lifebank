import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'

import {
  CREATE_ACCOUNT_MUTATION,
  DONOR_SIGNUP_MUTATION,
  SPONSOR_SIGNUP_MUTATION,
  LIFEBANK_SIGNUP_MUTATION,
  GET_ABI_QUERY
} from '../../gql'
import { useUser } from '../../context/user.context'

import SignupAccountTypeSelector from './SignupAccountTypeSelector'
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
  }
}))

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [accountType, setAccountType] = useState('sponsor')
  const [user, setUser] = useReducer(
    (user, newUser) => ({ ...user, ...newUser }),
    {}
  )
  const classes = useStyles()
  const history = useHistory()
  const [currentUser, { login }] = useUser()
  const [
    createAccount,
    {
      loading: createAccountLoading,
      data: { create_account: createAccountResult } = {}
    }
  ] = useMutation(CREATE_ACCOUNT_MUTATION)
  const [
    donorSignup,
    {
      loading: donorSignupLoading,
      data: { donor_signup: donorSignupResult } = {}
    }
  ] = useMutation(DONOR_SIGNUP_MUTATION)
  const { data: { get_abi: { abi } = {} } = {} } = useQuery(GET_ABI_QUERY, {
    variables: { contract: 'consent2life' }
  })
  const [
    sponsorSignup,
    {
      loading: sponsorSignupLoading,
      data: { sponsor_signup: sponsorSignupResult } = {}
    }
  ] = useMutation(SPONSOR_SIGNUP_MUTATION)
  const [
    lifebankSignup,
    {
      loading: lifebankSignupLoading,
      data: { lifebank_signup: lifebankSignupResult } = {}
    }
  ] = useMutation(LIFEBANK_SIGNUP_MUTATION)

  const handleAccountTypeChange = (type) => {
    setAccountType(type)
    setActiveStep(activeStep + 1)
  }

  const handleSetField = useCallback((field, value) => {
    setUser({ [field]: value })
  }, [])

  const handleGoBack = () => {
    activeStep && setActiveStep(activeStep - 1)
  }

  const handleCreateAccount = () => {
    createAccount({
      variables: {
        type: accountType,
        secret: user.secret
      }
    })
  }

  const handleSingup = () => {
    switch (accountType) {
      case 'donor':
        donorSignup({
          variables: {
            fullname: user.fullname || 'works'
          }
        })
        break
      case 'sponsor':
        sponsorSignup({
          variables: {
            sponsor: {
              benefitDescription: user.benefitDescription,
              bussinesType: user.bussinesType,
              covidImpact: user.covidImpact,
              schedule: user.schedule,
              sponsorName: user.sponsorName,
              telephone: user.telephone,
              website: user.website,
              geolocation: user.geolocation
            }
          }
        })
        break
      case 'lifebank':
        lifebankSignup({
          variables: {
            name: user.name,
            description: user.description,
            address: user.address,
            location: 'N/A',
            phoneNumber: user.phoneNumber,
            hasImmunityTest: user.hasImmunityTest,
            bloodUrgencyLevel: user.bloodUrgencyLevel,
            schedule: user.schedule,
            geolocation: user.geolocation
          }
        })

      default:
        break
    }
  }

  useEffect(() => {
    if (currentUser) {
      setActiveStep(2)
    }
  }, [currentUser])

  useEffect(() => {
    if (createAccountResult) {
      login(createAccountResult.token)
    }
  }, [createAccountResult])

  useEffect(() => {
    if (donorSignupResult || sponsorSignupResult || lifebankSignupResult) {
      history.replace('/profile')
    }
  }, [donorSignupResult, sponsorSignupResult, lifebankSignupResult])

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
              <SignupAccountTypeSelector onSubmit={handleAccountTypeChange} />
            </>
          )}
          {activeStep === 1 && accountType === 'donor' && (
            <>
              <Typography variant="h4">Create a new account.</Typography>
              <SignupDonor
                onSubmit={handleCreateAccount}
                loading={createAccountLoading}
                setField={handleSetField}
                user={user}
              />
            </>
          )}
          {activeStep === 1 && accountType === 'sponsor' && (
            <SignupSponsor
              onSubmit={handleCreateAccount}
              loading={createAccountLoading}
              setField={handleSetField}
              user={user}
            />
          )}
          {activeStep === 1 && accountType === 'lifebank' && (
            <SignupLifeBank
              onSubmit={handleCreateAccount}
              loading={createAccountLoading}
              setField={handleSetField}
              user={user}
            />
          )}
          {activeStep === 1 && accountType === 'clinic' && <h1>clinic</h1>}
          {activeStep === 2 && (
            <>
              <Typography variant="h4">
                Read our Terms and Conditions
              </Typography>
              <SignupAccount data={createAccountResult} />
              <SignupConsent
                onSubmit={handleSingup}
                loading={
                  donorSignupLoading ||
                  sponsorSignupLoading ||
                  lifebankSignupLoading
                }
                abi={abi}
                action="consent"
              />
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
