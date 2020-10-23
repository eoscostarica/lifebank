import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import EventBusyIcon from '@material-ui/icons/EventBusy'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import BallotIcon from '@material-ui/icons/Ballot'
import LocationOffIcon from '@material-ui/icons/LocationOff'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import ReceiptIcon from '@material-ui/icons/Receipt'
import StyleIcon from '@material-ui/icons/Style'
import * as m from 'moment-timezone'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import CarouselComponent from '../../components/Carousel'

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  },
  content: {
    maxWidth: '100%',
    margin: 'auto',
    marginTop: theme.spacing(3)
  },
  carouselComponent: {
    justifyContent: 'center',
    justifySelf: 'center'
  },
  descriptionContainer: {
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(3)
  }
}))

const OfferDetails = ({ offer, open, setOpen }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const timezone = moment.tz.guess()

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h1" className={classes.title}>
            {t('offersManagement.offerDetails')}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} className={classes.content}>
        <Grid item xs={12}>
          <Grid
            item
            className={classes.descriptionContainer}
            xs={12}
            sm={8}
            md={6}
            lg={4}
          >
            <Paper elevation={0} variant="outlined" className={classes.paper}>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                {t('common.description')}
              </Typography>
              <Typography variant="body1">{offer.description}</Typography>
            </Paper>
          </Grid>
          <List>
            {offer.start_date && (
              <ListItem>
                <ListItemIcon>
                  <EventAvailableIcon color="secondary" />
                </ListItemIcon>
                <ListItemText>
                  <strong>Start date: </strong>
                  {m(offer.start_date)
                    .tz(timezone)
                    .format('DD MMMM YYYY, h:mm:ss a z')}
                </ListItemText>
              </ListItem>
            )}
            {offer.end_date && (
              <ListItem>
                <ListItemIcon>
                  <EventBusyIcon color="secondary" />
                </ListItemIcon>
                <ListItemText>
                  <strong>{t('offersManagement.endDate')}: </strong>
                  {m(offer.end_date)
                    .tz(timezone)
                    .format('DD MMMM YYYY, h:mm:ss a z')}
                </ListItemText>
              </ListItem>
            )}
            <ListItem>
              <ListItemIcon>
                <ReceiptIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <strong>{t('offersManagement.offerType')}: </strong>{' '}
                {offer.offer_type}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StyleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <strong>{t('offersManagement.costInTokens')}: </strong>{' '}
                {offer.cost_in_tokens}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BallotIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <strong>{t('offersManagement.quantity')}: </strong>{' '}
                {offer.quantity}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {offer.online_only ? (
                  <LocationOffIcon color="secondary" />
                ) : (
                    <LocationOnIcon color="secondary" />
                  )}
              </ListItemIcon>
              <ListItemText>
                {offer.online_only
                  ? t('offersManagement.onlineOnly')
                  : t('offersManagement.physicalLocation')}
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            className={classes.carouselComponent}
          >
            <CarouselComponent
              images={
                typeof offer.images === 'string'
                  ? JSON.parse(offer.images)
                  : offer.images
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  )
}

OfferDetails.propTypes = {
  offer: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func
}

export default OfferDetails
