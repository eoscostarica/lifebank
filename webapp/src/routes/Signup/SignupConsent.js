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
    marginBottom: theme.spacing(2),
    '& img': {
      width: 80
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      margin: theme.spacing(1, 0, 2, 0)
    },
    '& h1, & h2': {
      textTransform: 'capitalize',
      margin: 0
    },
    '& p a': {
      wordBreak: 'break-all'
    }
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const SignupConsent = ({ onSubmit, loading, contract, action }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.wrapper}>
        <RicardianContract
          name={contract.name}
          hash={contract.hash}
          abi={contract.abi}
          action={action}
        />
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
  contract: PropTypes.object,
  action: PropTypes.string
}

SignupConsent.defaultProps = {}

export default SignupConsent
