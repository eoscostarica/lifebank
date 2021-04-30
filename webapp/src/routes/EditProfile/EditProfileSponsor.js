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
import Divider from '@material-ui/core/Divider'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'

import MapEditLocation from '../../components/MapEditLocation'
import Carousel from '../../components/Carousel'
import Schedule from '../../components/Schedule'
import LogoUrlInput from '../../components/LogoUrlInput'
import Telephones from '../../components/Telephones'
import SocialMediaTextField from '../../components/SocialMediaTextField'
import { constants } from '../../config'
import styles from './styles'

const useStyles = makeStyles(styles)

const {
  LOCATION_TYPES: { SPONSOR, PENDING_SPONSOR },
  SPONSOR_TYPES
} = constants

const EditProfileSponsor = ({ profile, isCompleting, onSubmit, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const phoneValueRef = useRef(undefined)
  const photoUrlValueRef = useRef(undefined)
  const [disablePhoneInput, setDisablePhoneInput] = useState(true)
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
    },
    [user]
  )

  const handleOnGeolocationChange = useCallback(
    (geolocation) => setUser((prev) => ({ ...prev, geolocation: geolocation })),
    [user.geolocation]
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

  const prepareDataForSubmitting = () => {
    const userToSubmit = { ...user }
    userToSubmit.telephones = JSON.stringify(userToSubmit.telephones)
    userToSubmit.photos = JSON.stringify(user.photos)
    userToSubmit.social_media_links = JSON.stringify(user.social_media_links)
    onSubmit(userToSubmit)
  }

  const showOrHide = (value) => {
    return isCompleting && value ? 'none' : ''
  }

  const showOrHideSocialMedia = (platform) => {
    return isCompleting &&
      profile.social_media_links &&
      JSON.parse(profile.social_media_links).find(
        (social) => social.name === platform
      )
      ? 'none'
      : ''
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

  function executeAddTelephone(e) {
    if (e.key === 'Enter' && (!disablePhoneInput)) {
      e.preventDefault()
      setUser({
        ...user,
        telephones: [
          ...user.telephones,
          phoneValueRef.current.value
        ]
      })
      phoneValueRef.current.value = ''
      setDisablePhoneInput(true)
    }
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapperSponsor}>
        <Box style={{ display: showOrHide(profile.logo_url) }} width="100%">
          <LogoUrlInput handleSetField={handleSetField} logo={user.logo_url} role="sponsor" />
        </Box>
        <TextField
          id="name"
          name="name"
          style={{ display: showOrHide(profile.name) }}
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
          style={{ display: showOrHide(profile.address) }}
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
          style={{ display: showOrHide(profile.business_type) }}
          variant="outlined"
          className={classes.textField}
        >
          <InputLabel id="bussines-type-label">{t('signup.type')}</InputLabel>
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
        <TextField
          id="website"
          style={{ display: showOrHide(profile.website) }}
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
          id="about"
          style={{ display: showOrHide(profile.about) }}
          label={t('signup.about')}
          variant="outlined"
          placeholder={t('signup.aboutBusiness')}
          defaultValue={user.about}
          multiline
          rowsMax={10}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          fullWidth
          onChange={(event) => handleSetField('about', event.target.value)}
        />
        <Box
          width="100%"
          style={{
            display:
              isCompleting && profile.telephones && profile.telephones !== '[]'
                ? 'none'
                : ''
          }}
        >
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('common.telephone')}</Typography>
          <TextField
            id="telephone"
            label={t('signup.phoneNumber')}
            variant="outlined"
            placeholder={t('signup.phoneNumberPlaceholder')}
            fullWidth
            inputRef={phoneValueRef}
            onChange={(e) => setDisablePhoneInput(e.target.value.length === 0)}
            onKeyPress={(event) =>
              executeAddTelephone(event)
            }
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
          {user.telephones.length > 0 && (
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
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          style={{ display: showOrHide(profile.schedule) }}
          width="100%"
        >
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('common.schedule')}</Typography>
          <Schedule
            handleOnAddSchedule={(value) => handleOnAddSchedule(value)}
            data={user.schedule ? JSON.parse(user.schedule || '[]') : []}
            showSchedule
          />
        </Box>
        <Box
          width="100%"
          style={{
            display:
              isCompleting && profile.photos && profile.photos !== '[]'
                ? 'none'
                : ''
          }}
        >
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('profile.images')}</Typography>
          <TextField
            id="photo-url"
            label={t('editProfile.photoUrl')}
            variant="outlined"
            placeholder={t('editProfile.photoUrlPlaceholder')}
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
        </Box>
        <Box
          width="100%"
          style={{
            display: isCompleting && socialMedia.length === 3 ? 'none' : ''
          }}
        >
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('profile.socialMedia')}</Typography>
          <Box
            width="100%"
            style={{ display: showOrHideSocialMedia('facebook') }}
          >
            <SocialMediaTextField
              idText="facebook-profile-url"
              name="facebook"
              label={t('editProfile.facebookProfileUrl')}
              defaultValue={
                socialMedia.find((social) => social.name === 'facebook')
                  ? socialMedia.find((social) => social.name === 'facebook').url
                  : undefined
              }
              placeholder={t('editProfile.facebookProfileUrlPlaceholder')}
              icon={<FacebookIcon />}
              onChangeSocialMediaTextField={(url) =>
                handleOnSocialMediaTextFieldChange('facebook', url)
              }
            />
          </Box>
          <Box
            width="100%"
            style={{ display: showOrHideSocialMedia('instagram') }}
          >
            <SocialMediaTextField
              textFieldClass={classes.textField}
              idText="instagram-username"
              name="instagram"
              label={t('editProfile.instagramUsername')}
              defaultValue={
                socialMedia.find((social) => social.name === 'instagram')
                  ? socialMedia.find((social) => social.name === 'instagram')
                    .url
                  : undefined
              }
              placeholder={t('editProfile.instagramUsernamePlaceholder')}
              icon={<InstagramIcon />}
              onChangeSocialMediaTextField={(url) =>
                handleOnSocialMediaTextFieldChange('instagram', url)
              }
            />
          </Box>
          <Box
            width="100%"
            style={{ display: showOrHideSocialMedia('twitter') }}
          >
            <SocialMediaTextField
              textFieldClass={classes.textField}
              idText="twitter-username"
              name="twitter"
              label={t('editProfile.twitterUsername')}
              defaultValue={
                socialMedia.find((social) => social.name === 'twitter')
                  ? socialMedia.find((social) => social.name === 'twitter').url
                  : undefined
              }
              placeholder={t('editProfile.twitterUsernamePlaceholder')}
              icon={<TwitterIcon />}
              onChangeSocialMediaTextField={(url) =>
                handleOnSocialMediaTextFieldChange('twitter', url)
              }
            />
          </Box>
        </Box>
        {(isCompleting && profile.location === '') ||
          (!isCompleting && profile.location !== '') ? (
          <>
            <Divider className={classes.divider} />
            <Typography className={classes.boldText} variant="subtitle1">{t('miscellaneous.location')}</Typography>
            <MapEditLocation
              onGeolocationChange={handleOnGeolocationChange}
              markerType={user.geolocation ? SPONSOR : PENDING_SPONSOR}
              markerLocation={user.geolocation}
              width="100%"
              height={400}
              mb={1}
            />
          </>
        ) : null}
      </Box>
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
          onClick={() => prepareDataForSubmitting()}
        >
          {t('common.save')}
        </Button>
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
