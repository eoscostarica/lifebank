import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert, AlertTitle } from '@material-ui/lab'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'

import {
  PROFILE_QUERY,
  GRANT_CONSENT_MUTATION,
  REVOKE_CONSENT_MUTATION,
  NOTIFICATION_SUBSCRIPTION
} from '../../gql'
import { useUser } from '../../context/user.context'
import CarouselComponent from '../../components/Carousel'
import { eosConfig } from '../../config'

const useStyles = makeStyles((theme) => ({
  cardBody: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginBottom: '0',
    marginTop: '16px',
    //borderStyle: 'groove'
  },
  headerCardBody: {
    width: '100%',
    height: '12%',
    //borderStyle: 'groove'
  },
  avatarSection: {
    width: '25%',
    height: '100%',
    //borderStyle: 'groove',
    float: 'left'
  },
  avatarRound: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginLeft: '16px',
    marginRight: '13px',
    marginTop: '13px',
  },
  tituleSection: {
    width: '75%',
    height: '100%',
    //borderStyle: 'groove',
    float: 'left'
  },
  bodyCard: {
    width: '100%',
    height: '88%',
    borderStyle: 'groove'
  },
  carouselComponent: {
    justifyContent: 'center',
    justifySelf: 'center'
  },
  imageSection: {
    width: '100%',
    borderStyle: 'groove',
    height: '43%',
  },
  detailsSection: {
    width: '100%',
    height: '60%',
    //borderStyle: 'groove'
  },
  headerDetails: {
    width: '50%',
    height: '10%',
    //borderStyle: 'groove',
    float: 'left'
  },
  bodyDetails: {
    width: '100%',
    height: '90%',
    //borderStyle: 'groove',
    float: 'left'
  },
  fabButton: {
    width: '48px',
    height: '48px',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ba0d0d',
    top: -595,
    margin: '0',
    right: 20,
    float: 'right',
    color: "#ffffff"
  },
  title: {
    width: '196px',
    height: '23px',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginRight: '60px',
    marginTop: '14px',
    marginBottom: '4px'
  },
  subtitle: {
    width: '194.4px',
    height: '16px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginRight: '91.6px',
    marginTop: '4px',
  },
  label: {
    width: '77px',
    height: '16px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '34px'
  },
  text: {
    width: '327px',
    height: '234px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '16px'
  },
  carruselImage: {
    height: '200px',
    objectFit: 'cover',
    width: '100%',
    maxWidth: '100%'
  }
}))

const InfoPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const [snackbarState, setSnackbarState] = useState({})
  const [lastNotification, setLastNotification] = useState()
  const [lastConsentChange, setLastConsentChange] = useState()
  const [currentUser] = useUser()
  const numbers = '["https://b122fe8e0b8ea4d16cb3-8420fc0ce05d0ddef095398ad3e98f10.ssl.cf5.rackcdn.com/hospital-trauma-mob.jpg", "https://d1lofqbqbj927c.cloudfront.net/monumental/2018/02/19141317/Calderon-Guardia-2.jpg"]'
  console.log("JSON.parse(numbers):", JSON.parse(numbers))
  return (
    <Box className={classes.cardBody}>
      <div className={classes.headerCardBody}>
        <div className={classes.avatarSection}>
          <img className={classes.avatarRound} src="https://static.vecteezy.com/system/resources/previews/001/194/392/non_2x/red-cross-png.png" alt="Avatar"></img>
        </div>
        <div className={classes.tituleSection}>
          <h2 className={classes.title}>Metropolitan Hospital</h2>
          <h3 className={classes.subtitle}>Hospital</h3>
        </div>
      </div>
      <div className={classes.bodyCard}>
        <div className={classes.imageSection}>
          <CarouselComponent images={JSON.parse(numbers)} />
        </div>
        <div className={classes.detailsSection}>
          <div className={classes.headerDetails}>
            <Button
              className={classes.label}
              startIcon={<LocationOnIcon color="action" />}
            >
              Location
            </Button>
          </div>
          <div className={classes.headerDetails}>
            <Button
              className={classes.label}
              startIcon={<CalendarTodayIcon color="action" />}
            >
              Schedule
            </Button>
          </div>
          <div className={classes.bodyDetails}>
            <p className={classes.text}>
              We’re very exited to participate in this awesome initiative and more intro text.
              Then more non-teaser text will continue here...
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Praesent fermentum nisi vitae vehicula convallis. Vestibulum ultrices quam massa.
              Curabitur a finibus est. Nulla volutpat odio quis efficitur faucibus.
              Quisque tincidunt hendrerit tellus, ac vestibulum massa ullamcorper a.
              Sed in metus eu urna euismod vulputate at sed quam. Nulla euismod feugiat est sit amet vulputate.
              Nullam egestas posuere accumsan. Fusce suscipit, ex rutrum commodo mattis,
              mi justo bibendum augue, id molestie metus magna in metus.
            </p>
          </div>
        </div>
      </div>
      <Fab className={classes.fabButton}>
        <FavoriteIcon className={classes.iconFab} />
      </Fab>
    </Box>
  )
}

export default InfoPage
