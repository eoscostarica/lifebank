import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Carousel from '../../components/Carousel'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'
import Telephones from '../../components/Telephones'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

import { VERIFY_USERNAME } from '../../gql'

import Schedule from '../../components/Schedule'
import Categories from '../../components/Categories'
import LogoUrlInput from '../../components/LogoUrlInput'
import MapEditLocation from '../../components/MapEditLocation'
import { constants } from '../../config'
import styles from './styles'

const useStyles = makeStyles(styles)

const {
  LOCATION_TYPES: { LIFE_BANK }
} = constants

const EditProfileBank = ({ profile, isCompleting, onSubmit, setField, loading, userName }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [disablePhotoUrlInput, setDisablePhotoUrlInput] = useState(true)
  const photoUrlValueRef = useRef(undefined)
  const phoneValueRef = useRef(undefined)
  const history = useHistory()
  const [severity] = useState('error')
  const [disablePhoneInput, setDisablePhoneInput] = useState(true)
  const [username, setUserName] = useState(userName.replaceAll('-', ' '))
  const [isValid, setIsvalid] = useState(true)
  const [isUnique, setIsUnique] = useState(true)
  const [firstRun, setFirstRun] = useState(true)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({
    about: profile.about,
    address: profile.address,
    telephones: profile.telephones ? JSON.parse(profile.telephones) : [],
    email: profile.email,
    logo_url: profile.logo_url,
    photos: profile.photos ? JSON.parse(profile.photos) : [],
    geolocation: profile.location ? JSON.parse(profile.location) : { longitude: -84.091273, latitude: 9.928209 },
    name: profile.name,
    schedule: profile.schedule,
    categories: profile.categories,
    blood_urgency_level: profile.blood_urgency_level,
    has_immunity_test: Boolean(profile.has_immunity_test),
    requirement: profile.requirement
  })
  const handleOnGeolocationChange = useCallback(
    (geolocation) => handleSetField('geolocation', geolocation),
    [setField]
  )

  const { refetch: checkUserName } = useQuery(VERIFY_USERNAME, {
    variables: {
      username: username,
      account: profile.account
    },
    skip: true
  })

  const isUsernameUnique = async () => {
    if(!profile.consent) {
      handleSnackbarClose()
    } else {
      if (profile && profile.consent) {
        const { data } = await checkUserName({
          username: username,
          account: profile.account
        })
  
        if (data) {
          if (data.user.length !== 0) setIsUnique(false)
          else setIsUnique(true)
        }
        setFirstRun(false)
      }
    }
  }

  const validUserName = (newUserName) => {
    const regularExpresion = /^[a-zA-Z0-9\s]*$/

    if (regularExpresion.test(newUserName)) {
      setIsvalid(true)
      setUserName(newUserName)
    }
    else setIsvalid(false)
  }

  const handleOnAddSchedule = useCallback(
    (data) => handleSetField('schedule', JSON.stringify(data)),
    [setField]
  )

  const handleOnAddCategories = useCallback(
    (data) => handleSetField('categories', JSON.stringify(data)),
    [setField]
  )

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  useEffect(() => {
    if (!firstRun) {
      if (isValid && isUnique) {
        const userToSubmit = { ...user }
        userToSubmit.telephones = JSON.stringify(userToSubmit.telephones)
        userToSubmit.photos = JSON.stringify(user.photos)
        onSubmit(userToSubmit, username, profile.account)
      }
      else document.getElementById("username").focus()
    }

  }, [isUnique, firstRun])

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

  const cannotEditProfileAlertClose = () => {
    history.push('/')
  }

  const handleSnackbarClose = (event, reason) => {
    if(event !== null) setOpen(!open)
  };

  const buttonCloseHandler = (
    <>
      <Button color="secondary" size="small" onClick={cannotEditProfileAlertClose}>
        {t('signup.noConsentNoEdit2')}
      </Button>
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="inherit"/>
      </IconButton>
    </>
  );

  return (
    <form autoComplete="off" className={classes.form}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={severity} action={buttonCloseHandler}>
          {t('signup.noConsentNoEdit')}
        </Alert>
      </Snackbar>

      <Box className={classes.textFieldWrapper}>
        <>
          {((isCompleting && profile.logo_url.length === 0) || (!isCompleting)) && (
            <LogoUrlInput handleSetField={handleSetField} logo={user.logo_url} role="lifebank" />
          )}
        </>
        <TextField
          id="username"
          name="username"
          style={{ display: isCompleting && userName ? 'none' : '' }}
          label={t('editProfile.urlWebsitePlaceHolder')}
          fullWidth
          variant="outlined"
          placeholder={t('editProfile.urlWebsitePlaceHolder')}
          defaultValue={username}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">https://lifebank.io/info/</InputAdornment>,
          }}
          helperText={
            !isValid
              ? t('editProfile.noValidUrl')
              : !isUnique
                ? t('editProfile.noUniqueUrl')
                : ''
          }
          onChange={(event) => validUserName(event.target.value)}
          error={!isValid || !isUnique}
        />
        <TextField
          id="fullname"
          name="name"
          style={{ display: isCompleting && user.name ? 'none' : '' }}
          label={t('profile.organization')}
          fullWidth
          variant="outlined"
          placeholder={t('editProfile.organizationPlaceholder')}
          defaultValue={user.name}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('name', event.target.value)}
        />
        <TextField
          id="address"
          style={{
            display: isCompleting && user.address ? 'none' : ''
          }}
          label={t('signup.address')}
          fullWidth
          variant="outlined"
          placeholder={t('signup.addressPlaceholder')}
          defaultValue={user.address}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('address', event.target.value)}
        />
        <TextField
          id="about"
          style={{
            display: isCompleting && user.about ? 'none' : ''
          }}
          label={t('signup.about')}
          fullWidth
          variant="outlined"
          placeholder={t('signup.aboutPlaceholder')}
          defaultValue={user.about}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            handleSetField('about', event.target.value)
          }
        />

        <TextField
          id="requirement"
          style={{
            display: isCompleting && user.requirement ? 'none' : ''
          }}
          label={t('signup.requirement')}
          fullWidth
          multiline
          rowsMax={6}
          variant="outlined"
          placeholder={t('signup.requirementPlaceholder')}
          defaultValue={user.requirement}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            handleSetField('requirement', event.target.value)
          }
        />

        <Box style={{ display: isCompleting && user.telephones ? 'none' : '' }} width="100%">
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('common.telephone')}</Typography>
          <TextField
            id="telephone"
            style={{ display: isCompleting && user.telephones ? 'none' : '' }}
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
        <Box style={{ display: isCompleting && user.schedule ? 'none' : '' }} width="100%" >
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('common.schedule')}</Typography>
          <Schedule
            buttonText={t('schedule.editSchedule')}
            scheduleLoad={user.schedule}
            loading
            handleOnAddSchedule={handleOnAddSchedule}
            data={user.schedule ? JSON.parse(user.schedule || '[]') : []}
            showSchedule
          />
        </Box>
        <Box style={{ display: isCompleting && JSON.parse(profile.photos).length > 0 ? 'none' : '' }} width="100%">
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('common.categories')}</Typography>
          <Typography variant="body1" className={classes.text}>
            {t('categories.description')}
          </Typography>
          <Box className={classes.boxCenter}>
            <Categories
              buttonText={t('categories.editCategories')}
              categoriesLoad={user.categories}
              loading
              handleOnAddCategories={handleOnAddCategories}
              data={user.categories ? JSON.parse(user.categories || '[]') : []}
              showCategories
            />
          </Box>
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('profile.images')}</Typography>
        </Box>
        <TextField
          id="image-url"
          style={{ display: isCompleting && JSON.parse(profile.photos).length > 0 ? 'none' : '' }}
          label={t('offersManagement.imageUrl')}
          variant="outlined"
          placeholder={t('offersManagement.imageUrl')}
          fullWidth
          inputRef={photoUrlValueRef}
          onChange={(e) => setDisablePhotoUrlInput(e.target.value.length < 1)}
          onKeyPress={(event) =>
            executeAddImage(event)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="secondary"
                  aria-label="add photo url"
                  disabled={disablePhotoUrlInput}
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
        <div style={{ display: isCompleting && JSON.parse(profile.photos).length > 0 ? 'none' : '' }} className={classes.carouselDiv}>
          {user.photos.length > 0 && (
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
        </div>
        <Box style={{ display: isCompleting && user.geolocation ? 'none' : '' }} width="100%">
          <Divider className={classes.divider} />
          <Typography className={classes.boldText} variant="subtitle1">{t('miscellaneous.location')}</Typography>
          <MapEditLocation
            style={{ display: isCompleting && user.geolocation ? 'none' : '' }}
            onGeolocationChange={handleOnGeolocationChange}
            markerLocation={user.geolocation}
            markerType={LIFE_BANK}
            width="100%"
            height={400}
            mb={1}
          />
        </Box>

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
          variant="contained"
          color="secondary"
          onClick={() => isUsernameUnique()}
          className={classes.saveBtn}
        >
          {t('common.save')}
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </form>
  )
}

EditProfileBank.propTypes = {
  profile: PropTypes.object,
  isCompleting: PropTypes.bool,
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool,
  userName: PropTypes.string
}

export default EditProfileBank
