import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import { useTranslation } from 'react-i18next'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

import LanguageSelector from '../components/LanguageSelector'

const useStyles = makeStyles((theme) => ({
  sessionText: {
    marginLeft: 5,
    color: theme.palette.primary.contrastText,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    height: 24
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  }
}))

const Topbar = ({ user, onLogout }) => {
  const classes = useStyles()
  const { t } = useTranslation('translations')

  return (
    <Box className={classes.box}>
      <LanguageSelector />
      {user && (
        <Box>
          <IconButton color="inherit">
            <Link to="/profile" className={classes.link}>
              <AccountCircleIcon />
              <Typography className={classes.sessionText} variant="subtitle1">
                {user.account}
              </Typography>
            </Link>
          </IconButton>
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      )}
      {!user && (
        <IconButton color="inherit">
          <Link to="/login" className={classes.link}>
            <FingerprintIcon />
            <Typography className={classes.sessionText} variant="subtitle1">
              {t('login')}
            </Typography>
          </Link>
        </IconButton>
      )}
    </Box>
  )
}

Topbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default Topbar
