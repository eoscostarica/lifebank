
import React, { useState, useEffect } from 'react'
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
import { Divider } from '@material-ui/core'

import { useQuery } from '@apollo/react-hooks'
import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks'

import { useUser } from '../../context/user.context'

import {
  // PROFILE_QUERY,
  NOTIFICATION_SUBSCRIPTION
} from '../../gql'
import { elementType } from 'prop-types'


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
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [maxWidth] = useState('md')

  const [currentUser] = useUser()
  const [account, setAccount] = useState(currentUser.account)



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

    console.log("Primera..", Object.keys(notification))
    console.log("USUARIO", currentUser)
    if (Object.keys(notification).length) {
      console.log("Entro...")
      console.log("NOTIFICATION:", notification.notification[1])

    }
    //   // if (
    //   //   !profile 
    //   //   !notification.length 
    //   //   notification[0].id === lastNotification.id
    //   // ) {
    //   //   return
    //   // }

    //   // if (
    //   //   notification[0].payload.newBalance.join() === profile.balance.join()
    //   // ) {
    //   //   return
    //   // }

    //   // setLastNotification(notification[0])
    //   // loadProfile()
    //   // }, [notification, profile, lastNotification, loadProfile])
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

      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidth}

        className={classes.dialog}
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

        <List>
          {Object.keys(notification).map}

          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Divider />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
        </List>


      </Dialog>
    </>
  )
}

Notification.propTypes = {}

export default Notification
