import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import StorefrontIcon from '@material-ui/icons/Storefront'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2)
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarRoundDesktop: {
    width: '90px',
    height: '90px',
    border: 'solid 2px rgba(0, 0, 0, 0.04)',
    [theme.breakpoints.down('md')]: {
      width: '70px',
      height: '70px',
    },
    marginTop: '10px',
    marginBottom: '10px'
  },
  logoTitle: {
    textAlign: 'center'
  }
}))

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
    </Box>

  )
}

LogoUrlInput.propTypes = {
  handleSetField: PropTypes.func,
  logo: PropTypes.string,
  role: PropTypes.string,
}

export default LogoUrlInput
