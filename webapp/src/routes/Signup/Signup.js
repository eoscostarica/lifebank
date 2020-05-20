import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import { CREATE_ACCOUNT_MUTATION } from '../../gql'

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
  const [
    createAccount,
    {
      loading: createAccountLoading,
      data: { create_account: createAccountResult } = {}
    }
  ] = useMutation(CREATE_ACCOUNT_MUTATION)

  const steps = ['Type', 'Signup', 'Consent']

  const handleAccountTypeChange = (type) => {
    setAccountType(type)
    setActiveStep(activeStep + 1)
  }

  const handleCreateAccount = () => {
    createAccount({
      variables: {
        type: accountType,
        secret: user.secret
      }
    })
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  useEffect(() => {
    if (createAccountResult) {
      setActiveStep(activeStep + 1)
    }
  }, [createAccountResult])

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
                <SignupConsent />
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
