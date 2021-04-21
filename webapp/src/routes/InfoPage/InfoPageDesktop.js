import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Divider from '@material-ui/core/Divider'
import Slider from '@material-ui/core/Slider'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import IconButton from '@material-ui/core/IconButton'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Avatar from '@material-ui/core/Avatar'
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import { useParams } from 'react-router'
import Grid from '@material-ui/core/Grid'

import { useUser } from '../../context/user.context'
import MapShowOneLocation from '../../components/MapShowOneLocation'
import ViewSchedule from '../../components/ViewSchedule'
import { GET_LOCATION_PROFILE, GET_ID, GET_OFFER_BY_SPONSOR_QUERY } from '../../gql'
import Nearby from '../../components/Nearby/Nerby'
import ShowOffersDesktop from '../../components/ShowElements/ShowOffersDesktop'
import styles from './styles'

const useStyles = makeStyles(styles)

const InfoPage = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)
  const location = useLocation()
  const [, { logout }] = useUser()
  const history = useHistory()
  const [profile, setProfile] = useState()
  const { url } = useParams()
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [sponsorID, setSponsorID] = useState()

  const getOffers = async () => {
    if (profile) {
      if (profile.role === 'sponsor') {
        setLoadingOffers(true)
        await getAllOffers()
        await getSponsorID()
      }
    }
  }

  const { error: errorInfoProfile, refetch: getInfoProfile } = useQuery(GET_LOCATION_PROFILE, {
    variables: {
      username: url
    }
  })

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
                "requirement": objectTemp.info.requirement
              })
          }

        } else history.push('/not-found')

      }

      if (!location.state) getProfile()

    }
  }

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
                    src={url ? `//images.weserv.nl?url=${url}&h=300&dpr=2` : ''}
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
              src={`//images.weserv.nl?url=${profile.logo || ''
                }&h=60&dpr=1`}
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
                  {profile.description}
                </Typography>
              </Box>
              <Divider className={classes.divider} />
              <Box className={classes.midLabel}>
                <Typography className={classes.boldText} variant="subtitle1">
                  {t('common.schedule')}
                </Typography>
                <ViewSchedule schedule={profile.openingHours} />
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
              {profile &&
                <Nearby
                  location={JSON.parse(profile.location)}
                  searchDistance={1000}
                  account={profile.account}
                />
              }
            </Box>
          </Box>
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
            {profile.role === 'sponsor' && (
              <Grid item md={12}>
                <Typography variant="subtitle1" className={classes.boldText}>
                  {t('offerView.lifebankOffers')}
                </Typography>
                <ShowOffersDesktop
                  className={classes.offerContainer}
                  offers={offers}
                  loading={loadingOffers}
                />
              </Grid>
            )}

          </Grid>
        </Box>
      )}

    </>
  )
}

export default InfoPage
