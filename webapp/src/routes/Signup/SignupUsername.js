import React from 'react'
import PropTypes from 'prop-types'
import CheckIcon from '@material-ui/icons/Check'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

const SignupUsername = ({ isValid, loading, called, setField }) => (
  <TextField
    id="username"
    label="Username"
    placeholder="Username"
    variant="outlined"
    fullWidth
    InputLabelProps={{
      shrink: true
    }}
    onChange={(event) => setField('username', event.target.value)}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {isValid && <CheckIcon />}
          {loading && <CircularProgress color="primary" size={16} />}
        </InputAdornment>
      )
    }}
    helperText={!isValid && called && !loading ? 'Invalid username' : ''}
    error={!isValid && called && !loading}
  />
)

SignupUsername.propTypes = {
  loading: PropTypes.bool,
  called: PropTypes.bool,
  isValid: PropTypes.bool,
  setField: PropTypes.func
}

SignupUsername.defaultProps = {}

export default SignupUsername
