import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const SignupConsent = ({ onSubmit, loading, abi, action }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.wrapper}>
        <RicardianContract abi={abi} action={action} />
      </Box>
      <Box className={classes.btnWrapper}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          I Accept
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </>
  )
}

SignupConsent.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  abi: PropTypes.object,
  action: PropTypes.string
}

SignupConsent.defaultProps = {}

export default SignupConsent
