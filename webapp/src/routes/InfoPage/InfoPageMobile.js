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
import styles from './styles'

const useStyles = makeStyles(styles)

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
    if (profile) {
      if (profile.role === 'sponsor') {
        setLoadingOffers(true)
        await getAllOffers()
        await getSponsorID()
      }
    }
  }

  const { error: errorUsername, data: sponsor_id, refetch: getSponsorID } = useQuery(GET_ID, {
    variables: {
      username: url
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
        if (data) {
          if (data.location.length > 0) {
            const objectTemp = data.location[0]
            if (objectTemp.type === "SPONSOR") {
              setProfile(
                {
                  "account": objectTemp.account,
                  "address": objectTemp.info.address,
                  "businessType": objectTemp.info.business_type,
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
    if (profile) {
      if (profile.role === 'sponsor') {
        getOffers()
      }
    }
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
        if (profile) {
          if (profile.role === 'sponsor') {
            getOffers()
          }
        }
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
            {profile.role === 'sponsor' && (
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
            )}
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
              {profile.role === 'lifebank' && (
                <Box className={classes.midLabel}>
                  <Typography className={classes.boldText} variant="subtitle1">
                    {t('signup.requirement')}
                  </Typography>
                  <Typography
                    style={{ marginTop: '4px' }}
                    className={classes.text}
                    variant="body1"
                  >
                    {profile.requirement.replaceAll('\n', ', ')}
                  </Typography>
                </Box>
              )}
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
