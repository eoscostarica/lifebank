import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
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
import Button from '@material-ui/core/Button'
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
    width: '100%',
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
    justifyContent: 'flex-end',
    marginLeft: '60%',

  },
  boxList: {
    margin: '5%'

  },
  editBtn: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "30%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 20,
    marginLeft: '35%',
    position: 'absolute',
    bottom: 0
  }

}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />
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
        <List className={classes.boxList}>
          {notifications.length > 0 && (
            <>
              {notifications.map((element, key) => (
                <NotificationStructure
                  key={key}
                  title={element.title}
                  description={element.description}
                  type={element.type}
                  payload={element.payload}
                  state={element.state}
                />
              ))}
            </>
          )}
        </List>
        <Button variant="contained" className={classes.editBtn} color="primary">
          {t('common.loadMore')}
        </Button>
      </Dialog>
    </>
  )
}

Notification.propTypes = {}

export default Notification
