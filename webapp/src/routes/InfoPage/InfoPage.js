import React, { useEffect, useState, forwardRef } from 'react'
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
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Slide from '@material-ui/core/Slide'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import { useParams } from 'react-router'

import { useUser } from '../../context/user.context'
import MapShowOneLocation from '../../components/MapShowOneLocation'
import { GET_LOCATION_PROFILE } from '../../gql'
import Nearby from '../../components/Nearby/Nerby'

const useStyles = makeStyles((theme) => ({
  contentBodyMobile: {
    width: '100%',
    backgroundColor: '#ffffff'
  },
  headerBodyMobile: {
    marginTop: '20px',
    marginBottom: '20px',
    position: 'relative',
    width: '100%',
    height: 'auto'
  },
  avatarRound: {
    width: '45px',
    height: '45px',
    marginLeft: 20
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
    top: 3,
    left: 80
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
    top: 28,
    left: 80
  },
  imageSection: {
    position: 'relative',
    width: '100%'
  },
  carousel: {
    maxWidth: '100%',
    height: '200px'
  },
  containerImageDefault: {
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsSection: {
    width: '100%',
    marginTop: '20px'
  },
  headerDetails: {
    width: '50%',
    marginBottom: '15px',
    float: 'left'
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
    height: '100%',
    width: '100%'
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
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(1)
    }
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
  contentBodyDesktop: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: '50px',
    paddingLeft: '20%',
    paddingRight: '20%',
    height: 'auto'
  },
  imageSectionDesktop: {
    width: '100%',
    height: '380px'
  },
  carouselDesktop: {
    height: '380px',
    borderRadius: '10px'
  },
  desktopContainerImageDefault: {
    width: '100%',
    height: '380px',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desktopImageDefault: {
    width: '50%',
    height: '50%',
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: '10px'
  },
  headerContentDesktop: {
    position: 'relative',
    width: '100%',
    paddingTop: '30px',
    paddingBottom: '25px'
  },
  avatarRoundDesktop: {
    width: '60px',
    height: '60px',
    position: 'absolute',
    top: 25,
    left: 10
  },
  titleDesktop: {
    width: '98%',
    height: '40px',
    fontFamily: 'Roboto',
    fontSize: '34px',
    fontWeight: 'bold',
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
    position: 'absolute',
    top: 20,
    right: 10,
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
  bodyContentDesktop: {
    display: 'flex',
    width: '100%',
    paddingTop: '25px',
    paddingBottom: '15px'
  },
  bodyContentMidLeft: {
    width: '50%',
    paddingRight: '20px'
  },
  bodyContentMidRigth: {
    width: '50%',
    paddingLeft: '20px'
  },
  mapStyle: {
    borderRadius: '50px'
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
  },
  socialIcon: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  bodyContentDesktopCards: {
    width: '100%',
    paddingTop: '25px',
    paddingBottom: '15px'
  },
  contentCards: {
    marginTop: '50px',
    width: '100%'
  }
}))
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const InfoPage = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)
  const [open, setOpenModalLocation] = useState(false)
  const [openSchedule, setOpenModalSchedule] = useState(false)
  const location = useLocation()
  const [, { logout }] = useUser()
  const history = useHistory()
  const [profile, setProfile] = useState()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })
  const { url } = useParams()

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

  const { error: errorInfoProfile, refetch: getInfoProfile } = useQuery(GET_LOCATION_PROFILE, {
    variables: {
      username: url
    },
    skip: true
  })

  const generateSchedule = (schedules) => {
    const scheduleFinal = []
    let schedule
    for (schedule of schedules) {
      if (scheduleFinal.length > 0) {
        let insert = 0
        scheduleFinal.forEach((element) => {
          if (
            schedule.open === element[1][0] &&
            schedule.close === element[1][1]
          ) {
            element[0] = `${element[0]}, ${schedule.day}`
            insert++
          }
        })
        if (insert === 0) {
          const tempaSchedule = [
            [schedule.day],
            [schedule.open, schedule.close]
          ]
          scheduleFinal.push(tempaSchedule)
        }
      } else {
        const tempaSchedule = [[schedule.day], [schedule.open, schedule.close]]
        scheduleFinal.push(tempaSchedule)
      }
    }

    return scheduleFinal
  }

  useEffect(() => {
    getInfo()

  }, [location])

  const getInfo = async () => {
    if (location.state) setProfile(location.state.profile)
    else {
      const getProfile = async () => {
        const { data } = await getInfoProfile({
          username: url.replaceAll("-", " ")
        })

        if (data.location.length > 0) {
          const objectTemp = data.location[0]
          if (objectTemp.type === "SPONSOR") {
            setProfile(
              {
                "account": objectTemp.account,
                "address": objectTemp.info.address,
                "benefitDescription": objectTemp.info.benefit_description,
                "businessType": objectTemp.info.business_type,
                "covidImpact": objectTemp.info.covid_impact,
                "description": objectTemp.info.about,
                "email": objectTemp.info.email,
                "location": JSON.stringify(objectTemp.info.geolocation),
                "logo": objectTemp.info.logo_url,
                "name": objectTemp.info.name,
                "openingHours": objectTemp.info.schedule,
                "photos": objectTemp.info.photos,
                "role": "sponsor",
                "social_media_links": objectTemp.info.social_media_links,
                "telephone": objectTemp.info.telephones,
                "userName": objectTemp.user.username,
                "website": objectTemp.info.website
              })
          } else {
            setProfile(
              {
                "account": objectTemp.account,
                "address": objectTemp.info.address,
                "description": objectTemp.info.about,
                "email": objectTemp.info.email,
                "location": JSON.stringify(objectTemp.info.geolocation),
                "logo": objectTemp.info.logo_url,
                "name": objectTemp.info.name,
                "openingHours": objectTemp.info.schedule,
                "photos": objectTemp.info.photos,
                "role": "lifebank",
                "urgencyLevel": objectTemp.info.blood_urgency_level,
                "telephone": objectTemp.info.telephones,
                "userName": objectTemp.user.username,
              })
          }

        } else history.push('/not-found')

      }

      if (!location.state) getProfile()

    }
    /*if (profile && profile.role === 'sponsor')
      profile.social_media_links = JSON.parse(
        profile.social_media_links
      )*/
  }

  useEffect(() => {
    if (errorInfoProfile) {
      if (errorInfoProfile.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        getInfo()
      } else {
        history.push('/internal-error')
      }
    }

  }, [errorInfoProfile])

  const MobileInfoPage = () => {
    return (
      <>
        {profile && (
          <Box className={classes.contentBodyMobile}>
            <Box className={classes.headerBodyMobile}>
              <Avatar
                className={classes.avatarRound}
                src={`//images.weserv.nl?url=${profile.logo || ''
                  }&h=300&dpr=2`}
                alt="Avatar"
              >
                {profile.role === 'sponsor' && <StorefrontIcon />}
                {profile.role === 'lifebank' && <LocalHospitalIcon />}
              </Avatar>
              <Typography className={classes.title} noWrap>
                {profile.name}
              </Typography>
              <Typography className={classes.subtitle} noWrap>
                {profile.role === 'sponsor' && profile.businessType}
                {profile.role === 'lifebank' &&
                  t('miscellaneous.donationCenter')}
              </Typography>
            </Box>
            <Box className={classes.imageSection}>
              {JSON.parse(profile.photos).length > 0 && (
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
                  {JSON.parse(profile.photos).map((url, key) => (
                    <img
                      className={classes.carruselImage}
                      src={url}
                      key={key}
                      alt={`${key}`}
                    />
                  ))}
                </Carousel>
              )}
              {profile.role === 'sponsor' &&
                JSON.parse(profile.photos).length === 0 && (
                  <Box className={classes.containerImageDefault}>
                    <StorefrontIcon className={classes.desktopImageDefault} />
                  </Box>
                )}
              {profile.role === 'lifebank' &&
                JSON.parse(profile.photos).length === 0 && (
                  <Box className={classes.containerImageDefault}>
                    <LocalHospitalIcon
                      className={classes.desktopImageDefault}
                    />
                  </Box>
                )}
              <Fab className={classes.fabButton}>
                <FavoriteIcon className={classes.iconFab} />
              </Fab>
            </Box>
            <Box className={classes.detailsSection}>
              <Box className={classes.headerDetails}>
                <Button
                  className={classes.label}
                  startIcon={<LocationOnIcon color="action" />}
                  onClick={handleClickOpen}
                >
                  {t('miscellaneous.location')}
                </Button>
                <Dialog
                  fullScreen
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Transition}
                >
                  <Box className={classes.appBar}>
                    <Toolbar>
                      <Typography variant="subtitle1">
                        {t('miscellaneous.location')}
                      </Typography>
                      <IconButton
                        className={classes.positionXIcon}
                        onClick={handleClose}
                        aria-label="close"
                      >
                        <CloseIcon color="secondary" />
                      </IconButton>
                    </Toolbar>
                  </Box>
                  <MapShowOneLocation
                    markerLocation={JSON.parse(profile.location)}
                    accountProp={profile.account}
                    width="100%"
                    height="100%"
                    py={2}
                  />
                </Dialog>
              </Box>
              <Box className={classes.headerDetails}>
                <Button
                  className={classes.label}
                  startIcon={<CalendarTodayIcon color="action" />}
                  onClick={handleClickOpenSchedule}
                >
                  {t('common.schedule')}
                </Button>
                <Dialog
                  fullScreen
                  className={classes.modal}
                  open={openSchedule}
                  onClose={handleCloseSchedule}
                  TransitionComponent={Transition}
                >
                  <Box className={classes.appBar}>
                    <Toolbar>
                      <Typography variant="subtitle1">
                        {t('common.schedule')}
                      </Typography>
                      <IconButton
                        className={classes.positionXIcon}
                        onClick={handleCloseSchedule}
                        aria-label="close"
                      >
                        <CloseIcon color="secondary" />
                      </IconButton>
                    </Toolbar>
                  </Box>
                  {JSON.parse(profile.openingHours).length > 0 &&
                    JSON.parse(profile.openingHours).map((schedule, index) => (
                      <ScheduleItem
                        key={index}
                        id={index}
                        schedule={schedule}
                      />
                    ))}
                </Dialog>
              </Box>
              <Box className={classes.bodyDetails}>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('signup.about')}
                  </Typography>
                  <Typography className={classes.text} variant="body1">
                    {' '}
                    {profile.description}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('signup.address')}
                  </Typography>
                  <Typography className={classes.text} variant="body1">
                    {profile.address}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('common.email')}
                  </Typography>
                  <Typography className={classes.text} variant="body1">
                    {profile.email}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('common.telephone')}
                  </Typography>
                  {JSON.parse(profile.telephone).length > 0 &&
                    JSON.parse(profile.telephone).map(
                      (phoneNumber, index) => (
                        <Typography
                          style={{ marginTop: '4px' }}
                          key={index}
                          className={classes.text}
                          variant="body1"
                        >
                          {phoneNumber}
                        </Typography>
                      )
                    )}
                </Box>
                <Divider className={classes.divider} />
                {profile.role === 'sponsor' && JSON.parse(profile.social_media_links).length > 0 && (
                  <Box
                    className={classes.midLabel}
                  >
                    <Typography
                      className={classes.boldText}
                      variant="subtitle1"
                    >
                      {t('profile.socialMedia')}
                    </Typography>
                    {Array.isArray(
                      JSON.parse(profile.social_media_links)
                    ) &&
                      JSON.parse(profile.social_media_links).map(
                        (item, index) => (
                          <IconButton
                            key={index}
                            aria-label={`${item.name}-icon-button`}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.name === 'facebook' && (
                              <FacebookIcon className={classes.socialIcon} />
                            )}
                            {item.name === 'twitter' && (
                              <TwitterIcon className={classes.socialIcon} />
                            )}
                            {item.name === 'instagram' && (
                              <InstagramIcon className={classes.socialIcon} />
                            )}
                          </IconButton>
                        )
                      )}
                  </Box>
                )}
                {profile.role === 'lifebank' && (
                  <Box className={classes.midLabel}>
                    <Typography
                      className={classes.boldText}
                      variant="subtitle1"
                    >
                      {t('common.bloodUrgency')}
                    </Typography>
                    <Box className={classes.bloodDemand}>
                      <Box className={classes.markLabel}>
                        <Typography
                          variant="body1"
                          className={`${classes.midLabel} ${classes.text}`}
                        >
                          {t('editProfile.low')}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={`${classes.midLabel} ${classes.text}`}
                        >
                          {t('editProfile.medium')}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={`${classes.midLabel} ${classes.text}`}
                        >
                          {t('editProfile.high')}
                        </Typography>
                      </Box>
                      <Box className={classes.slider}>
                        <Slider
                          valueLabelDisplay="off"
                          color="secondary"
                          defaultValue={profile.urgencyLevel}
                          step={null}
                          min={1}
                          max={3}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </>
    )
  }
  const DesktopInfoPage = () => {
    return (
      <>
        {profile && (
          <Box className={classes.contentBodyDesktop}>
            <Box className={classes.imageSectionDesktop}>
              {JSON.parse(profile.photos).length > 0 && (
                <Carousel
                  value={actualImageIndex}
                  className={classes.carouselDesktop}
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
                  {JSON.parse(profile.photos).map((url, key) => (
                    <img
                      className={classes.carruselImage}
                      src={`//images.weserv.nl?url=${url}&h=300&dpr=2`}
                      key={key}
                      alt={`${key}`}
                    />
                  ))}
                </Carousel>
              )}
              {profile.role === 'sponsor' &&
                JSON.parse(profile.photos).length === 0 && (
                  <Box className={classes.desktopContainerImageDefault}>
                    <StorefrontIcon className={classes.desktopImageDefault} />
                  </Box>
                )}
              {profile.role === 'lifebank' &&
                JSON.parse(profile.photos).length === 0 && (
                  <Box className={classes.desktopContainerImageDefault}>
                    <LocalHospitalIcon
                      className={classes.desktopImageDefault}
                    />
                  </Box>
                )}
            </Box>
            <Box className={classes.headerContentDesktop}>
              <Avatar
                className={classes.avatarRoundDesktop}
                src={`//images.weserv.nl?url=${profile.logo_url || ''
                  }&h=300&dpr=2`}
                alt="Avatar"
              >
                {profile.role === 'sponsor' && <StorefrontIcon />}
                {profile.role === 'lifebank' && <LocalHospitalIcon />}
              </Avatar>
              <Typography className={classes.titleDesktop} noWrap>
                {profile.name}
              </Typography>
              <Typography className={classes.subtitleDesktop} noWrap>
                {profile.role === 'sponsor' && profile.businessType}
                {profile.role === 'lifebank' &&
                  t('miscellaneous.donationCenter')}
              </Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.bodyContentDesktop}>
              <Box className={classes.bodyContentMidLeft}>
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('signup.about')}
                  </Typography>
                  <Typography className={classes.text} variant="body1">
                    {' '}
                    {profile.about}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('common.schedule')}
                  </Typography>
                  {JSON.parse(profile.openingHours).length > 0 &&
                    generateSchedule(
                      JSON.parse(profile.openingHours)
                    ).map((schedule, index) => (
                      <Typography
                        key={index}
                        className={classes.text}
                        id={index}
                        variant="body1"
                      >{`${schedule[0]} from ${schedule[1][0]} to ${schedule[1][1]}`}</Typography>
                    ))}
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('signup.address')}
                  </Typography>
                  <Typography className={classes.text} variant="body1">
                    {profile.address}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('common.email')}
                  </Typography>
                  <Typography className={classes.text} variant="body1">
                    {profile.email}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('common.telephone')}
                  </Typography>
                  {JSON.parse(profile.telephone).length > 0 &&
                    JSON.parse(profile.telephone).map(
                      (phoneNumber, index) => (
                        <Typography
                          style={{ marginTop: '4px' }}
                          key={index}
                          className={classes.text}
                          variant="body1"
                        >
                          {phoneNumber}
                        </Typography>
                      )
                    )}
                </Box>

                {profile.role === 'lifebank' && (
                  <Box className={classes.midLabel}>
                    <Divider className={classes.divider} />
                    <Typography
                      className={classes.boldText}
                      variant="subtitle1"
                    >
                      {t('common.bloodUrgency')}
                    </Typography>
                    <Box className={classes.bloodDemand}>
                      <Box className={classes.markLabel}>
                        <Typography
                          variant="body1"
                          className={`${classes.midLabel} ${classes.text}`}
                        >
                          {t('editProfile.low')}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={`${classes.midLabel} ${classes.text}`}
                        >
                          {t('editProfile.medium')}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={`${classes.midLabel} ${classes.text}`}
                        >
                          {t('editProfile.high')}
                        </Typography>
                      </Box>
                      <Box className={classes.slider}>
                        <Slider
                          valueLabelDisplay="off"
                          color="secondary"
                          defaultValue={profile.urgencyLevel}
                          step={null}
                          min={1}
                          max={3}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
                {profile.role === 'sponsor' && JSON.parse(profile.social_media_links).length > 0 && (
                  <Box className={classes.midLabel}>
                    <Divider className={classes.divider} />
                    <Typography
                      className={classes.boldText}
                      variant="subtitle1"
                    >
                      {t('profile.socialMedia')}
                    </Typography>
                    {Array.isArray(
                      JSON.parse(profile.social_media_links)
                    ) &&
                      JSON.parse(profile.social_media_links).map(
                        (item, index) => (
                          <IconButton
                            key={index}
                            aria-label={`${item.name}-icon-button`}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.name === 'facebook' && (
                              <FacebookIcon className={classes.socialIcon} />
                            )}
                            {item.name === 'twitter' && (
                              <TwitterIcon className={classes.socialIcon} />
                            )}
                            {item.name === 'instagram' && (
                              <InstagramIcon className={classes.socialIcon} />
                            )}
                          </IconButton>
                        )
                      )}
                  </Box>
                )}
              </Box>
              <Box className={classes.bodyContentMidRigth}>
                <MapShowOneLocation
                  markerLocation={JSON.parse(profile.location)}
                  accountProp={profile.account}
                  width="100%"
                  height="70%"
                />
              </Box>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.bodyContentDesktopCards}>
              <Typography
                className={classes.boldText}
                variant="subtitle1"
              >{`${t('common.near')}  ${profile.name}`}</Typography>
              <Box className={classes.contentCards}>
                <Nearby
                  location={profile.location}
                  searchDistance={1000}
                  account={profile.username}
                />
              </Box>
            </Box>
          </Box>
        )}
      </>
    )
  }

  const ScheduleItem = (schedule) => {
    return (
      <List>
        <Divider />
        <ListItem button>
          <ListItemText
            primary={schedule.schedule.day}
            secondary={`${schedule.schedule.open} - ${schedule.schedule.close}`}
          />
        </ListItem>
      </List>
    )
  }

  ScheduleItem.propTypes = {
    schedule: PropTypes.object
  }

  return (
    <>
      {!isDesktop && <MobileInfoPage />}
      {isDesktop && <DesktopInfoPage />}
    </>
  )
}

export default InfoPage
