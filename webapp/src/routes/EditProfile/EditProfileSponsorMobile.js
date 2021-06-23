import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import Grid from '@material-ui/core/Grid'
import PhoneNumber from 'material-ui-phone-number'

import MapEditLocation from '../../components/MapEditLocation'
import Carousel from '../../components/Carousel'
import Schedule from '../../components/Schedule'
import LogoUrlInput from '../../components/LogoUrlInput'
import SocialMediaTextField from '../../components/SocialMediaTextField'
import { constants } from '../../config'
import styles from './styles'

const useStyles = makeStyles(styles)
const CHARACTER_LIMIT = 512
const SPACING = 1

const {
  LOCATION_TYPES: { SPONSOR, PENDING_SPONSOR },
  SPONSOR_TYPES
} = constants

const EditProfileSponsorMobile = ({ profile, onSubmit, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const photoUrlValueRef = useRef(undefined)
  const [phoneValue1, setPhoneValue1] = useState(profile.telephones ? JSON.parse(profile.telephones)[0] : [])
  const [phoneValue2, setPhoneValue2] = useState(profile.telephones ? JSON.parse(profile.telephones)[1] : [])
  const [address, setAddress] = useState(profile.address ? profile.address.split(',')[0] : '')
  const [city, setCity] = useState(profile.address ? profile.address.split(',')[1] : '')
  const [state, setState] = useState(profile.address ? profile.address.split(',')[2] : '')
  const [country, setCountry] = useState(profile.address ? profile.address.split(',')[3] : '')
  const [values, setValues] = useState({
    about: ""
  });
  const [disablePhotoUrlInput, setDisablePhotoUrlInput] = useState(true)
  const [socialMedia] = useState(
    profile.social_media_links && profile.social_media_links !== '[]'
      ? JSON.parse(profile.social_media_links)
      : []
  )

  const [user, setUser] = useState({
    logo_url: profile.logo_url,
    name: profile.name,
    about: profile.about,
    address: profile.address,
    website: profile.website,
    telephones:
      profile.telephones && profile.telephones !== '[]'
        ? JSON.parse(profile.telephones)
        : [],
    business_type: profile.business_type,
    geolocation: profile.location ? JSON.parse(profile.location) : null,
    schedule: profile.schedule,
    photos:
      profile.photos && profile.photos !== '' ? JSON.parse(profile.photos) : [],
    social_media_links:
      profile.social_media_links && profile.social_media_links !== '[]'
        ? JSON.parse(profile.social_media_links)
        : []
  })

  const handleSetField = useMemo(
    () => (field, value) => {
      setUser({ ...user, [field]: value })
      if (field === 'about') {
        setValues({ ...values, [field]: value })
      }
    },
    [user, values]
  )

  const handleOnGeolocationChange = useCallback(
    (geolocation) => setUser((prev) => ({ ...prev, geolocation: geolocation }))
  )

  const handleOnAddSchedule = useMemo(
    () => (value) => {
      if (value)
        setUser((prev) => ({ ...prev, schedule: JSON.stringify(value) }))
    },
    [user.schedule]
  )

  const handleOnSocialMediaTextFieldChange = (name, url) => {
    const existingSocialMediaItem =
      user.social_media_links.find((social) => social.name === name) !==
      undefined

    if (existingSocialMediaItem && url === '') {
      setUser({
        ...user,
        social_media_links: user.social_media_links.filter(
          (social) => social.name !== name
        )
      })
      return
    }

    setUser({
      ...user,
      social_media_links: existingSocialMediaItem
        ? user.social_media_links.map((social) => {
          if (social.name === name) social.url = url

          return social
        })
        : [...user.social_media_links, { name: name, url: url }]
    })
  }

  const socialMediaValue = (social) => {
    if (socialMedia.find((socialMediaList) => socialMediaList.name === social))
      return socialMedia.find((socialMediaList) => socialMediaList.name === social).url
    else {
      return undefined
    }
  }

  const addAddress = () => {
    const completeAddress = address.concat(',', city, ',', state, ',', country)
    handleSetField('address', completeAddress)
  }

  const prepareDataForSubmitting = () => {
    const userToSubmit = { ...user }
    userToSubmit.telephones = JSON.stringify(userToSubmit.telephones)
    userToSubmit.photos = JSON.stringify(user.photos)
    userToSubmit.social_media_links = JSON.stringify(user.social_media_links)
    onSubmit(userToSubmit)
  }
  const handlePhotos = () => {
    setUser({
      ...user,
      photos: [...user.photos, photoUrlValueRef.current.value]
    })
    photoUrlValueRef.current.value = ''
    setDisablePhotoUrlInput(true)
  }

  function executeAddImage(e) {
    if (e.key === 'Enter' && (!disablePhotoUrlInput)) {
      e.preventDefault()
      setUser({
        ...user,
        photos: [...user.photos, photoUrlValueRef.current.value]
      })
      photoUrlValueRef.current.value = ''
      setDisablePhotoUrlInput(true)
    }
  }

  useEffect(() => {
    addAddress()
  }, [address, city, state, country])

  useEffect(() => {
    setUser({
      ...user,
      telephones: [
        phoneValue1,
        phoneValue2
      ]
    })
  }, [user, phoneValue1, phoneValue2])

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.mobile}>
        <Grid container spacing={SPACING}>
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h2">
              {t('editProfile.editTitleSponsor')}
            </Typography>
            <Typography className={classes.text} variant="body1">
              {t('editProfile.information')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.officialName')}
            </Typography>
            <TextField
              className={classes.mobileTextField}
              id="name"
              name="name"
              variant="filled"
              value={user.name}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputLabel >
                    {t('editProfile.sponsorNamePlaceholder')}
                  </InputLabel>
                ),
              }}
              onChange={(event) => handleSetField('name', event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('signup.about')}
            </Typography>
            <TextField
              className={classes.mobileTextField}
              id="about"
              multiline
              rows={5}
              InputProps={{
                endAdornment: (
                  <InputLabel >
                    {t('signup.aboutBusiness')}
                  </InputLabel>
                ),
                maxLength: CHARACTER_LIMIT
              }}
              helperText={`${values.about.length}/${CHARACTER_LIMIT}`}
              variant="filled"
              defaultValue={user.about}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              onChange={(event) => handleSetField('about', event.target.value)}
            />
          </Grid>
          <Grid item xs={12} >
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.typeOfSponsor')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="filled"
              className={classes.sponsorType}
            >
              <InputLabel >
                {t('signup.type')}
              </InputLabel>
              <Select
                labelId="bussines-type-label"
                id="bussines-type"
                value={user.business_type || ''}
                onChange={(event) =>
                  handleSetField('business_type', event.target.value)
                }
                label={t('signup.type')}
              >
                {SPONSOR_TYPES.map((option) => (
                  <MenuItem key={`bussines-type-option-${option}`} value={option}>
                    {t(`sponsorTypes.${option}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.contactInformation')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.mobileTextField}
              id="website"
              variant="filled"
              defaultValue={user.website}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputLabel >
                    {t('common.website')}
                  </InputLabel>
                ),
              }}
              onChange={(event) => handleSetField('website', event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneNumber
              className={classes.mobileTextField}
              defaultCountry='cr'
              value={user.telephones[0]}
              fullWidth
              label={t('signup.phoneNumber')}
              id="phoneNumber1"
              variant="filled"
              onChange={(event) => setPhoneValue1(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneNumber
              className={classes.mobileTextField}
              defaultCountry='cr'
              fullWidth
              value={user.telephones[1]}
              label={t('signup.phoneNumber')}
              id="phoneNumber1"
              variant="filled"
              onChange={(event) => setPhoneValue2(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.addressInformation')}
            </Typography>
            <Typography className={classes.text} variant="body1">
              {t('editProfile.addressDescription')}
            </Typography>
            <TextField
              className={classes.mobileTextField}
              id="address"
              fullWidth
              variant="filled"
              defaultValue={address}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputLabel >
                    {t('signup.address')}
                  </InputLabel>
                ),
              }}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Grid>
          <Grid
            container
            item xs={12}
            justify="space-between"
          >
            <Grid item xs={6}>
              <Box className={classes.leftBox}>
                <TextField
                  className={classes.mobileTextField}
                  id="city"
                  fullWidth
                  variant="filled"
                  defaultValue={city}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputLabel >
                        {t('editProfile.city')}
                      </InputLabel>
                    ),
                  }}
                  onChange={(event) => setCity(event.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.rightBox}>
                <TextField
                  className={classes.mobileTextField}
                  id="state"
                  fullWidth
                  variant="filled"
                  defaultValue={state}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputLabel >
                        {t('editProfile.stateProvince')}
                      </InputLabel>
                    ),
                  }}
                  onChange={(event) => setState(event.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.mobileTextField}
              id="country"
              fullWidth
              variant="filled"
              defaultValue={country}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputLabel >
                    {t('editProfile.country')}
                  </InputLabel>
                ),
              }}
              onChange={(event) => setCountry(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box paddingTop='4px' width="100%">
              <MapEditLocation
                onGeolocationChange={handleOnGeolocationChange}
                markerType={user.geolocation ? SPONSOR : PENDING_SPONSOR}
                markerLocation={user.geolocation}
                width="100%"
                height={287}
                mb={1}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('common.schedule')}
            </Typography>
            <Box
              className={classes.componentBoxWrp}
            >
              <Box className={classes.componentBox}>
                <Schedule
                  handleOnAddSchedule={(value) => handleOnAddSchedule(value)}
                  data={user.schedule ? JSON.parse(user.schedule || '[]') : []}
                  showSchedule
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.socialMedia')}
            </Typography>
            <Box
              width="100%"
            >
              <SocialMediaTextField
                textFieldClass={classes.mobileTextField}
                idText="instagram-username"
                name="instagram"
                label={t('editProfile.instagramUsername')}
                defaultValue={socialMediaValue('instagram')}
                placeholder={t('editProfile.instagramUsernamePlaceholder')}
                icon={<InstagramIcon />}
                onChangeSocialMediaTextField={(url) =>
                  handleOnSocialMediaTextFieldChange('instagram', url)
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              width="100%"
            >
              <SocialMediaTextField
                textFieldClass={classes.mobileTextField}
                idText="facebook-profile-url"
                name="facebook"
                label={t('editProfile.facebookProfileUrl')}
                defaultValue={socialMediaValue('facebook')}
                placeholder={t('editProfile.facebookProfileUrlPlaceholder')}
                icon={<FacebookIcon />}
                onChangeSocialMediaTextField={(url) =>
                  handleOnSocialMediaTextFieldChange('facebook', url)
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              width="100%"
            >
              <SocialMediaTextField
                textFieldClass={classes.mobileTextField}
                idText="twitter-username"
                name="twitter"
                label={t('editProfile.twitterUsername')}
                defaultValue={socialMediaValue('twitter')}
                placeholder={t('editProfile.twitterUsernamePlaceholder')}
                icon={<TwitterIcon />}
                onChangeSocialMediaTextField={(url) =>
                  handleOnSocialMediaTextFieldChange('twitter', url)
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.imagery')}
            </Typography>
            <Typography className={classes.text} variant="body1">
              {t('editProfile.imageryDescription')}
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <Box width="100%">
              <LogoUrlInput handleSetField={handleSetField} logo={user.logo_url} role="sponsor" />
            </Box>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="photo-url"
              variant="filled"
              fullWidth
              inputRef={photoUrlValueRef}
              onChange={(e) =>
                setDisablePhotoUrlInput(e.target.value.length === 0)
              }
              onKeyPress={(event) =>
                executeAddImage(event)
              }
              InputProps={{
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      <IconButton
                        disabled={disablePhotoUrlInput}
                        color="secondary"
                        onClick={handlePhotos}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                    <InputLabel >
                      {t('editProfile.photoUrl')}
                    </InputLabel>
                  </>
                )
              }}
              InputLabelProps={{
                shrink: true
              }}
              className={classes.mobileTextField}
            />
          </Grid>
          <Grid item xs={12} >
            {user.photos && (
              <Box className={classes.carouselContainer}>
                {user.photos.length > 0 && (
                  <Carousel
                    deleteItem={(url) => {
                      setUser({
                        ...user,
                        photos: user.photos.filter((p) => p !== url)
                      })
                    }}
                    activeDeletion
                    images={user.photos}
                  />
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.btnWrapper}>
              <Link to="/profile" className={classes.routerLink}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.cancelBtn}
                >
                  {t('common.cancel')}
                </Button>
              </Link>
              <Button
                className={classes.saveBtn}
                variant="contained"
                color="secondary"
                onClick={prepareDataForSubmitting}
              >
                {t('common.save')}
              </Button>
              {loading && <CircularProgress />}
            </Box>
          </Grid>
        </Grid>
      </Box >
    </form >
  )
}

EditProfileSponsorMobile.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileSponsorMobile