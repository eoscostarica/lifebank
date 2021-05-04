import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import StorefrontIcon from '@material-ui/icons/Storefront'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import Avatar from '@material-ui/core/Avatar'
import styles from './styles'

const useStyles = makeStyles(styles)

const LogoUrlInput = ({ handleSetField, logo, role }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <Avatar
        className={classes.avatarRoundDesktop}
        src={logo ? `//images.weserv.nl?url=${logo}&h=300&dpr=2` : ''}
      >
        {role === "sponsor" && <StorefrontIcon />}
        {role === "lifebank" && <LocalHospitalIcon />}
      </Avatar>
      <TextField
        id="logo-url"
        name="logo-input"
        label={t('editProfile.logoUrl')}
        variant="filled"
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
    </Box>

  )
}

LogoUrlInput.propTypes = {
  handleSetField: PropTypes.func,
  logo: PropTypes.string,
  role: PropTypes.string,
}

export default LogoUrlInput
