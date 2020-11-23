import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../Logo'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2)
  },
  box: {
    width: '100%'
  },
  logoTitle: {
    textAlign: 'center'
  }
}))

const LogoUrlInput = ({ handleSetField, logo }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  return (
    <Box className={classes.box} display="flex" flexDirection="column">
      {logo && logo.length > 0 ? (
        <>
          <Typography className={classes.logoTitle} variant="h4">
            Logo
          </Typography>
          <br />
          <Logo
            showDeleteButton
            logoUrl={logo}
            deleteActualLogo={(deleteLogo) => {
              if (deleteLogo) handleSetField('logo_url', '')
            }}
          />
        </>
      ) : (
        <TextField
          id="logo-url"
          name="logo-input"
          label={t('editProfile.logoUrl')}
          variant="outlined"
          placeholder={t('editProfile.logoUrlPlaceholder')}
          defaultValue={logo}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => {
            if (event.target.value.length > 0)
              handleSetField('logo_url', event.target.value)
          }}
        />
      )}
    </Box>
  )
}

LogoUrlInput.propTypes = {
  handleSetField: PropTypes.func,
  logo: PropTypes.string
}

export default LogoUrlInput
