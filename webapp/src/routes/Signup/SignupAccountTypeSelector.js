import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  btn: {
    margin: 5
  }
}))

const SignupAccountTypeSelector = ({ onSubmit }) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => {
          onSubmit('donor')
        }}
      >
        Donor
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => {
          onSubmit('sponsor')
        }}
      >
        Sponsor
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => {
          onSubmit('clinic')
        }}
      >
        Clinic
      </Button>
    </div>
  )
}

SignupAccountTypeSelector.propTypes = {
  onSubmit: PropTypes.func
}

SignupAccountTypeSelector.defaultProps = {}

export default SignupAccountTypeSelector
