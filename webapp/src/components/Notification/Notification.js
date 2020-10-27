import React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import clsx from 'clsx'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: 'inherit'
  },
  notificationIcon: {
    color: '#121212',
    width: 24,
    height: 24
  },
  notificationIconTransparent: {
    color: '#ffffff'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'
  },
  backIcon: {
    color: '#121212'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '20px',
    fontWeight: '500'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Notification = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
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

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton className={classes.wrapper} onClick={handleClickOpen}>
        <NotificationsIcon
          alt="Notification icon"
          className={clsx(classes.notificationIcon, {
            [classes.notificationIconTransparent]: useTransparentBG
          })}
        />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.backIcon}
              onClick={handleClose}
              aria-label="close"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {t('miscellaneous.recentActivity')}
            </Typography>
          </Toolbar>
        </AppBar>
        <List />
      </Dialog>
    </>
  )
}

Notification.propTypes = {}

export default Notification
