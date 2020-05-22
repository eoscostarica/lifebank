import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

import RicardianContract from '../../components/RicardianContract'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxHeight: 400,
    overflow: 'scroll',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  btnWrapper: {
    display: 'flex'
  }
}))

const SignupConsent = ({ onSubmit, loading, abi, action }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <RicardianContract abi={abi} action={action}></RicardianContract>
      </div>
      <div className={classes.btnWrapper}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Agree
        </Button>
        {loading && <CircularProgress />}
      </div>
    </>
  )
}

SignupConsent.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  abi: PropTypes.func,
  action: PropTypes.string
}

SignupConsent.defaultProps = {}

export default SignupConsent
