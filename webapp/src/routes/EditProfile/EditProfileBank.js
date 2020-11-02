import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Carousel from '../../components/Carousel'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'
import Logo from '../../components/Logo'
import Telephones from '../../components/Telephones'

import Schedule from '../../components/Schedule'
import MapEditLocation from '../../components/MapEditLocation'
import { constants } from '../../config'

const {
  LOCATION_TYPES: { LIFE_BANK }
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    }
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
  bloodDemand: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  levelReward: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiTextField-root': {
      width: 65,
      margin: '0px !important',
      '& input': {
        textAlign: 'center'
      }
    },
    '& h4': {
      letterSpacing: '0.25px',
      width: '65%'
    }
  },
  text: {
    color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
    margin: theme.spacing(2, 0)
  },
  markLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontSize: 18
    }
  },
  carouselComponent: {
    justifyContent: 'center',
    justifySelf: 'center'
  },
  slider: {
    padding: theme.spacing(0, 2)
  },
  midLabel: {
    marginLeft: theme.spacing(3)
  },
  addButtonContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  marginTitule:
  {
    marginTop: '3%'
  },
  carouselDiv: {
    width: '100%',
    objectFit: 'cover'
  },
  img: {
    maxWidth: '100%',
    objectFit: 'cover',
    marginBottom: '6%',
  },
  textField: {
    marginTop: theme.spacing(2)
  }
}))

const EditProfileBank = ({ profile, isCompleting, onSubmit, setField, loading, userName }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [disablePhotoUrlInput, setDisablePhotoUrlInput] = useState(true)
  const photoUrlValueRef = useRef(undefined)
  const phoneValueRef = useRef(undefined)
  const [disablePhoneInput, setDisablePhoneInput] = useState(true)
  const [username, setUserName] = useState(userName)
  const [user, setUser] = useState({
    about: profile.about,
    address: profile.address,
    telephones: profile.telephones && profile.telephones !== '' ? JSON.parse(profile.telephones) : [],
    email: profile.email,
    logo_url: profile.logo_url,
    photos: profile.photos && profile.photos !== '' ? JSON.parse(profile.photos) : [],
    geolocation: JSON.parse(profile.location),
    name: profile.name,
    schedule: profile.schedule,
    blood_urgency_level: profile.blood_urgency_level,
    has_immunity_test: Boolean(profile.has_immunity_test)
  })
  const handleOnGeolocationChange = useCallback(
    (geolocation) => handleSetField('geolocation', geolocation),
    [setField]
  )
  const marks = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    }
  ]
  const valueLabelFormat = (value) => {
    switch (value) {
      case 1:
        return t('editProfile.low')
      case 2:
        return t('editProfile.medium')
      case 3:
        return t('editProfile.high')
      default:
        return 'N/A'
    }
  }

  const handleOnAddSchedule = useCallback(
    (data) => handleSetField('schedule', JSON.stringify(data)),
    [setField]
  )

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const prepareDataForSubmitting = () => {
    const userToSubmit = { ...user }
    userToSubmit.telephones = JSON.stringify(userToSubmit.telephones)
    userToSubmit.photos = JSON.stringify(user.photos)
    onSubmit(userToSubmit, username, profile.account)
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <>
          {!isCompleting && user.logo_url && (
            <Logo showCaption logoUrl={user.logo_url} />
          )}
        </>
        <TextField
          id="logo-url"
          name="logo-input"
          style={{
            display: !isCompleting && user.logo_url ? 'block' : 'none'
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
          id="username"
          name="username"
          style={{ display: isCompleting && userName ? 'none' : '' }}
          label="Direction website"
          fullWidth
          variant="outlined"
          placeholder="URL website"
          defaultValue={userName}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">https://lifebank.io/info/</InputAdornment>,
          }}
          onChange={(event) => setUserName(event.target.value)}
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
          id="telephone"
          style={{ display: isCompleting && user.telephones ? 'none' : '' }}
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
        <div style={{ display: isCompleting && user.telephones ? 'none' : '' }}>
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
        </div>
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
          laceholder={t('aboutPlaceholder')}
          defaultValue={user.about}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            handleSetField('about', event.target.value)
          }
        />
        <Box style={{ display: isCompleting && user.schedule ? 'none' : '' }} width="100%" className={classes.textField}>
          <Schedule
            buttonText={t('schedule.editSchedule')}
            scheduleLoad={user.schedule}
            loading
            handleOnAddSchedule={handleOnAddSchedule}
          />
        </Box>
        <Box style={{ display: isCompleting && user.photos ? 'none' : '' }} className={classes.marginTitule}>
          <Typography variant="h4">{t('profile.images')}</Typography>
          <Typography variant="body1" />
        </Box>
        <TextField
          id="image-url"
          style={{ display: isCompleting && user.photos ? 'none' : '' }}
          label="Image url"
          variant="outlined"
          placeholder="Image url here"
          fullWidth
          inputRef={photoUrlValueRef}
          onChange={(e) => setDisablePhotoUrlInput(e.target.value.length < 1)}
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
        <div style={{ display: isCompleting && user.photos ? 'none' : '' }} className={classes.carouselDiv}>
          {user.photos.length > 0 && (
            <>{user.photos && <Grid container justify="center">
              <Grid
                item
                xs={12}
                sm={8}
                md={6}
                lg={4}
                className={classes.carouselComponent}
              >
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
              </Grid>
            </Grid>} </>
          )}
        </div>
        <Box style={{ display: isCompleting && user.geolocation ? 'none' : '' }} className={classes.marginTitule}>
          <Typography variant="h4">{t('profile.location')}</Typography>
          <Typography variant="body1" />
        </Box>
        <MapEditLocation
          style={{ display: isCompleting && user.geolocation ? 'none' : '' }}
          onGeolocationChange={handleOnGeolocationChange}
          markerLocation={user.geolocation}
          markerType={LIFE_BANK}
          width="100%"
          height={400}
          mb={1}
        />
        <div style={{ display: isCompleting && user.blood_urgency_level ? 'none' : '' }}>
          <Typography variant="h4">{t('editProfile.bloodDemandLevel')}</Typography>
          <Typography variant="body1" className={classes.text}>
            {t('editProfile.dragOrtap')}
          </Typography>
          <Box className={classes.bloodDemand}>
            <Box className={classes.markLabel}>
              <Typography variant="h4">{t('editProfile.low')}</Typography>
              <Typography variant="h4" className={classes.midLabel}>
                {t('editProfile.medium')}
              </Typography>
              <Typography variant="h4">{t('editProfile.high')}</Typography>
            </Box>
            <Box className={classes.slider}>
              <Slider
                valueLabelDisplay="off"
                color="secondary"
                defaultValue={user.blood_urgency_level}
                valueLabelFormat={valueLabelFormat}
                onChange={(event, value) =>
                  handleSetField('blood_urgency_level', value)
                }
                marks={marks}
                step={null}
                min={1}
                max={3}
              />
            </Box>
          </Box>
          <Box className={classes.levelReward}>
            <Typography variant="h4">{t('editProfile.lowLevelReward')}</Typography>
            <TextField
              id="lowLevelReward"
              type="number"
              disabled
              variant="outlined"
              defaultValue={1}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Box>
          <Box className={classes.levelReward}>
            <Typography variant="h4">{t('editProfile.mediumLevelReward')}</Typography>
            <TextField
              id="mediumLevelReward"
              type="number"
              disabled
              variant="outlined"
              defaultValue={2}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Box>
          <Box className={classes.levelReward}>
            <Typography variant="h4">{t('highLevelReward')}</Typography>
            <TextField
              id="urgentLevelReward"
              type="number"
              disabled
              variant="outlined"
              defaultValue={3}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Box>
        </div>
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

EditProfileBank.propTypes = {
  profile: PropTypes.object,
  isCompleting: PropTypes.bool,
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool,
  userName: PropTypes.string
}

export default EditProfileBank
