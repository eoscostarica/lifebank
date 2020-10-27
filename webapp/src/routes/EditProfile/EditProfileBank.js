import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'

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
  slider: {
    padding: theme.spacing(0, 2)
  },
  midLabel: {
    marginLeft: theme.spacing(3)
  }
}))

const EditProfileBank = ({ profile, onSubmit, setField, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [user, setUser] = useState({
    description: profile.description,
    address: profile.address,
    phone_number: profile.phone_number,
    email: profile.email,
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

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <TextField
          id="fullname"
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
          id="phone-number"
          label={t('signup.phoneNumber')}
          fullWidth
          variant="outlined"
          placeholder={t('signup.phoneNumberPlaceholder')}
          defaultValue={user.phone_number}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            handleSetField('phone_number', event.target.value)
          }
        />
        <TextField
          id="address"
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
          id="description"
          label={t('signup.about')}
          fullWidth
          variant="outlined"
          placeholder={t('aboutPlaceholder')}
          defaultValue={user.description}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) =>
            handleSetField('description', event.target.value)
          }
        />
        <Box width="100%" className={classes.textField}>
          <Schedule
            buttonText={t('schedule.editSchedule')}
            scheduleLoad={user.schedule}
            loading
            handleOnAddSchedule={handleOnAddSchedule}
          />
        </Box>
        <Box className={classes.rowBox}>
          <Typography variant="h4">{t('profile.location')}</Typography>
          <Typography variant="body1" />
        </Box>
        <MapEditLocation
          onGeolocationChange={handleOnGeolocationChange}
          markerLocation={user.geolocation}
          markerType={LIFE_BANK}
          width="100%"
          height={400}
          mb={1}
        />
        |
        <Typography variant="h4">
          {t('editProfile.bloodDemandLevel')}
        </Typography>
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
          <Typography variant="h4">
            {t('editProfile.lowLevelReward')}
          </Typography>
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
          <Typography variant="h4">
            {t('editProfile.mediumLevelReward')}
          </Typography>
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
      </Box>
      <Box className={classes.btnWrapper}>
        <Box className={classes.boxBtn}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit(user)}
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
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileBank
