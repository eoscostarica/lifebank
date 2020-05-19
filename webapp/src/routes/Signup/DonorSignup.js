import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { DONOR_SIGNUP } from '../../gql'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
  stepperContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  img: {
    maxWidth: '100%',
    maxHeight: 380
  },
  textFieldWrapper: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginRight: theme.spacing(2)
  },
  btnWrapper: {
    display: 'flex'
  },
  marginTop: {
    marginTop: theme.spacing(2)
  }
}))

const DonorSignup = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isPossibleDonor, setIsPossibleDonor] = useState(true)
  const [user, setUser] = useState({})
  const classes = useStyles()
  const [
    signup,
    { loading, data: { donor_signup: signupResult } = {} }
  ] = useMutation(DONOR_SIGNUP)

  const steps = ['Health care', 'Contact', 'Signup', 'Done']
  const questions = [
    {
      text:
        'You are a health care worker who has been caring for a patient diagnosed with or suspected of having COVID-19 and have not consistently been able to use recommended personal protective equipment (face mask, gown and gloves)?',
      image:
        'https://cdn.lynda.com/course/477451/477451-637242269901904482-16x9.jpg',
      value: false
    },
    {
      text:
        'You have lived with or been in close contact with individuals diagnosed with or suspected of having COVID-19 infection?',
      image:
        'https://beta.ctvnews.ca/content/dam/ctvnews/images/2020/3/12/1_4850058.png',
      value: false
    }
  ]

  const handleAnswer = (event) => {
    if (event.target.value === '1') {
      setIsPossibleDonor(false)
      return
    }

    setActiveStep(activeStep + 1)
  }

  const handleSubmit = () => {
    signup({ variables: user })
  }

  useEffect(() => {
    if (signupResult) {
      setActiveStep(steps.length - 1)
    }
  }, [steps, signupResult])

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h1">
            Let's validate if you are an eligible donor
          </Typography>
          <Typography variant="body1">
            Due to COVID-19 (SARS-CoV-2 Coronavirus), we are requiring that
            people should not donate today if in the PAST 4 WEEKS:
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className={classes.stepperContent}>
            {!isPossibleDonor && (
              <div>
                <img
                  src="https://i.pinimg.com/474x/d7/a3/ae/d7a3ae5506817d1ef60dabde37150fe9--grumpy-cat-humor-grumpy-cats.jpg"
                  className={classes.img}
                  alt="not today"
                />
                <Typography variant="body1">
                  Sorry, but you are not eligible
                </Typography>
              </div>
            )}
            {isPossibleDonor && activeStep < questions.length && (
              <div>
                <img
                  src={questions[activeStep].image}
                  className={classes.img}
                  alt="result"
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {questions[activeStep].text}
                  </FormLabel>
                  <RadioGroup
                    name="gender1"
                    onChange={handleAnswer}
                    value={questions[activeStep].value}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            )}
            {isPossibleDonor && activeStep === questions.length && (
              <form autoComplete="off">
                <div className={classes.textFieldWrapper}>
                  <TextField
                    id="fullname"
                    label="Fullname"
                    className={classes.textField}
                    onChange={(event) =>
                      setUser({ ...user, fullname: event.target.value })
                    }
                  />
                  <TextField
                    id="secret"
                    label="secret"
                    type="password"
                    className={classes.textField}
                    onChange={(event) =>
                      setUser({ ...user, secret: event.target.value })
                    }
                  />
                </div>
                <div className={classes.btnWrapper}>
                  <Button
                    disabled={!user.fullname || !user.secret || loading}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Continue
                  </Button>
                  {loading && <CircularProgress />}
                </div>
              </form>
            )}
            {isPossibleDonor && activeStep === steps.length - 1 && (
              <div>
                <img
                  src="https://sayingimages.com/wp-content/uploads/welcome-real-world-meme.jpg"
                  className={classes.img}
                  alt="done"
                />
                <Typography variant="h4" className={classes.marginTop}>
                  Account
                </Typography>
                <Typography variant="body1">
                  <Link
                    href={`https://jungle.bloks.io/account/${signupResult.account}`}
                    target="_blank"
                    rel="noopener"
                    color="secondary"
                  >
                    {signupResult.account}
                  </Link>
                </Typography>
                <Typography variant="h4" className={classes.marginTop}>
                  Transaction Id
                </Typography>
                <Typography variant="body1">
                  <Link
                    href={`https://jungle.bloks.io/transaction/${signupResult.transaction_id}`}
                    target="_blank"
                    rel="noopener"
                    color="secondary"
                  >
                    {signupResult.transaction_id}
                  </Link>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.marginTop}
                >
                  Consent to lifebank
                </Button>
              </div>
            )}
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

DonorSignup.propTypes = {}

DonorSignup.defaultProps = {}

export default DonorSignup
