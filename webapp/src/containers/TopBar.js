import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import { Link, useLocation, useHistory } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { Language as LanguageIcon } from '@material-ui/icons'

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
    color: '#121212',
    height: '32px'
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  },
  languageText: {
    color: '#121212',
    fontSize: '1rem',
    marginLeft: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
}))

const Topbar = ({ user, onLogout }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorSettings, setAnchorSettings] = useState(null)
  const theme = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const history = useHistory()
  const [downloadReport, setDownloadReport] = useState(false)

  const onReportClick = () => {
    setDownloadReport(!downloadReport)
  }

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

  const handleClickSettings = (event) => {
    setAnchorSettings(event.currentTarget)
  }

  const handleClose = (menu) => {
    if (menu === 1)
      setAnchorEl(null)
    else
      setAnchorSettings(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    onLogout()
    history.push('/')
  }

  return (
    <Box className={classes.box}>
      {user && <Notification />}
      {user && (
        <>
          <IconButton onClick={handleClickSettings}>
            <SettingsIcon
              alt="User icon"
              className={clsx(classes.userIcon, {
                [classes.userIconTransparent]: useTransparentBG
              })}
            />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorSettings}
            keepMounted
            open={Boolean(anchorSettings)}
            onClose={() => handleClose(2)}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem className={classes.menuItem}>
              <Link to="/profile">
                <EditIcon alt="Edit icon" className={classes.logoutIcon} />
                <Typography
                  variant="h5"
                  className={classes.languageText}
                >
                  {t('navigationDrawer.editPage')}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <CloudDownloadIcon className={classes.iconOption} />
              <Link onClick={onReportClick}>
                <Typography variant="body1" className={classes.labelOption}>
                  {t('navigationDrawer.downloadReport')}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <LanguageIcon
                className={classes.logoutIcon}
              />
              <LanguageSelector />
            </MenuItem>
          </Menu>
        </>
      )
      }
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
            onClose={() => handleClose(1)}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={handleLogout} className={classes.menuItem}>
              <ExitToAppIcon alt="User icon" className={classes.logoutIcon} />
              <Typography
                variant="h5"
                className={classes.languageText}
              >
                {t('login.logout')}
              </Typography>
            </MenuItem>
          </Menu>
        </>
      )
      }
      <LoginModal isNavBar />
    </Box >
  )
}

Topbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default memo(Topbar)
