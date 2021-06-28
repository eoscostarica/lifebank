import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
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
import Button from '@material-ui/core/Button'
import { useSubscription } from '@apollo/react-hooks'
import { useUser } from '../../context/user.context'
import NotificationStructure from '../NotificationStructure'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'

import {
  NOTIFICATION_SUBSCRIPTION
} from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
})

const Notification = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [limit, setLimit] = useState(10)
  const isHome = location.pathname === '/'
  const theme = useTheme()
  const [currentUser] = useUser()
  const [account] = useState(currentUser.account)
  const [notifications, setNotifications] = useState([])
  const [notificationStatus, setNotificationStatus] = useState(true)
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
    setLimit(10)
    setOpen(false)
  }

  const handleMoreNotifications = () => {
    setLimit(limit + 10)
    setNotificationStatus(true)
  }

  const { loading: loadingNotifications, data: notification = {} }
    = useSubscription(NOTIFICATION_SUBSCRIPTION, { variables: { account_to: account, limit: limit } })

  useEffect(() => {
    if (Object.keys(notification).length) {
      const notificationList = notification.notification
      setNotifications(notificationList)
    }
  }, [notification])

  useEffect(() => {

    if (notification.notification) {
      var i
      for (i = 0; i < notification.notification.length; i++) {
        if (notification.notification[i].state) {
          setNotificationStatus(false)
          break
        } else {
          setNotificationStatus(true)
        }
      }
    }

  }, [notification])

  return (
    <>
      <IconButton className={classes.wrapper} onClick={handleClickOpen}>
        {notificationStatus &&
          <NotificationsIcon
            alt="Notification icon"
            className={clsx(classes.notificationIcon, {
              [classes.notificationIconTransparent]: useTransparentBG
            })}
          />}
        {!notificationStatus &&
          <NotificationsActiveIcon
            alt="Notification icon"
            className={clsx(classes.notificationIcon, {
              [classes.notificationIconTransparent]: useTransparentBG
            })}
          />}
      </IconButton>
      <Dialog className={classes.box}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar >
            <Typography variant="h6" className={classes.title}>
              {t('miscellaneous.recentActivity')}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {notifications.length > 0 && (
            <>
              {notifications.map((element, key) => (
                <NotificationStructure
                  key={key}
                  id={element.id}
                  title={element.title}
                  description={element.description}
                  state={element.state}
                  dateAndTime={element.created_at}
                />
              ))}
            </>
          )}
        </List>
        <Box className={classes.showMoreBox}>
          {!loadingNotifications &&
            <Button variant="contained" className={classes.showMore} color="primary" onClick={handleMoreNotifications}>
              {t('common.loadMore')}
            </Button>
          }
          {loadingNotifications && <CircularProgress />}
        </Box>
      </Dialog>
    </>
  )
}

Notification.propTypes = {}

export default Notification
