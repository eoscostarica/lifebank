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
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'

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
const CHARACTER_LIMIT = 512

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
  const [values, setValues] = useState({
    about: ""
  });
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
    if (!profile.consent) {
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
    if (field === 'about') {
      console.log(field)
      setValues({ ...values, [field]: value })
    }
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
    if (event !== null) setOpen(!open)
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
        <CloseIcon fontSize="inherit" />
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
      <Grid container spacing={3}>
        <Grid container item xs={12} direction="column">
          <Typography className={classes.boldText} variant="h2">
            Lifebank Account Profile
          </Typography>
          <Typography className={classes.paper}>
            Information
          </Typography>
        </Grid>
        <Grid container item xs={12} direction="column">
          <Typography className={classes.boldText} variant="h2">
            Name
          </Typography>
          <TextField
            id="fullname"
            name="name"
            style={{ display: isCompleting && user.name ? 'none' : '' }}
            //label={t('profile.organization')}
            fullWidth
            variant="filled"
            placeholder={t('editProfile.organizationPlaceholder')}
            defaultValue={user.name}
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => handleSetField('name', event.target.value)}
          />
        </Grid>
        <Grid container item xs={12} direction="column">
          <Typography className={classes.boldText} variant="h2">
            About
          </Typography>
          <TextField
            id="about"
            multiline
            rows={5}
            inputProps={{
              maxlength: CHARACTER_LIMIT
            }}
            helperText={`${values.about.length}/${CHARACTER_LIMIT}`}
            style={{
              display: isCompleting && user.about ? 'none' : ''
            }}
            //label={t('signup.about')}
            fullWidth
            height="200px"
            variant="filled"
            placeholder={t('signup.aboutPlaceholder')}
            defaultValue={user.about}
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) =>
              handleSetField('about', event.target.value)
            }
          />
        </Grid>
        <Grid container item xs={12} direction="column">
          <Typography className={classes.boldText} variant="h2">
            Contact Information
          </Typography>
          <Grid container item spacing={3}>
            <Grid item xs={4}>
              <TextField
                id="username"
                name="username"
                style={{ display: isCompleting && userName ? 'none' : '' }}
                label={t('editProfile.urlWebsitePlaceHolder')}
                fullWidth
                variant="filled"
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
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="phoneNumber1"
                style={{
                  display: isCompleting && user.address ? 'none' : ''
                }}
                //label={t('signup.address')}
                fullWidth
                variant="filled"
                placeholder={t("Phone Number 1")}
                //defaultValue={user.address}
                InputLabelProps={{
                  shrink: true
                }}
              //onChange={(event) => handleSetField('address', event.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="telephone"
                style={{ display: isCompleting && user.telephones ? 'none' : '' }}
                label={t('signup.phoneNumber')}
                variant="filled"
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
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="column">
          <Typography className={classes.boldText} variant="h2">
            Address and Location
          </Typography>
          <Typography className={classes.paper}>
            address information
          </Typography>
          <Grid container xs={12} spacing={3}>
            <Grid container item spacing={3} xs={6}>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  style={{
                    display: isCompleting && user.address ? 'none' : ''
                  }}
                  //label={t('signup.address')}
                  fullWidth
                  variant="filled"
                  placeholder={t('signup.addressPlaceholder')}
                  defaultValue={user.address}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => handleSetField('address', event.target.value)}
                />
              </Grid>
              <Grid
                container
                item xs={12}
                justify="space-between"
              >
                <Grid item xs={5}>
                  <TextField
                    id="city"
                    style={{
                      display: isCompleting && user.address ? 'none' : ''
                    }}
                    //label={t('signup.address')}
                    fullWidth
                    variant="filled"
                    placeholder={t('City')}
                    defaultValue={user.address}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={(event) => handleSetField('address', event.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="state"
                    style={{
                      display: isCompleting && user.address ? 'none' : ''
                    }}
                    //label={t('signup.address')}
                    fullWidth
                    variant="filled"
                    placeholder={t('State/Province')}
                    defaultValue={user.address}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={(event) => handleSetField('address', event.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="country"
                  style={{
                    display: isCompleting && user.address ? 'none' : ''
                  }}
                  //label={t('signup.address')}
                  fullWidth
                  variant="filled"
                  placeholder={t('Country')}
                  defaultValue={user.address}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => handleSetField('address', event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Box style={{ display: isCompleting && user.geolocation ? 'none' : '' }} width="100%">
                <MapEditLocation
                  style={{ display: isCompleting && user.geolocation ? 'none' : '' }}
                  onGeolocationChange={handleOnGeolocationChange}
                  markerLocation={user.geolocation}
                  markerType={LIFE_BANK}
                  width="100%"
                  height={287}
                  mb={1}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
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
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="column">
          <Typography className={classes.boldText}>
            Imagery
          </Typography>
          <Typography className={classes.paper}>
            Type a link to your images so your Lifebank page is shown more atractive to your donors. You can upload images to IMGUR.com
            Logo or Avatar image must be a square image, no bigger than 500px or heavier than 250kb.
            Banner Image should be a horizontal image, no bigger than 1200px or heavier than 1mb.
          </Typography>
          <Grid container item xs={6} >
            <>
              {((isCompleting && profile.logo_url.length === 0) || (!isCompleting)) && (
                <LogoUrlInput handleSetField={handleSetField} logo={user.logo_url} role="lifebank" />
              )}
            </>
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
          </Grid>
        </Grid>
      </Grid>
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
