import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { useHistory } from 'react-router-dom'

import {
  CREATE_ACCOUNT_MUTATION,
  DONOR_SIGNUP_MUTATION,
  GET_ABI_QUERY
} from '../../gql'
import { useUser } from '../../context/user.context'

import SignupAccountTypeSelector from './SignupAccountTypeSelector'
import SignupDonor from './SignupDonor'
import SignupAccount from './SignupAccount'
import SignupConsent from './SignupConsent'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
  stepperContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}))

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [accountType, setAccountType] = useState()
  const [user, setUser] = useState({})
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

  const steps = ['Type', 'Signup', 'Consent']

  const handleAccountTypeChange = (type) => {
    setAccountType(type)
    setActiveStep(activeStep + 1)
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
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
    donorSignup({
      variables: {
        fullname: user.fullname || 'works'
      }
    })
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
    if (donorSignupResult) {
      history.replace('/dashboard')
    }
  }, [donorSignupResult])

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h1">Singup</Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className={classes.stepperContent}>
            {activeStep === 0 && (
              <SignupAccountTypeSelector onSubmit={handleAccountTypeChange} />
            )}
            {activeStep === 1 && accountType === 'donor' && (
              <SignupDonor
                onSubmit={handleCreateAccount}
                loading={createAccountLoading}
                setField={handleSetField}
                user={user}
              />
            )}
            {activeStep === 1 && accountType === 'sponsor' && <h1>sponsor</h1>}
            {activeStep === 1 && accountType === 'clinic' && <h1>clinic</h1>}
            {activeStep === 2 && (
              <>
                <SignupAccount data={createAccountResult} />
                <SignupConsent
                  onSubmit={handleSingup}
                  loading={donorSignupLoading}
                  abi={abi}
                  action="consent"
                />
              </>
            )}
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

Signup.propTypes = {}

Signup.defaultProps = {}

export default Signup
