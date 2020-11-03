import React, { useState, useMemo, useRef, useCallback } from 'react'
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

import FacebookIcon from '../../assets/facebook.svg'
import InstagramIcon from '../../assets/instagram.svg'
import TwitterIcon from '../../assets/twitter.svg'
import MapEditLocation from '../../components/MapEditLocation'
import Carousel from '../../components/Carousel'
import Schedule from '../../components/Schedule'
import Logo from '../../components/Logo'
import Telephones from '../../components/Telephones'
import SocialMediaTextField from '../../components/SocialMediaTextField'
import { constants } from '../../config'

const {
  LOCATION_TYPES: { SPONSOR },
  SPONSOR_TYPES
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '60%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '40%'
    },
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& > div.MuiFormControl-root': {
      width: '100%'
    }
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  boxBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    '& a': {
      textDecoration: 'none'
    }
  },
  labelBtn: {
    color: theme.palette.white
  },
  logo: {
    maxWidth: '100%',
    maxHeight: 340
  },
  addBtn: {
    color: 'white',
    margin: theme.spacing(2, 0)
  },
  carouselContainer: {
    width: '100%'
  },
  socialMediaLinksContainer: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    border: '1px dashed lightgray'
  }
}))

const EditProfileSponsor = ({ profile, isCompleting, onSubmit, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const phoneValueRef = useRef(undefined)
  const photoUrlValueRef = useRef(undefined)
  const [disablePhoneInput, setDisablePhoneInput] = useState(true)
  const [disablePhotoUrlInput, setDisablePhotoUrlInput] = useState(true)
  const [user, setUser] = useState({
    logo_url: profile.logo_url,
    name: profile.name,
    about: profile.about,
    address: profile.address,
    email: profile.email,
    website: profile.website,
    benefit_description: profile.benefit_description,
    telephones:
      profile.telephones && profile.telephones !== '[]'
        ? JSON.parse(profile.telephones)
        : [],
    business_type: profile.business_type,
    covid_impact: profile.covid_impact,
    geolocation: profile.location ? JSON.parse(profile.location) : null,
    schedule: profile.schedule,
    photos:
      profile.photos && profile.photos !== '' ? JSON.parse(profile.photos) : [],
    social_media_links:
      profile.social_media_links && profile.social_media_links !== ''
        ? JSON.parse(profile.social_media_links)
        : []
  })

  const handleSetField = useMemo(
    () => (field, value) => {
      setUser({ ...user, [field]: value })
    },
    [user]
  )

  const handleOnGeolocationChange = useCallback(
    (geolocation) => setUser({ ...user, geolocation: geolocation }),
    [user.geolocation]
  )

  const handleOnAddSchedule = useMemo(
    () => (value) => {
      if (value) setUser({ ...user, schedule: JSON.stringify(value) })
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

  const prepareDataForSubmitting = () => {
    const userToSubmit = { ...user }
    userToSubmit.telephones = JSON.stringify(userToSubmit.telephones)
    userToSubmit.photos = JSON.stringify(user.photos)
    userToSubmit.social_media_links = JSON.stringify(user.social_media_links)
    onSubmit(userToSubmit)
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <>
          {isCompleting && !profile.logo_url && (
            <Logo showCaption logoUrl={user.logo_url} />
          )}
        </>
        <TextField
          id="logo-url"
          name="logo-input"
          style={{
            display: isCompleting && !profile.logo_url ? 'block' : 'none'
          }}
          label={t('editProfile.logoUrl')}
          variant="outlined"
          placeholder={t('editProfile.logoUrlPlaceholder')}
          defaultValue={user.logo_url}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('logo_url', event.target.value)}
        />
        <TextField
          id="name"
          name="name"
          style={{ display: isCompleting && profile.name ? 'none' : '' }}
          label={t('signup.name')}
          variant="outlined"
          placeholder={t('editProfile.sponsorNamePlaceholder')}
          value={user.name}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('name', event.target.value)}
        />
        <TextField
          id="address"
          name="address"
          style={{ display: isCompleting && profile.address ? 'none' : '' }}
          label={t('signup.address')}
          variant="outlined"
          placeholder={t('signup.addressPlaceholder')}
          value={user.address}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('address', event.target.value)}
        />
        <FormControl
          style={{
            display: isCompleting && profile.business_type ? 'none' : ''
          }}
          variant="outlined"
          className={classes.textField}
        >
          <InputLabel id="bussines-type-label">Type</InputLabel>
          <Select
            labelId="bussines-type-label"
            id="bussines-type"
            value={user.business_type || ''}
            onChange={(event) =>
              handleSetField('business_type', event.target.value)
            }
            label="Type"
          >
            {SPONSOR_TYPES.map((option) => (
              <MenuItem key={`bussines-type-option-${option}`} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="email"
          style={{ display: isCompleting && profile.email ? 'none' : '' }}
          label={t('common.email')}
          variant="outlined"
          placeholder={t('common.emailPlaceholder')}
          defaultValue={user.email}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('email', event.target.value)}
        />
        <TextField
          id="website"
          style={{ display: isCompleting && profile.website ? 'none' : '' }}
          label={t('common.website')}
          variant="outlined"
          placeholder="Website"
          defaultValue={user.website}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('website', event.target.value)}
        />
        <TextField
          id="telephone"
          label={t('signup.phoneNumber')}
          variant="outlined"
          placeholder={t('signup.phoneNumberPlaceholder')}
          fullWidth
          inputRef={phoneValueRef}
          onChange={(e) => setDisablePhoneInput(e.target.value.length === 0)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={disablePhoneInput}
                  color="secondary"
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setUser({
                      ...user,
                      telephones: [
                        ...user.telephones,
                        phoneValueRef.current.value
                      ]
                    })
                    phoneValueRef.current.value = ''
                    setDisablePhoneInput(true)
                  }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
        />
        <Telephones
          phones={user.telephones}
          showDelete
          deletePhone={(phone) =>
            setUser({
              ...user,
              telephones: user.telephones.filter((p) => p !== phone)
            })
          }
        />

        <Box
          style={{ display: isCompleting && profile.schedule ? 'none' : '' }}
          width="100%"
          className={classes.textField}
        >
          <Schedule
            handleOnAddSchedule={(value) => handleOnAddSchedule(value)}
            style={{ display: !profile.schedule ? 'none' : '' }}
            data={user.schedule ? JSON.parse(user.schedule || '[]') : []}
            showSchedule
          />
        </Box>

        <TextField
          id="about"
          style={{
            display: isCompleting && profile.about ? 'none' : ''
          }}
          label={t('signup.about')}
          variant="outlined"
          placeholder={t('signup.aboutBusiness')}
          defaultValue={user.about}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) => handleSetField('about', event.target.value)}
        />

        <TextField
          id="covidImpact"
          style={{
            display: isCompleting && profile.covid_impact ? 'none' : ''
          }}
          label={t('editProfile.covidImpact')}
          variant="outlined"
          placeholder={t('editProfile.covidImpactPlaceholder')}
          defaultValue={user.covid_impact}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) =>
            handleSetField('covid_impact', event.target.value)
          }
        />
        <TextField
          id="benefitDescription"
          style={{
            display: isCompleting && profile.benefit_description ? 'none' : ''
          }}
          label={t('profile.benefitDescription')}
          variant="outlined"
          placeholder=""
          defaultValue={user.benefit_description}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) =>
            handleSetField('benefit_description', event.target.value)
          }
        />
        <TextField
          id="photo-url"
          style={{
            display: isCompleting && !profile.photos ? 'none' : ''
          }}
          label={t('editProfile.photoUrl')}
          variant="outlined"
          placeholder={t('editProfile.photourlPlaceholder')}
          fullWidth
          inputRef={photoUrlValueRef}
          onChange={(e) => setDisablePhotoUrlInput(e.target.value.length === 0)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={disablePhotoUrlInput}
                  color="secondary"
                  aria-label="add photo url"
                  onClick={() => {
                    setUser({
                      ...user,
                      photos: [...user.photos, photoUrlValueRef.current.value]
                    })
                    photoUrlValueRef.current.value = ''
                    setDisablePhotoUrlInput(true)
                  }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
        />
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

        <Box className={classes.socialMediaLinksContainer}>
          <SocialMediaTextField
            style={{
              display:
                isCompleting &&
                user.social_media_links &&
                user.social_media_links.find(
                  (social) => social.name === 'facebook'
                )
                  ? 'none'
                  : ''
            }}
            idText="facebook-profile-url"
            name="facebook"
            label={t('editProfile.facebookProfileUrl')}
            placeholder={t('editProfile.facebookProfileUrlPlaceholder')}
            icon={FacebookIcon}
            onChangeSocialMediaTextField={(url) =>
              handleOnSocialMediaTextFieldChange('facebook', url)
            }
          />
          <SocialMediaTextField
            style={{
              display:
                isCompleting &&
                user.social_media_links &&
                user.social_media_links.find(
                  (social) => social.name === 'instagram'
                )
                  ? 'none'
                  : ''
            }}
            textFieldClass={classes.textField}
            idText="instagram-username"
            name="instagram"
            label={t('editProfile.instagramUsername')}
            placeholder={t('editProfile.instagramUsernamePlaceholder')}
            icon={InstagramIcon}
            onChangeSocialMediaTextField={(url) =>
              handleOnSocialMediaTextFieldChange('instragram', url)
            }
          />
          <SocialMediaTextField
            style={{
              display:
                isCompleting &&
                user.social_media_links &&
                user.social_media_links.find(
                  (social) => social.name === 'twitter'
                )
                  ? 'none'
                  : ''
            }}
            textFieldClass={classes.textField}
            idText="twitter-username"
            name="twitter"
            label={t('editProfile.twitterUsername')}
            placeholder={t('editProfile.twitterUsernamePlaceholder')}
            icon={TwitterIcon}
            onChangeSocialMediaTextField={(url) =>
              handleOnSocialMediaTextFieldChange('twitter', url)
            }
          />
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          {t('signup.chooseYourLocation')}
        </Typography>

        <MapEditLocation
          onGeolocationChange={handleOnGeolocationChange}
          markerType={SPONSOR}
          markerLocation={
            user.geolocation
              ? user.geolocation
              : { longitude: -84.0556371, latitude: 9.9195872 }
          }
          width="100%"
          height={400}
          mb={1}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Box className={classes.boxBtn}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => prepareDataForSubmitting()}
          >
            {t('common.save')}
          </Button>

          <Link to="/profile" className={classes.labelBtn}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.labelBtn}
            >
              {t('common.cancel')}
            </Button>
          </Link>
        </Box>
        {loading && <CircularProgress />}
      </Box>
    </form>
  )
}

EditProfileSponsor.propTypes = {
  profile: PropTypes.object,
  isCompleting: PropTypes.bool,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileSponsor
