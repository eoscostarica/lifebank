import React from 'react'
import PropTypes from 'prop-types'
import CheckIcon from '@material-ui/icons/Check'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main
  }
}))

const SignupUsername = ({ isValid, loading, user, setField }) => {
  const classes = useStyles()

  return (
    <TextField
      id="username"
      label="Username"
      placeholder="Username"
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
      value={user?.username || ''}
      onChange={(event) =>
        setField(
          'username',
          event.target.value.length > 9 ? user.username : event.target.value
        )
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isValid && <CheckIcon className={classes.success} />}
            {loading && <CircularProgress color="primary" size={16} />}
          </InputAdornment>
        )
      }}
      helperText={
        user?.username?.length >= 9 && !isValid && !loading
          ? 'Invalid username or already taken'
          : !isValid
          ? 'You must enter 9 characters (a-z 1-5)'
          : ''
      }
      error={!isValid && !loading && user?.username?.length >= 9}
    />
  )
}

SignupUsername.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  isValid: PropTypes.bool,
  setField: PropTypes.func
}

SignupUsername.defaultProps = {}

export default SignupUsername
