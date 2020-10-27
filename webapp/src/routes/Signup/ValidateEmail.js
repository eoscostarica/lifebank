import React from 'react'
import PropTypes from 'prop-types'
import CheckIcon from '@material-ui/icons/Check'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main
  }
}))

const ValidateEmail = ({ isValid, loading, user, setField }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  const validateFormatEmail = (email) => {
    const regularExpresion = /\S+@\S+\.\S+/
    if (regularExpresion.test(email)) {
      return true
    } else {
      return false
    }
  }

  return (
    <TextField
      id="email"
      label={t('common.email')}
      variant="outlined"
      placeholder={t('common.emailPlaceholder')}
      type="email"
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
      value={user?.email || ''}
      onChange={(event) => setField('email', event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isValid && <CheckIcon className={classes.success} />}
          </InputAdornment>
        )
      }}
      helperText={
        validateFormatEmail(user.email) && !isValid && loading
          ? t('miscellaneous.alreadyAssociated')
          : !isValid
          ? ''
          : ''
      }
      error={!isValid && loading && validateFormatEmail(user.email)}
    />
  )
}

ValidateEmail.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  isValid: PropTypes.bool,
  setField: PropTypes.func
}

ValidateEmail.defaultProps = {}

export default ValidateEmail
