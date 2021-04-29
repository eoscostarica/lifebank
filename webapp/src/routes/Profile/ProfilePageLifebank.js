import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Link as LinkRouter, useHistory, useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import MobileStepper from '@material-ui/core/MobileStepper'
import QRCode from 'qrcode.react'
import Snackbar from '@material-ui/core/Snackbar'
import '@brainhubeu/react-carousel/lib/style.css'

import { useUser } from '../../context/user.context'
import MapShowOneLocation from '../../components/MapShowOneLocation'
import ViewSchedule from '../../components/ViewSchedule'
import ViewCategories from '../../components/ViewCategories'
import { GET_USERNAME } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const ProfilePageLifebank = ({ profile }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [userName, setuserName] = useState()
  const [pendingFields, setPendingFields] = useState()
  const history = useHistory()
  const location = useLocation()
  const [, { logout }] = useUser()
  const theme = useTheme()
  const images = profile.photos ? JSON.parse(profile.photos) : {}
  const phones = profile.telephones ? JSON.parse(profile.telephones) : {}
  const [activeStep, setActiveStep] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)

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

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  useEffect(() => {
    const getUsername = async () => {
      const { data } = await getData({
        account: profile.account
      })

      if (data) setuserName(data.user[0].username.replaceAll(' ', '-'))
    }

    if (!userName) getUsername()
  })

  useEffect(() => {
    if (errorUsername) {
      if (errorUsername.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push('/')
      } else history.push('/internal-error')
    }

  }, [errorUsername])

  const checkAvailableFields = () => {
    let pendingFieldsObject = {}

    if (!profile.email)
      pendingFieldsObject = { ...pendingFieldsObject, email: false }

    if (!profile.name)
      pendingFieldsObject = { ...pendingFieldsObject, name: false }

    if (!profile.telephones)
      pendingFieldsObject = { ...pendingFieldsObject, telephones: false }

    if (!JSON.parse(profile.photos).length > 0)
      pendingFieldsObject = { ...pendingFieldsObject, photos: false }

    if (!profile.logo_url.length > 0)
      pendingFieldsObject = { ...pendingFieldsObject, logo_url: false }

    if (!profile.schedule)
      pendingFieldsObject = { ...pendingFieldsObject, schedule: false }

    if (!profile.categories)
      pendingFieldsObject = { ...pendingFieldsObject, categories: false }

    if (!profile.location)
      pendingFieldsObject = { ...pendingFieldsObject, location: false }

    if (!profile.address)
      pendingFieldsObject = { ...pendingFieldsObject, address: false }

    if (!profile.about)
      pendingFieldsObject = { ...pendingFieldsObject, about: false }

    if (!profile.requirement)
      pendingFieldsObject = { ...pendingFieldsObject, requirement: false }

    if (!profile.blood_urgency_level)
      pendingFieldsObject = {
        ...pendingFieldsObject,
        blood_urgency_level: false
      }

    if (!profile.requirement)
      pendingFieldsObject = { ...pendingFieldsObject, requirement: false }

    if (Object.keys(pendingFieldsObject).length > 0)
      setPendingFields(pendingFieldsObject)
  }

  useEffect(() => {
    if (profile) checkAvailableFields()
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
                    state: { isCompleting: false, userName: userName }
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
        <Typography className={classes.subtitleProfile} noWrap>{t('miscellaneous.donationCenter')}</Typography>
        <Avatar
          className={classes.avatarRoundDesktop}
          src={profile.logo_url ? profile.logo_url : ''}
        >
          <LocalHospitalIcon />
        </Avatar>
      </Box>
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
      {profile.email &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('common.email')}</Typography>
            <Typography variant="body1">{profile.email}</Typography>
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
      {profile.about &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('signup.about')}</Typography>
            <Typography >{profile.about}</Typography>
          </Box>
        </>
      }
      {profile.requirement &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('signup.requirement')}</Typography>
            <Typography >{profile.requirement.replaceAll("\n", ", ")}</Typography>
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
      {profile.categories &&
        <>
          <Divider className={classes.divider} />
          <Box className={classes.rowBox}>
            <Typography className={classes.rowTitle} variant="subtitle1">{t('common.categories')}</Typography>
            <ViewCategories categories={profile.categories} />
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
      {
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
      }
      <LinkRouter to={{ pathname: '/edit-profile', state: { isCompleting: false, userName: userName } }}
        className={classes.routerLink}
      >
        <Button variant="contained" color="secondary" className={classes.editButton}>{t('common.edit')}</Button>
      </LinkRouter>
    </>
  )
}

ProfilePageLifebank.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageLifebank
