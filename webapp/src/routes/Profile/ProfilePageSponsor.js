import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import QRCode from 'qrcode.react'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next'

import FacebookIcon from '../../assets/facebook.svg'
import InstagramIcon from '../../assets/instagram.svg'
import TwitterIcon from '../../assets/twitter.svg'
import Logo from '../../components/Logo'
import Schedule from '../../components/Schedule'
import Telephones from '../../components/Telephones'
import CarouselComponent from '../../components/Carousel'
import MapShowOneLocation from '../../components/MapShowOneLocation'
import { eosConfig } from '../../config'

const useStyles = makeStyles((theme) => ({
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      textTransform: 'capitalize'
    }
  },
  element: {
    height: '100%',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  divider: {
    width: '100%'
  },
  dialogContent: {
    padding: theme.spacing(5, 2),
    marginTop: theme.spacing(10)
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  },
  textFieldWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  editBtn: {
    margin: theme.spacing(2, 0)
  },
  secondaryText: {
    color: `${theme.palette.secondary.main} !important`
  },
  noCapitalize: {
    textTransform: 'none !important'
  },
  customizedLinearProgress: {
    height: 10,
    borderRadius: 5
  },
  alert: {
    '& > div.MuiAlert-message': {
      padding: 0,
      margin: 0
    },
    '& > div.MuiAlert-action': {
      maxHeight: 50
    },
    paddingBottom: 0
  },
  buttonContainer: {
    margin: theme.spacing(2, 0)
  }
}))

const ProfilePageSponsor = ({ profile }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [pendingFields, setPendingFields] = useState()

  const checkAvailableFields = () => {
    let pendingFieldsObject = {}

    if (!profile.email)
      pendingFieldsObject = { ...pendingFieldsObject, email: false }

    if (!profile.address)
      pendingFieldsObject = { ...pendingFieldsObject, address: false }

    if (!profile.about)
      pendingFieldsObject = { ...pendingFieldsObject, about: false }

    if (!profile.logo_url)
      pendingFieldsObject = { ...pendingFieldsObject, logo_url: false }

    if (!profile.benefit_description)
      pendingFieldsObject = {
        ...pendingFieldsObject,
        benefit_description: false
      }

    if (!profile.name)
      pendingFieldsObject = { ...pendingFieldsObject, name: false }

    if (!profile.about)
      pendingFieldsObject = { ...pendingFieldsObject, about: false }

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

    if (!profile.covid_impact)
      pendingFieldsObject = { ...pendingFieldsObject, covid_impact: false }

    if (!profile.benefit_description)
      pendingFieldsObject = {
        ...pendingFieldsObject,
        benefit_description: false
      }

    if (!profile.location)
      pendingFieldsObject = { ...pendingFieldsObject, location: false }

    if (Object.keys(pendingFieldsObject).length > 0)
      setPendingFields(pendingFieldsObject)
  }

  const getSocialMediaIcon = (name) => {
    switch (name) {
      case 'facebook':
        return FacebookIcon
      case 'instagram':
        return InstagramIcon
      case 'twitter':
        return TwitterIcon
      default:
        break
    }
  }

  useEffect(() => {
    if (profile) {
      if (profile.social_media_links)
        profile.social_media_links = JSON.parse(profile.social_media_links)
      if (profile.photos) profile.photos = JSON.parse(profile.photos)
      if (profile.telephones)
        profile.telephones = JSON.parse(profile.telephones)
      checkAvailableFields()
    }
  }, [profile])

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={6} mdß={4} lg={4}>
        {pendingFields && (
          <Grid style={{ maxWidth: 500, margin: 'auto' }} item>
            <Alert
              action={
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <LinkRouter
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: '/edit-profile',
                      state: { isCompleting: true }
                    }}
                  >
                    <Button
                      color="secondary"
                      className={classes.noCapitalize}
                      classes={{
                        root: classes.editBtn
                      }}
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
          </Grid>
        )}
        <br />
        {profile.logo_url && profile.logo_url !== '' && (
          <Logo logoUrl={profile.logo_url} />
        )}
        <Box className={classes.rowBox}>
          <Typography variant="subtitle1">{t('common.email')}</Typography>
          <Typography variant="body1" className={classes.noCapitalize}>
            {profile.email}
          </Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box
          style={{ display: !profile.account ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">{t('common.account')}</Typography>
          <Typography variant="body1">
            <Link
              href={`${eosConfig.BLOCK_EXPLORER_URL}account/${profile.account}`}
              target="_blank"
              rel="noopener"
              color="secondary"
            >
              {profile.account}
            </Link>
          </Typography>
        </Box>
        <Divider
          style={{ display: !profile.name ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.name ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">
            {t('profile.organization')}
          </Typography>
          <Typography variant="body1">{profile.name}</Typography>
        </Box>
        {profile.telephones &&
          Array.isArray(profile.telephones) &&
          profile.telephones.length > 0 && (
            <Box
              flexDirection="column"
              justifySelf="center"
              justifyContent="center"
              display="flex"
            >
              <Divider className={classes.divider} />
              <Telephones phones={profile.telephones} />
            </Box>
          )}
        <Divider
          style={{ display: !profile.website ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.website ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">{t('common.website')}</Typography>
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
        <Divider
          style={{ display: !profile.business_type ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.business_type ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">
            {t('offersManagement.type')}
          </Typography>
          <Typography variant="body1">{profile.business_type}</Typography>
        </Box>
        <Divider
          style={{ display: !profile.consent ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.consent ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">{t('profile.consent')}</Typography>
          <Typography variant="body1">{`${profile.consent ? t('profile.granted') : t('profile.revoked')
            }`}</Typography>
        </Box>

        {profile.photos &&
          Array.isArray(profile.photos) &&
          profile.photos.length > 0 && (
            <Box
              flexDirection="column"
              justifySelf="center"
              justifyContent="center"
              display="flex"
            >
              <Divider
                style={{ display: !profile.photos ? 'none' : '' }}
                className={classes.divider}
              />
              <CarouselComponent images={profile.photos} />
            </Box>
          )}

        {profile.social_media_links &&
          Array.isArray(profile.social_media_links) &&
          profile.social_media_links.map((item, key) => (
            <>
              <Box key={key}>
                <Divider className={classes.divider} />
                <Box className={classes.rowBox}>
                  <IconButton
                    color="secondary"
                    aria-label={`${item.name}-icon-button`}
                  >
                    <Icon>
                      <img
                        src={getSocialMediaIcon(item.name)}
                        alt={`${item.name}-icon`}
                        height={25}
                        width={25}
                      />
                    </Icon>
                  </IconButton>
                  <Typography variant="body1">
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      color="secondary"
                    >
                      {t('miscellaneous.view')}
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </>
          ))}

        <Divider
          style={{ display: !profile.community_asset ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.community_asset ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">
            {t('profile.communityAsset')}
          </Typography>
          <Typography variant="body1" className={classes.secondaryText}>
            {profile.community_asset}
          </Typography>
        </Box>
        <Divider
          style={{ display: !profile.schedule ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.schedule ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">{t('common.schedule')}</Typography>
          <Typography variant="body1" />
        </Box>
        <Schedule
          style={{ display: !profile.schedule ? 'none' : '' }}
          data={profile ? JSON.parse(profile.schedule || '[]') : []}
          showSchedule
          showButton={false}
        />
        <Divider
          style={{ display: !profile.about ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.about ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">{t('signup.about')}</Typography>
          <Typography variant="body1" />
        </Box>
        <TextField
          style={{ display: !profile.about ? 'none' : '' }}
          id="address"
          variant="outlined"
          disabled
          defaultValue={profile.about}
          InputLabelProps={{
            shrink: true
          }}
          multiline
          fullWidth
          rows={3}
        />
        <Divider
          style={{ display: !profile.address ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.address ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">{t('signup.address')}</Typography>
          <Typography variant="body1" />
        </Box>
        <TextField
          style={{ display: !profile.address ? 'none' : '' }}
          id="address"
          variant="outlined"
          disabled
          defaultValue={profile.address}
          InputLabelProps={{
            shrink: true
          }}
          multiline
          fullWidth
          rows={3}
        />
        <Divider
          style={{ display: !profile.covid_impact ? 'none' : '' }}
          className={classes.divider}
        />
        <Box
          style={{ display: !profile.covid_impact ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">
            {t('editProfile.covidImpact')}
          </Typography>
          <Typography variant="body1" />
        </Box>
        <TextField
          style={{ display: !profile.covid_impact ? 'none' : '' }}
          id="covidImpact"
          variant="outlined"
          disabled
          defaultValue={profile.covid_impact}
          InputLabelProps={{
            shrink: true
          }}
          multiline
          fullWidth
          rows={3}
        />
        <Box
          style={{ display: !profile.benefit_description ? 'none' : '' }}
          className={classes.rowBox}
        >
          <Typography variant="subtitle1">
            {t('profile.benefitDescription')}
          </Typography>
          <Typography variant="body1" />
        </Box>
        <Divider className={classes.divider} />
        <TextField
          style={{ display: !profile.benefit_description ? 'none' : '' }}
          id="benefitDescription"
          variant="outlined"
          disabled
          defaultValue={profile.benefit_description}
          InputLabelProps={{
            shrink: true
          }}
          multiline
          fullWidth
          rows={3}
        />
        {profile.location && profile.location !== 'null' && (
          <MapShowOneLocation
            markerLocation={
              profile && profile.location
                ? JSON.parse(profile.location || '{}')
                : {}
            }
            accountProp={profile.account}
            width="100%"
            height={400}
            py={2}
          />
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          justifySelf="center"
          className={classes.buttonContainer}
        >
          <QRCode value={profile.account} size={200} />
          <LinkRouter
            to={{ pathname: '/edit-profile', state: { isCompleting: false } }}
            className={classes.editBtn}
          >
            <Button variant="contained" color="primary">
              {t('common.edit')}
            </Button>
          </LinkRouter>
        </Box>
      </Grid>
    </Grid>
  )
}

ProfilePageSponsor.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageSponsor
