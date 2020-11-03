import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Divider from '@material-ui/core/Divider'
import Slider from '@material-ui/core/Slider'
import Dialog from '@material-ui/core/Dialog'
import Toolbar from '@material-ui/core/Toolbar'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Slide from '@material-ui/core/Slide'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'

import MapShowOneLocation from '../../components/MapShowOneLocation'
import { GET_LOCATION_PROFILE } from '../../gql'

const useStyles = makeStyles((theme) => ({
  cardBody: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginBottom: '0',
    paddingTop: '16px'
  },
  headerCardBody: {
    width: '100%',
    position: "relative"
  },
  avatarRound: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '10px'
  },
  bodyCard: {
    width: '100%',
  },
  imageSection: {
    position: 'relative',
    width: '100%'
  },
  detailsSection: {
    width: '100%'
  },
  headerDetails: {
    width: '50%',
    marginBottom: '15px',
    float: 'left',
  },
  bodyDetails: {
    width: '100%'
  },
  fabButton: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    boxShadow:
      '0 2px 6px 0 rgba(0, 0, 0, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ba0d0d',
    top: -20,
    right: 15,
    margin: '0',
    color: '#ffffff',
    zIndex: 1
  },
  title: {
    width: '75%',
    height: '25px',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
    position: 'absolute',
    top: 10,
    left: 65
  },
  subtitle: {
    width: '75%',
    height: '20px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 35,
    left: 65
  },
  label: {
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
  carruselImage: {
    height: '90%',
    marginTop: '-22px',
    width: '100%',
    maxWidth: '100%'
  },
  carousel: {
    maxWidth: '100%',
    height: '100%'
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
  },
  cardBodyDesktop: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginBottom: '0',
    padding: '2%'
  },
  contentBodySection: {
    width: '50%',
    height: '100%',
    float: 'left'
  },
  headerContent: {
    width: '100%',
    height: '10%'
  },
  avatarSectionDesktop: {
    width: '10%',
    height: '100%',
    float: 'left'
  },
  tituleSectionDesktop: {
    width: '63%',
    height: '100%',
    float: 'left'
  },
  titleDesktop: {
    width: '98%',
    height: '40px',
    fontFamily: 'Roboto',
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.18',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginLeft: '10px',
    marginTop: '10px',
    marginBottom: '4px',
    textAlign: 'center'
  },
  subtitleDesktop: {
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '10px',
    paddingTop: '26px'

  },
  subTituleSectionDesktop: {
    width: '27%',
    height: '100%',
    float: 'left'
  },
  avatarRoundDesktop: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginTop: '10px',
    marginLeft: '14%'
  },
  bodyDetailsDesktop: {
    width: '100%',
    float: 'left'
  },
  imageSectionDesktop: {
    position: "relative",
    width: '98%',
    height: '35%',
    paddingLeft: '2%'
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const InfoPage = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)
  const [open, setOpenModalLocation] = useState(false)
  const [openSchedule, setOpenModalSchedule] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const [profile, setProfile] = useState()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  })

  const handleClickOpen = () => {
    setOpenModalLocation(true)
  }

  const handleClose = () => {
    setOpenModalLocation(false)
  }
  const handleClickOpenSchedule = () => {
    setOpenModalSchedule(true)
  }

  const handleCloseSchedule = () => {
    setOpenModalSchedule(false)
  }

  const { refetch: getData } = useQuery(GET_LOCATION_PROFILE, {
    variables: {
      username: window.location.pathname.slice(
        6,
        window.location.pathname.length
      )
    },
    skip: true
  })

  const generateSchedule = (schedules) => {
    const scheduleFinal = []
    var schedule;
    for (schedule of schedules) {
      if (scheduleFinal.length > 0) {
        let insert = 0
        scheduleFinal.forEach(element => {
          if (schedule.open === element[1][0] && schedule.close === element[1][1]) {
            element[0] = `${element[0]}, ${schedule.day}`
            insert++
          }
        }
        );
        if (insert === 0) {
          const tempaSchedule = [[schedule.day], [schedule.open, schedule.close]]
          scheduleFinal.push(tempaSchedule)
        }
      }
      else {
        const tempaSchedule = [[schedule.day], [schedule.open, schedule.close]]
        scheduleFinal.push(tempaSchedule)
      }
    }

    return scheduleFinal
  }

  useEffect(() => {
    if (location.state) setProfile(location.state.profile)
    else {
      const getProfile = async () => {
        const { data } = await getData({
          username: window.location.pathname.slice(
            6,
            window.location.pathname.length
          )
        })

        data.location.length > 0
          ? setProfile(data.location[0])
          : history.push('/not-found')
      }

      if (!location.state) getProfile()
    }
  }, [location])

  const MovileInfoPage = () => {
    return (
      <>
        {profile &&
          <Box className={classes.cardBody}>
            <div className={classes.headerCardBody}>
              <img className={classes.avatarRound} src={profile.info.logo_url} alt="Avatar" />
              <Typography className={classes.title} noWrap >{profile.info.name}</Typography>
              <Typography className={classes.subtitle} noWrap >Hospital</Typography>
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
                  {JSON.parse(profile.info.photos).map((url, key) => (
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
                    {t('common.schedule')}
                  </Button>
                  <Dialog fullScreen className={classes.modal} open={openSchedule} onClose={handleCloseSchedule} TransitionComponent={Transition}>
                    <div className={classes.appBar}>
                      <Toolbar>
                        <Typography variant="subtitle1">
                          {t('miscellaneous.lifebankSchedule')}
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
                    <Typography className={classes.boldText} variant="subtitle1">{t('signup.about')}</Typography>
                    <Typography className={classes.text} variant="body1"> {profile.info.about}
                    </Typography>
                  </Box>
                  <Divider className={classes.divider} />
                  <Box className={classes.midLabel}>
                    <Typography className={classes.boldText} variant="subtitle1">{t('signup.address')}</Typography>
                    <Typography className={classes.text} variant="body1">{profile.info.address}</Typography>
                  </Box>
                  <Divider className={classes.divider} />
                  <Box className={classes.midLabel}>
                    <Typography className={classes.boldText} variant="subtitle1">{t('common.email')}</Typography>
                    <Typography className={classes.text} variant="body1">{profile.info.email}</Typography>
                  </Box>
                  <Divider className={classes.divider} />
                  <Box className={classes.midLabel}>
                    <Typography className={classes.boldText} variant="subtitle1">{t('common.telephone')}</Typography>
                    {JSON.parse(profile.info.telephones).length > 0 && JSON.parse(profile.info.telephones).map((phoneNumber, index) => (
                      <Typography style={{ marginTop: '4px' }} key={index} className={classes.text} variant="body1">{phoneNumber}</Typography>
                    ))}
                  </Box>
                  <Divider className={classes.divider} />
                  <Box className={classes.midLabel}>
                    <Typography className={classes.boldText} variant="subtitle1">{t('common.bloodUrgency')}</Typography>
                    <Box className={classes.bloodDemand}>
                      <Box className={classes.markLabel}>
                        <Typography variant="body1" className={`${classes.midLabel} ${classes.text}`}>{t('editProfile.low')}</Typography>
                        <Typography variant="body1" className={`${classes.midLabel} ${classes.text}`}>{t('editProfile.medium')}</Typography>
                        <Typography variant="body1" className={`${classes.midLabel} ${classes.text}`}>{t('editProfile.high')}</Typography>
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

  const DesktopInfoPage = () => {
    return (
      <>
        {profile &&
          <Box className={classes.cardBodyDesktop}>
            <div className={classes.contentBodySection}>
              <div className={classes.headerContent}>
                <div className={classes.avatarSectionDesktop}>
                  <img className={classes.avatarRoundDesktop} src="https://static.vecteezy.com/system/resources/previews/001/194/392/non_2x/red-cross-png.png" alt="Avatar" />
                </div>
                <div className={classes.tituleSectionDesktop}>
                  <Typography className={classes.titleDesktop} noWrap>{profile.info.name}</Typography>
                </div>
                <div className={classes.subTituleSectionDesktop}>
                  <Typography className={classes.subtitleDesktop} noWrap>Hospital</Typography>
                </div>
              </div>
              <div className={classes.bodyDetailsDesktop}>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">{t('signup.about')}</Typography>
                  <Typography className={classes.text} variant="body1"> {profile.info.about}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">{t('common.schedule')}</Typography>
                  {JSON.parse(profile.info.schedule).length > 0 && generateSchedule(JSON.parse(profile.info.schedule)).map((schedule, index) => (
                    <Typography key={index} className={classes.text} id={index} variant="body1">{`${schedule[0]} from ${schedule[1][0]} to ${schedule[1][1]}`}</Typography>
                  ))}
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">{t('signup.address')}</Typography>
                  <Typography className={classes.text} variant="body1">{profile.info.address}</Typography>
                </Box>
                <Box className={classes.midLabel}>
                  <Button
                    className={`${classes.label} ${classes.boldText}`}
                    startIcon={<LocationOnIcon color="action" />}
                    onClick={handleClickOpen}
                  >
                    {t('miscellaneous.showLocation')}
                  </Button>
                  <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <div className={classes.appBar}>
                      <Toolbar>
                        <Typography variant="subtitle1">
                          {t('miscellaneous.lifebankLocation')}
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
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">{t('common.email')}</Typography>
                  <Typography className={classes.text} variant="body1">{profile.info.email}</Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">{t('common.telephone')}</Typography>
                  {JSON.parse(profile.info.telephones).length > 0 && JSON.parse(profile.info.telephones).map((phoneNumber, index) => (
                    <Typography style={{ marginTop: '4px' }} key={index} className={classes.text} variant="body1">{phoneNumber}</Typography>
                  ))}
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">{t('common.bloodUrgency')}</Typography>
                  <Box className={classes.bloodDemand}>
                    <Box className={classes.markLabel}>
                      <Typography variant="body1" className={`${classes.midLabel} ${classes.text}`}>{t('editProfile.low')}</Typography>
                      <Typography variant="body1" className={`${classes.midLabel} ${classes.text}`}>{t('editProfile.medium')}</Typography>
                      <Typography variant="body1" className={`${classes.midLabel} ${classes.text}`}>{t('editProfile.high')}</Typography>
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
            <div className={classes.contentBodySection}>
              <div className={classes.imageSectionDesktop}>
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
                  {JSON.parse(profile.info.photos).map((url, key) => (
                    <img className={classes.carruselImage} src={url} key={key} alt={`${key}`} />
                  ))}
                </Carousel>
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
          <ListItemText primary={schedule.schedule.day} secondary={`${schedule.schedule.open} - ${schedule.schedule.close}`} />
        </ListItem>
      </List>
    )
  }

  ScheduleItem.propTypes = {
    schedule: PropTypes.object
  }

  return (
    <>
      {!isDesktop &&
        <MovileInfoPage />
      }
      {isDesktop &&
        <DesktopInfoPage />
      }
    </>
  )

}

export default InfoPage
