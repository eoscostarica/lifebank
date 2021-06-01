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
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import PhoneNumber from 'material-ui-phone-number'


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
const SPACING = 2

const EditProfileBank = ({ profile, onSubmit, setField, loading, userName }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [disablePhotoUrlInput, setDisablePhotoUrlInput] = useState(true)
  const photoUrlValueRef = useRef(undefined)
  const [phoneValue1, setPhoneValue1] = useState(profile.telephones ? JSON.parse(profile.telephones)[0] : [])
  const [phoneValue2, setPhoneValue2] = useState(profile.telephones ? JSON.parse(profile.telephones)[1] : [])
  const [address, setAddress] = useState(profile.address ? profile.address.split(',')[0] : '')
  const [city, setCity] = useState(profile.address ? profile.address.split(',')[1] : '')
  const [state, setState] = useState(profile.address ? profile.address.split(',')[2] : '')
  const [country, setCountry] = useState(profile.address ? profile.address.split(',')[3] : '')
  const history = useHistory()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [username, setUserName] = useState(userName.replaceAll('-', ' '))
  const [isValid, setIsvalid] = useState(true)
  const [isUnique, setIsUnique] = useState(true)
  const [firstRun, setFirstRun] = useState(true)
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
    addAddress()
    if (!profile.consent) {
      setOpenSnackbar({
        show: true,
        message: t('signup.noConsentNoEdit'),
        severity: 'error'
      })
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

  const addAddress = () => {
    const completeAddress = address.concat(',', city, ',', state, ',', country)
    handleSetField('address', completeAddress)
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
    (data) => handleSetField('schedule', JSON.stringify(data))
  )

  const handleOnAddCategories = useCallback(
    (data) => handleSetField('categories', JSON.stringify(data))
  )

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
    if (field === 'about') {
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

  useEffect(() => {
    setUser({
      ...user,
      telephones: [
        phoneValue1,
        phoneValue2
      ]
    })
  }, [phoneValue1, phoneValue2])

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

  const cannotEditProfileAlertClose = () => {
    history.push('/')
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
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
      <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert severity={openSnackbar.severity} action={buttonCloseHandler}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
      <Grid container spacing={SPACING}>
        <Grid container item xs={12} spacing={SPACING} direction="column">
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h2">
              {t('editProfile.editTitleLifebank')}
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
              className={classes.textField}
              id="fullname"
              name="name"
              fullWidth
              variant="filled"
              defaultValue={user.name}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputLabel >
                    {t('editProfile.organizationPlaceholder')}
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
              className={classes.textField}
              id="about"
              multiline
              rows={5}
              helperText={`${values.about.length}/${CHARACTER_LIMIT}`}
              fullWidth
              variant="filled"
              defaultValue={user.about}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputLabel >
                    {t('signup.aboutPlaceholder')}
                  </InputLabel>
                ),
                maxLength: CHARACTER_LIMIT
              }}
              onChange={(event) =>
                handleSetField('about', event.target.value)
              }
            />
          </Grid>
        </Grid>
        <Grid container item spacing={SPACING} xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.boldTextVariant} variant="h4">
              {t('editProfile.contactInformation')}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              id="conctactInformacion"
              name="conctactInformacion"
              fullWidth
              variant="filled"
              defaultValue={username}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">https://lifebank.io/info/</InputAdornment>,
                endAdornment: (
                  <InputLabel >
                    {t('editProfile.urlWebsitePlaceHolder')}
                  </InputLabel>
                ),
              }}
              helperText={
              (!isValid) ? t('editProfile.noValidUrl')
              :
                (!isUnique) ?  t('editProfile.noUniqueUrl')
                : ''
              }
              onChange={(event) => validUserName(event.target.value)}
              error={!isValid || !isUnique}
            />
          </Grid>
          <Grid item xs={4}>
            <PhoneNumber
              className={classes.textField}
              defaultCountry='cr'
              value={user.telephones[0]}
              fullWidth
              label={t('signup.phoneNumber')}
              id="phoneNumber1"
              variant="filled"
              onChange={(event) => setPhoneValue1(event)}
            />
          </Grid>
          <Grid item xs={4}>
            <PhoneNumber
              className={classes.textField}
              defaultCountry='cr'
              fullWidth
              value={user.telephones[1]}
              label={t('signup.phoneNumber')}
              id="phoneNumber1"
              variant="filled"
              onChange={(event) => setPhoneValue2(event)}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={SPACING} justify="space-between">
          <Grid item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.addressInformation')}
            </Typography>
            <Typography className={classes.text} variant="body1">
              {t('editProfile.addressDescription')}
            </Typography>
          </Grid>
          <Grid container item xs={6} spacing={SPACING}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
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
                      {t('signup.addressPlaceholder')}
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
                    className={classes.textField}
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
                    className={classes.textField}
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
                className={classes.textField}
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
          </Grid>
          <Grid item xs={6}>
            <Box width="100%">
              <MapEditLocation
                onGeolocationChange={handleOnGeolocationChange}
                markerLocation={user.geolocation}
                markerType={LIFE_BANK}
                className={classes.mapField}
                mb={1}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={SPACING}>
          <Grid item xs={12}>
            <Box className={classes.componentBoxWrp} width="100%" >
              <Typography className={classes.boldText} variant="h4">{t('common.schedule')}</Typography>
              <Box className={classes.componentBox}>
                <Schedule
                  buttonText={t('schedule.editSchedule')}
                  scheduleLoad={user.schedule}
                  loading
                  handleOnAddSchedule={(value) => handleOnAddSchedule(value)}
                  data={user.schedule ? JSON.parse(user.schedule || '[]') : []}
                  showSchedule
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.componentBoxWrp} width="100%">
              <Typography className={classes.boldText} variant="h4">{t('common.categories')}</Typography>
              <Typography variant="body1" className={classes.text}>
                {t('categories.description')}
              </Typography>
              <Box className={classes.componentBox}>
                <Box className={classes.boxCenter}>
                  <Categories
                    buttonText={t('categories.editCategories')}
                    categoriesLoad={user.categories}
                    loading
                    handleOnAddCategories={(value) => handleOnAddCategories(value)}
                    data={user.categories ? JSON.parse(user.categories || '[]') : []}
                    showCategories
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="column" spacing={SPACING}>
          <Grid container item xs={12}>
            <Typography className={classes.boldText} variant="h4">
              {t('editProfile.imagery')}
            </Typography>
            <Typography className={classes.text} variant="body1">
              {t('editProfile.imageryDescription')}
            </Typography>
          </Grid>
          <Grid container item xs={12} justify="space-between">
            <Grid item xs={6}>
              <Box className={classes.leftBox}>
                <>
                  <LogoUrlInput handleSetField={handleSetField} logo={user.logo_url} role="lifebank" />
                </>
                <TextField
                  className={classes.textField}
                  id="image-url"
                  variant="filled"
                  fullWidth
                  inputRef={photoUrlValueRef}
                  onChange={(e) => setDisablePhotoUrlInput(e.target.value.length < 1)}
                  onKeyPress={(event) =>
                    executeAddImage(event)
                  }
                  InputProps={{
                    endAdornment: (
                      <>
                        <InputLabel >
                          {t('offersManagement.imageUrl')}
                        </InputLabel>
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
                      </>
                    )
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  className={classes.textField}
                />
              </Box>
            </Grid>
            <Grid item xs={6} >
              <Box className={classes.rightBox}>
                <div className={classes.carouselDiv}>
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
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.btnWrapper}>
            <Button
              variant="contained"
              color="secondary"
              onClick={isUsernameUnique}
              className={classes.saveBtn}
            >
              {t('common.save')}
            </Button>
            <Link to="/profile" className={classes.routerLink}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.cancelBtn}
              >
                {t('common.cancel')}
              </Button>
            </Link>
            {loading && <CircularProgress />}
          </Box>
        </Grid>
      </Grid>
    </form >
  )
}

EditProfileBank.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool,
  userName: PropTypes.string
}

export default EditProfileBank
