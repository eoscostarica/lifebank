import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import { Link, useLocation } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ShareIcon from '@material-ui/icons/Share'
import clsx from 'clsx'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'

import LanguageSelector from '../components/LanguageSelector'
import Notification from '../components/Notification'
import LoginModal from '../components/LoginModal'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none'
  },
  userIcon: {
    color: '#121212',
    width: 24,
    height: 24
  },
  userIconTransparent: {
    color: '#ffffff'
  },
  logoutIcon: {
    color: '#121212',
    width: 20,
    height: 20,
    marginRight: 10
  },
  menuItem: {
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#121212'
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  }
}))

const Topbar = ({ user, onLogout }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const trigger = useScrollTrigger({
    target: window || undefined,
    disableHysteresis: true
  })

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const useTransparentBG = isDesktop && !trigger && isHome

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    onLogout()
  }

  return (
    <Box className={classes.box}>
      <LanguageSelector />
      {user && isDesktop && (
        <IconButton onClick={handleClick}>
          <ShareIcon
            alt="User icon"
            className={clsx(classes.userIcon, {
              [classes.userIconTransparent]: useTransparentBG
            })}
          />
        </IconButton>
      )}
      {user && <Notification />}
      {user && (
        <>
          <IconButton onClick={handleClick}>
            <PersonIcon
              alt="User icon"
              className={clsx(classes.userIcon, {
                [classes.userIconTransparent]: useTransparentBG
              })}
            />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/profile" className={classes.link}>
              <MenuItem className={classes.menuItem}>{user.account}</MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogout} className={classes.menuItem}>
              <ExitToAppIcon alt="User icon" className={classes.logoutIcon} />
              {t('login.logout')}
            </MenuItem>
          </Menu>
        </>
      )}
      {!user && <LoginModal />}
    </Box>
  )
}

Topbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default Topbar
