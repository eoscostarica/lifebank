
import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Box from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import clsx from 'clsx'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'


import { useSubscription } from '@apollo/react-hooks'
import { useUser } from '../../context/user.context'
import NotificationStructure from '../NotificationStructure'

import {
  NOTIFICATION_SUBSCRIPTION
} from '../../gql'



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
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: '30%',
    backgroundColor: '#121212'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Notification = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'


  const [currentUser] = useUser()
  const [account, setAccount] = useState(currentUser.account)
  const [notifications, setNotifications] = useState([])

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

  const { data: notification = {} } = useSubscription(
    NOTIFICATION_SUBSCRIPTION, { variables: { account } }
  )


  useEffect(() => {


    if (Object.keys(notification).length) {
      const notificationList = notification.notification
      console.log("Entro...")
      console.log("Hola ", Array.isArray(notificationList))


      console.log("NOTIFICATION:", notification.notification[1])
      setNotifications(notificationList)
    }
  }, [notification])

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

      <Box className={classes.box}

        open={open}
        onClose={handleClose}

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
        {notifications.length > 0 && (
          <>
            {notifications.map((el, key) => (

              <NotificationStructure
                key={key}
                title={el.title}
                description={el.description}
              />
            ))}

          </>
        )}

      </Box>
    </>
  )
}

Notification.propTypes = {}

export default Notification
