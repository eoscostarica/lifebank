import React from 'react'
import PropTypes from 'prop-types'
import CheckIcon from '@material-ui/icons/Check'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main
  }
}))

const SignupUsername = ({ isValid, loading, user, setField }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <TextField
      id="username"
      label={t('miscellaneous.username')}
      placeholder={t('miscellaneous.username')}
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
          ? t('miscellaneous.invalidrOrTaken')
          : !isValid
          ? t('miscellaneous.youMustEnter')
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
