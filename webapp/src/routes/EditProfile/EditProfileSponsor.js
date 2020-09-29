import React, { useState, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

import MapSelectLocation from '../../components/MapSelectLocation'
import Carousel from '../../components/Carousel'
import Schedule from '../../components/Schedule'
import Logo from '../../components/Logo'
import Telephones from '../../components/Telephones'
import { constants } from '../../config'

const {
  LOCATION_TYPES: { SPONSOR }
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
  imageContainer: {
    maxHeight: 430,
    '& > div.MuiCard-root': {
      padding: theme.spacing(2),
      backgroundColor: 'transparent',
      border: '1px solid lightgray'
    }
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
  }
}))

const EditProfileSponsor = ({ profile, isCompleting, onSubmit, loading }) => {
  const classes = useStyles()
  const phoneValueRef = useRef(undefined)
  const photoUrlValueRef = useRef(undefined)
  const [disablePhoneInput, setDisablePhoneInput] = useState(true)
  const [disablePhotoUrlInput, setDisablePhotoUrlInput] = useState(true)
  const [user, setUser] = useState({
    logo: profile.logo,
    name: profile.name,
    address: profile.address,
    email: profile.email,
    website: profile.website,
    benefit_description: profile.benefit_description,
    telephones: profile.telephones || [],
    bussines_type: profile.bussines_type,
    covid_impact: profile.covid_impact,
    geolocation: profile.location ? JSON.parse(profile.location) : null,
    schedule: profile.schedule,
    photos: profile.photos || []
  })

  const handleSetField = useMemo(
    () => (field, value) => {
      setUser({ ...user, [field]: value })
    },
    [user]
  )

  const handleOnAddStringifyValues = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <>
          {(isCompleting && !user.logo) ||
            (!isCompleting && !user.logo ? null : (
              <Logo showCaption logoUrl={user.logo} />
            ))}
        </>
        <TextField
          id="logo-url"
          name="logo-input"
          style={{ display: isCompleting && profile.logo ? 'none' : '' }}
          label="Logo url"
          variant="outlined"
          placeholder="Your logo url"
          defaultValue={user.logo}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('logo', event.target.value)}
        />
        <TextField
          id="name"
          name="name"
          style={{ display: isCompleting && profile.name ? 'none' : '' }}
          label="Name"
          variant="outlined"
          placeholder="Your Sponsor Name"
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
          label="Address"
          variant="outlined"
          placeholder="Your address here"
          value={user.address}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => handleSetField('address', event.target.value)}
        />
        <TextField
          id="email"
          style={{ display: isCompleting && profile.email ? 'none' : '' }}
          label="Email"
          variant="outlined"
          placeholder="Your email"
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
          label="Website"
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
          style={{ display: isCompleting && profile.telephones ? 'none' : '' }}
          label="Telephone"
          variant="outlined"
          placeholder="Telephone"
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
        {user.telephones && user.telephones.length > 0 && (
          <Telephones
            phones={user.telephones}
            deletePhone={(phone) =>
              setUser({
                ...user,
                telephones: user.telephones.filter((p) => p !== phone)
              })
            }
          />
        )}
        <TextField
          id="bussinesType"
          label="Type"
          style={{
            display: isCompleting && profile.bussines_type ? 'none' : ''
          }}
          variant="outlined"
          placeholder="Type"
          defaultValue={user.bussines_type}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) =>
            handleSetField('bussines_type', event.target.value)
          }
        />

        <Box
          style={{ display: isCompleting && profile.schedule ? 'none' : '' }}
          width="100%"
          className={classes.textField}
        >
          <Schedule
            handleOnAddSchedule={(value) =>
              handleOnAddStringifyValues('schedule', value)
            }
            data={user.schedule ? JSON.parse(user.schedule) : undefined}
            showSchedule
          />
        </Box>

        <TextField
          id="about"
          style={{
            display: isCompleting && profile.about ? 'none' : ''
          }}
          label="About"
          variant="outlined"
          placeholder="Description about your business here"
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
          label="Covid Impact"
          variant="outlined"
          placeholder=""
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
          label="Benefit description"
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
          style={{ display: isCompleting && profile.photos ? 'none' : '' }}
          label="Photo url"
          variant="outlined"
          placeholder="Your photo url here"
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
            {user.photos.length > 0 && <Carousel images={user.photos} />}{' '}
          </Box>
        )}

        <Typography variant="subtitle2" gutterBottom>
          Choose your location
        </Typography>

        <MapSelectLocation
          onGeolocationChange={(value) => handleSetField('geolocation', value)}
          markerType={SPONSOR}
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
            onClick={() => onSubmit(user)}
          >
            Save
          </Button>

          <Link to="/profile" className={classes.labelBtn}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.labelBtn}
            >
              cancel
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
