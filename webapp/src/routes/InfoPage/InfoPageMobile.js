import React, { useEffect, useState, forwardRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Divider from '@material-ui/core/Divider'
import Slider from '@material-ui/core/Slider'
import Dialog from '@material-ui/core/Dialog'
import Toolbar from '@material-ui/core/Toolbar'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
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
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import { useParams } from 'react-router'
import Grid from '@material-ui/core/Grid'

import { useUser } from '../../context/user.context'
import MapShowOneLocation from '../../components/MapShowOneLocation'
import { GET_LOCATION_PROFILE, GET_ID, GET_OFFER_BY_SPONSOR_QUERY } from '../../gql'
import ShowOffersMobile from '../../components/ShowElements/ShowOffersMobile'

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
  headerDetailsOffers: {
    marginTop: '15px',
    width: '85%',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: '32px',
  },
  positionXIcon: {
    position: 'absolute',
    top: '-6px',
    right: '0px'
  },
  modal: {
    margin: theme.spacing(6)
  },
  offerContainer: {
    width: "100%",
    margin: 20,
    backgroundColor: '#000000'
  },
  mainGridMobile: {
    paddingTop: 39,
    backgroundColor: '#ffffff'
  }
}))
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const InfoPageMobile = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)
  const [open, setOpenModalLocation] = useState(false)
  const [openSchedule, setOpenModalSchedule] = useState(false)
  const [openOffers, setOpenModalOffers] = useState(false)
  const location = useLocation()
  const [, { logout }] = useUser()
  const history = useHistory()
  const [profile, setProfile] = useState()
  const { url } = useParams()
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [sponsorID, setSponsorID] = useState()

  const handleClickOpen = () => {
    setOpenModalLocation(true)
  }

  const handleClose = () => {
    setOpenModalLocation(false)
  }
  const handleClickOpenSchedule = () => {
    setOpenModalSchedule(true)
  }

  const handleClickOpenOffers = () => {
    setOpenModalOffers(true)
  }

  const handleCloseSchedule = () => {
    setOpenModalSchedule(false)
  }

  const handleCloseOffers = () => {
    setOpenModalOffers(false)
  }

  const { error: errorInfoProfile, refetch: getInfoProfile } = useQuery(GET_LOCATION_PROFILE, {
    variables: {
      username: url
    },
    skip: true
  })

  useEffect(() => {
    getInfo()

  }, [location])

  const getOffers = async () => {
    setLoadingOffers(true)
    await getAllOffers()
    await getSponsorID()
  }

  const { error: errorUsername, data: sponsor_id, refetch: getSponsorID } = useQuery(GET_ID, {
    variables: {
      account: location.state.profile.account
    }
  })

  const {
    loading: loadingDataOffer,
    error: allOffersError,
    data: allOffers,
    refetch: getAllOffers
  } = useQuery(GET_OFFER_BY_SPONSOR_QUERY, {
    variables: { active: true, sponsor_id: sponsorID },
    fetchPolicy: 'cache-and-network'
  })

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
  }

  useEffect(() => {
    if (!loadingDataOffer) {
      const dataOffers = allOffers.offer
      setOffers(dataOffers)
      setLoadingOffers(false)
    }
  }, [allOffers])

  useEffect(() => {

    if (sponsor_id) {
      const sponsor = sponsor_id.user[0]
      setSponsorID(sponsor.id)
    }
  }, [sponsor_id])

  useEffect(() => {
    getInfo()
    getOffers()
  }, [location])

  useEffect(() => {
    if (errorUsername && errorInfoProfile) {
      if (errorUsername.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push(`/info/${location.state.profile.account}`)
      } else history.push('/internal-error')
    }
    if (errorUsername && errorInfoProfile) {
      if (errorUsername.message === 'GraphQL error: Could not verify JWT: JWTExpired'
        && errorUsername.message === 'Error: GraphQL error: expected a value for non-nullable variable') {
        getInfo()
        getOffers()
        logout()
        history.push(`/info/${location.state.profile.account}`)
      } else history.push('/internal-error')
    }
  }, [errorUsername, errorInfoProfile, allOffersError])

  const ScheduleItem = (schedule) => {
    return (
      <List>
        <Divider />
        <ListItem button>
          <ListItemText
            primary={`${t(`schedule.${schedule.schedule.day.toLowerCase()}`)}`}
            secondary={`${schedule.schedule.open} - ${schedule.schedule.close}`}
          />
        </ListItem>
      </List>
    )
  }

  return (
    <>
      {profile && (
        <Box className={classes.contentBodyMobile}>
          <Box className={classes.headerBodyMobile}>
            <Avatar
              className={classes.avatarRound}
              src={`//images.weserv.nl?url=${profile.logo || ''
                }&h=60&dpr=1`}
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
            <Divider className={classes.divider} />
            <Box className={classes.headerDetailsOffers}>
              <Button
                className={classes.label}
                startIcon={<LocalOfferIcon color="action" />}
                onClick={handleClickOpenOffers}
              >
                {t('common.offers')}
              </Button>
              <Dialog
                fullScreen
                className={classes.modal}
                open={openOffers}
                onClose={handleCloseOffers}
                TransitionComponent={Transition}
              >
                <Box className={classes.appBar}>
                  <Toolbar>
                    <IconButton
                      className={classes.positionXIcon}
                      onClick={handleCloseOffers}
                      aria-label="close"
                    >
                      <CloseIcon color="secondary" />
                    </IconButton>
                  </Toolbar>
                </Box>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  spacing={0}
                  className={classes.mainGridDesktop}
                  md={12}
                  xl={10}
                >
                  <Grid item md={12}>
                    <Typography variant="subtitle1" className={classes.boldText}>
                      {t('offerView.lifebankOffers')}
                    </Typography>

                  </Grid>
                  <ShowOffersMobile
                    className={classes.offerContainer}
                    offers={offers}
                    loading={loadingOffers}
                  />
                </Grid>
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

export default InfoPageMobile
