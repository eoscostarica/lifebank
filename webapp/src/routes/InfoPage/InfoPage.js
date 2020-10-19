import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider'
import Slider from '@material-ui/core/Slider'
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';

import MapShowOneLocation from '../../components/MapShowOneLocation'

const useStyles = makeStyles((theme) => ({
  cardBody: {
    width: '100%',
    height: '100%',
    marginBottom: '0',
    marginTop: '16px'
  },
  headerCardBody: {
    width: '100%',
    height: '12%'
  },
  avatarSection: {
    width: '20%',
    height: '100%',
    float: 'left'
  },
  avatarRound: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginLeft: '16px',
    marginRight: '13px',
    marginTop: '13px'
  },
  tituleSection: {
    width: '80%',
    height: '100%',
    float: 'left'
  },
  bodyCard: {
    width: '100%',
    height: '88%'
  },
  imageSection: {
    position: "relative",
    width: '100%',
    height: '35%'
  },
  detailsSection: {
    width: '100%',
    height: '65%'
  },
  headerDetails: {
    width: '50%',
    height: '10%',
    marginTop: '2%',
    float: 'left'
  },
  bodyDetails: {
    width: '100%',
    height: '88%',
    float: 'left'
  },
  fabButton: {
    position: "absolute",
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ba0d0d',
    top: -20,
    right: 15,
    margin: '0',
    color: "#ffffff",
    zIndex: 1
  },
  title: {
    width: '97%',
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
    marginLeft: '2%',
    marginTop: '14px',
    marginBottom: '4px',
  },
  subtitle: {
    width: '97%',
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
    marginLeft: '2%',
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
    height: '90%',
    marginTop: '-22px',
    width: '100%',
    maxWidth: '100%'
  },
  carousel: {
    maxWidth: '100%'
  },
  divider: {
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold'
  },
  bloodDemand: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  markLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontSize: 18
    }
  },
  slider: {
    padding: theme.spacing(0, 2)
  },
  midLabel: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  appBar: {
    position: 'sticky',
    height: '32px'
  },
  positionXIcon: {
    position: 'absolute',
    top: '-6px',
    right: '0px'
  },
  modal: {
    margin: theme.spacing(6)
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InfoPage = () => {
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)
  const images = '["https://b122fe8e0b8ea4d16cb3-8420fc0ce05d0ddef095398ad3e98f10.ssl.cf5.rackcdn.com/hospital-trauma-mob.jpg", "https://d1lofqbqbj927c.cloudfront.net/monumental/2018/02/19141317/Calderon-Guardia-2.jpg"]'
  const numbers = JSON.parse(images)
  const [open, setOpenModalLocation] = useState(false);
  const [openSchedule, setOpenModalSchedule] = useState(false);
  const location = useLocation()
  const [profile, setProfile] = useState()

  const handleClickOpen = () => {
    setOpenModalLocation(true);
  };

  const handleClose = () => {
    setOpenModalLocation(false);
  };
  const handleClickOpenSchedule = () => {
    setOpenModalSchedule(true);
  };

  const handleCloseSchedule = () => {
    setOpenModalSchedule(false);
  };

  useEffect(() => {
    location.state
      ? setProfile(location.state.profile)
      : setProfile(location.state.profile)
  }, [location])

  return (
    <>
      {profile &&
        <Box className={classes.cardBody}>
          <div className={classes.headerCardBody}>
            <div className={classes.avatarSection}>
              <img className={classes.avatarRound} src="https://static.vecteezy.com/system/resources/previews/001/194/392/non_2x/red-cross-png.png" alt="Avatar" />
            </div>
            <div className={classes.tituleSection}>
              <h2 className={classes.title}>{profile.info.name}</h2>
              <h3 className={classes.subtitle}>Hospital</h3>
            </div>
          </div>
          <div className={classes.bodyCard}>
            <div className={classes.imageSection}>
              <Carousel
                value={actualImageIndex}
                className={classes.carousel}
                onChange={(val) => setActualImageIndex(val)}
                plugins={[
                  'arrows',
                  {
                    resolve: slidesToShowPlugin,
                    options: {
                      numberOfSlides: 1
                    }
                  }
                ]}
              >
                {numbers.map((url, key) => (
                  <img className={classes.carruselImage} src={url} key={key} alt={`${key}`} />
                ))}
              </Carousel>
              <Fab className={classes.fabButton}>
                <FavoriteIcon className={classes.iconFab} />
              </Fab>
            </div>
            <div className={classes.detailsSection}>
              <div className={classes.headerDetails}>
                <Button
                  className={classes.label}
                  startIcon={<LocationOnIcon color="action" />}
                  onClick={handleClickOpen}
                >
                  Location
              </Button>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                  <div className={classes.appBar}>
                    <Toolbar>
                      <Typography variant="subtitle1">
                        Lifebank Location
                    </Typography>
                      <IconButton className={classes.positionXIcon} onClick={handleClose} aria-label="close">
                        <CloseIcon color="secondary" />
                      </IconButton>
                    </Toolbar>
                  </div>
                  <MapShowOneLocation
                    markerLocation={profile.info.geolocation}
                    accountProp={profile.account}
                    width="100%"
                    height="100%"
                    py={2}
                  />
                </Dialog>
              </div>
              <div className={classes.headerDetails}>
                <Button
                  className={classes.label}
                  startIcon={<CalendarTodayIcon color="action" />}
                  onClick={handleClickOpenSchedule}
                >
                  Schedule
              </Button>
                <Dialog fullScreen className={classes.modal} open={openSchedule} onClose={handleCloseSchedule} TransitionComponent={Transition}>
                  <div className={classes.appBar}>
                    <Toolbar>
                      <Typography variant="subtitle1">
                        Lifebank Schedule
                    </Typography>
                      <IconButton className={classes.positionXIcon} onClick={handleCloseSchedule} aria-label="close">
                        <CloseIcon color="secondary" />
                      </IconButton>
                    </Toolbar>
                  </div>
                  {JSON.parse(profile.info.schedule).length > 0 && JSON.parse(profile.info.schedule).map((schedule, index) => (
                    <ScheduleItem
                      key={index}
                      id={index}
                      schedule={schedule}
                    />
                  ))}
                </Dialog>
              </div>
              <div className={classes.bodyDetails}>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">Description</Typography>
                  <Typography variant="body1"> {profile.info.description}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">Address</Typography>
                  <Typography variant="body1">{profile.info.address}</Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">Email</Typography>
                  <Typography variant="body1">{profile.info.email}</Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">Telephone</Typography>
                  <Typography variant="body1">{profile.info.phone_number}</Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">Blood urgency level</Typography>
                  <Box className={classes.bloodDemand}>
                    <Box className={classes.markLabel}>
                      <Typography variant="body1" className={classes.midLabel}>Low</Typography>
                      <Typography variant="body1" className={classes.midLabel}>Medium</Typography>
                      <Typography variant="body1" className={classes.midLabel}>Urgent</Typography>
                    </Box>
                    <Box className={classes.slider}>
                      <Slider
                        valueLabelDisplay="off"
                        color="secondary"
                        defaultValue={profile.info.blood_urgency_level}
                        step={null}
                        min={1}
                        max={3}
                      />
                    </Box>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      }
    </>
  )
}

const ScheduleItem = (schedule) => {
  return (
    <List>
      <Divider />
      <ListItem button>
        <ListItemText primary={schedule.schedule.day} secondary={schedule.schedule.open + " - " + schedule.schedule.close} />
      </ListItem>
    </List>
  )
}

ScheduleItem.propTypes = {
  schedule: PropTypes.object
}

export default InfoPage
