import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Link as LinkRouter, useHistory, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import QRCode from 'qrcode.react'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import { useTranslation } from 'react-i18next'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Avatar from '@material-ui/core/Avatar'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import MobileStepper from '@material-ui/core/MobileStepper'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import Snackbar from '@material-ui/core/Snackbar'
import Grid from '@material-ui/core/Grid'

import ShowOffersDesktop from '../../components/ShowElements/ShowOffersDesktop'
import { useUser } from '../../context/user.context'
import MapShowOneLocation from '../../components/MapShowOneLocation'
import ViewSchedule from '../../components/ViewSchedule'
import { GET_USERNAME, GET_SPONSOR_OFFERS_QUERY } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const ProfilePageSponsor = ({ profile }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [userName, setuserName] = useState()
  const [pendingFields, setPendingFields] = useState()
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const history = useHistory()
  const [, { logout }] = useUser()
  const images = profile.photos ? JSON.parse(profile.photos) : {}
  const socialMedia = profile.social_media_links ? JSON.parse(profile.social_media_links) : {}
  const phones = profile.telephones ? JSON.parse(profile.telephones) : {}
  const location = useLocation()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [activeOffers, setActiveOffers] = useState([])
  const [inactiveOffers, setInactiveOffers] = useState([])


  const [state, setState] = useState({
    bottom: false
  })

  const {
    loading: loadingDataOffer,
    error: allOffersError,
    data: allOffers,
    refetch: getAllOffers
  } = useQuery(GET_SPONSOR_OFFERS_QUERY, {
    variables: { sponsor_id: profile.id },
    fetchPolicy: 'cache-and-network'
  })

  const getOffers = async () => {
    setLoadingOffers(true)
    await getAllOffers()
  }

  const { error: errorUsername, refetch: getData } = useQuery(GET_USERNAME, {
    variables: {
      account: profile.account
    },
    skip: true
  })

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return

    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      )
        return

      setState({ ...state, [anchor]: open })
    }
  }

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  useEffect(() => {
    getOffers()
  }, [])

  useEffect(() => {
    if (!loadingDataOffer) {
      const dataOffers = allOffers.offer
      setOffers(dataOffers)
      setLoadingOffers(false)
    }
  }, [allOffers])

  useEffect(() => {
    const getUsername = async () => {
      const { data } = await getData({
        account: profile.account
      })

      if (data) setuserName(data.user[0].username.replaceAll(' ', '-'))
    }

    if (!userName) getUsername()
  }, [userName])

  useEffect(() => {
    if (errorUsername) {
      if (errorUsername.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push('/')
      } else history.push('/internal-error')
    }
    if (allOffersError) {
      if (allOffersError.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push('/')
      } else history.push('/internal-error')
    }

  }, [errorUsername, allOffersError])

  const checkAvailableFields = () => {
    let pendingFieldsObject = {}

    if (!profile.address)
      pendingFieldsObject = { ...pendingFieldsObject, address: false }

    if (!profile.about)
      pendingFieldsObject = { ...pendingFieldsObject, about: false }

    if (!profile.logo_url)
      pendingFieldsObject = { ...pendingFieldsObject, logo_url: false }

    if (!profile.name)
      pendingFieldsObject = { ...pendingFieldsObject, name: false }

    if (!profile.telephones)
      pendingFieldsObject = { ...pendingFieldsObject, telephones: false }

    if (!profile.photos)
      pendingFieldsObject = { ...pendingFieldsObject, photos: false }

    if (!profile.social_media_links)
      pendingFieldsObject = {
        ...pendingFieldsObject,
        social_media_links: false
      }

    if (!profile.website)
      pendingFieldsObject = { ...pendingFieldsObject, website: false }

    if (!profile.schedule)
      pendingFieldsObject = { ...pendingFieldsObject, schedule: false }

    if (!profile.location)
      pendingFieldsObject = { ...pendingFieldsObject, location: false }

    if (Object.keys(pendingFieldsObject).length > 0)
      setPendingFields(pendingFieldsObject)
  }

  useEffect(() => {

    const AOffers = []
    const IOffers = []

    offers.map((offer) => {
      if (!offer.active)
        IOffers.push(offer)
      else
        AOffers.push(offer)
    })

    setActiveOffers(AOffers)
    setInactiveOffers(IOffers)

  }, [offers])

  useEffect(() => {
    if (profile) {
      checkAvailableFields()
    }
  }, [profile])

  useEffect(() => {
    if (location.state) {
      history.replace({ state: false })
      setOpenSnackbar({
        show: true,
        message: t('editProfile.profileWasUpdated'),
        severity: 'success'
      })
    }
  }, [])

  return (
    <>
      <Snackbar
        open={openSnackbar.show}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
      {pendingFields && (
        <Box className={classes.alertBox}>
          <Alert
            action={
              <Box>
                <LinkRouter
                  className={classes.routerLinkUpdate}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: '/edit-profile',
                    state: { isCompleting: true }
                  }}
                >
                  <Button
                    color="secondary"
                    className={classes.updateButton}
                  >
                    {t('common.update')}
                  </Button>
                </LinkRouter>
              </Box>
            }
            className={classes.alert}
            severity="info"
          >
            <Typography>{t('profile.yourProfileIsNotComplete')} </Typography>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress
                  variant="determinate"
                  color="secondary"
                  className={classes.customizedLinearProgress}
                  value={
                    ((15 - Object.keys(pendingFields).length) * 100) / 15
                  }
                />
              </Box>
              <Box minWidth={35}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${Math.round(
                  ((15 - Object.keys(pendingFields).length) * 100) / 15
                )}%`}</Typography>
              </Box>
            </Box>
          </Alert>
        </Box>
      )}
      <Box className={classes.contentHeader}>
        <Typography className={classes.titleProfile} noWrap>{profile.name}</Typography>
        <Typography className={classes.subtitleProfile} noWrap>{profile.account}</Typography>
        <Typography className={classes.subtitleProfile} noWrap>{t('rolesTitle.singular.sponsor')}</Typography>
        <Avatar
          className={classes.avatarRoundDesktop}
          src={profile.logo_url ? profile.logo_url : ''}
        >
          <StorefrontIcon />
        </Avatar>
      </Box>
      {profile.website &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('common.website')}</Typography>
            <Typography variant="body1" className={classes.noCapitalize}>
              <Link
                href={profile.account}
                target="_blank"
                rel="noopener"
                color="secondary"
              >
                {profile.website}
              </Link>
            </Typography>
          </Box>
        </>
      }
      {userName &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography noWrap className={classes.rowTitle} variant="subtitle1">{t('profile.urlSite')}</Typography>
            <Typography noWrap variant="body1" className={classes.noCapitalize}>
              <Link
                href={`https://lifebank.io/info/${userName}`}
                target="_blank"
                rel="noopener"
                color="secondary"
              >
                {`https://lifebank.io/info/${userName}`}
              </Link>
            </Typography>
          </Box>
        </>
      }
      {profile.business_type &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('offersManagement.type')}</Typography>
            <Typography variant="body1">{t(`sponsorTypes.${profile.business_type}`)}</Typography>
          </Box>
        </>
      }
      {profile.consent &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('profile.consent')}</Typography>
            <Typography variant="body1">{`${profile.consent ? t('profile.granted') : t('profile.revoked')
              }`}</Typography>
          </Box>
        </>
      }
      { profile.community_asset &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('profile.communityAsset')}</Typography>
            <Typography variant="body1" className={classes.secondaryText}>{profile.community_asset}</Typography>
          </Box>
        </>
      }
      {profile.address &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('signup.address')}</Typography>
            <Typography variant="body1">{profile.address}</Typography>
          </Box>
        </>
      }
      {phones.length > 0 &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('common.telephone')}</Typography>
            <Box
              flexDirection="column"
              justifySelf="center"
              justifyContent="center"
              display="flex"
            >
              {phones.map(
                (item, index) => (
                  <Typography variant="body1" key={index}>{item}</Typography>
                ))
              }
            </Box>
          </Box>
        </>
      }
      { socialMedia.length > 0 &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('profile.socialMedia')}</Typography>
            <Box>
              {socialMedia.map(
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
          </Box>
        </>
      }
      {profile.schedule &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('common.schedule')}</Typography>
            <ViewSchedule schedule={profile.schedule} />
          </Box>
        </>
      }
      {profile.about &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('signup.about')}</Typography>
            <Typography >{profile.about}</Typography>
          </Box>
        </>
      }
      {images.length > 0 &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBoxLeft}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('profile.images')}</Typography>
            <Box>
              <img className={classes.img} src={images[activeStep]} />
              <MobileStepper
                className={classes.stepper}
                steps={images.length}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === images.length - 1}
                  >
                    {t('common.next')}
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    {t('common.prev')}
                  </Button>
                }
              />
            </Box>
          </Box>
        </>

      }
      { profile.location && profile.location !== 'null' && (
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBoxLeft}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('miscellaneous.location')}</Typography>
            <MapShowOneLocation
              markerLocation={
                profile && profile.location
                  ? JSON.parse(profile.location || '{}')
                  : {}
              }
              accountProp={profile.account}
              width="100%"
              height={250}
              py={2}
            />
          </Box>
        </>
      )
      }

      <Divider className={classes.divider} />

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
          <Typography variant="subtitle1" className={classes.rowTitle}>
            {t('offersManagement.offerStateActive')}
          </Typography>

        </Grid>
        <ShowOffersDesktop
          className={classes.offerContainer}
          offers={activeOffers}
          loading={loadingOffers}
        />
      </Grid>
      { inactiveOffers.length !== 0 && (
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
            <Typography variant="subtitle1" className={classes.rowTitle}>
              {t('offersManagement.offerStateInactive')}
            </Typography>

          </Grid>
          <ShowOffersDesktop
            className={classes.offerContainer}
            offers={inactiveOffers}
            loading={loadingOffers}
          />
        </Grid>
      )}
      <>
        <Divider className={classes.divider} />
        <Box className={classes.rowBoxLeft}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            justifySelf="center"
            className={classes.buttonContainer}
          >
            <QRCode value={profile.account} size={200} />

          </Box>
        </Box>
      </>
      <LinkRouter to={{ pathname: '/edit-profile', state: { isCompleting: false } }}
        className={classes.routerLink}
      >
        <Button className={classes.editButton} color="primary" variant="contained">
          {t('common.edit')}
        </Button>
      </LinkRouter>
    </>
  )
}


ProfilePageSponsor.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageSponsor
