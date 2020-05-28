import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import MapSelectLocation from '../../components/MapSelectLocation'
import Schedule from '../../components/Schedule'
import { constants } from '../../config'

const {
  LOCATION_TYPES: { SPONSOR }
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
    alignItems: 'center'
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const SponsorSignup = ({ onSubmit, setField, user, loading }) => {
  const classes = useStyles()

  const handleOnGeolocationChange = useCallback(
    (geolocation) => setField('geolocation', geolocation),
    [setField]
  )

  const handleOnAddSchedule = useCallback(
    (data) => setField('schedule', JSON.stringify(data)),
    [setField]
  )

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <TextField
          id="sponsorName"
          label="Name"
          variant="outlined"
          placeholder="Your Sponsor Name"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('sponsorName', event.target.value)}
        />
        <TextField
          id="secret"
          label="secret"
          type="password"
          variant="outlined"
          placeholder="Secret"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('secret', event.target.value)}
        />
        <TextField
          id="website"
          label="Website"
          variant="outlined"
          placeholder="Website"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('website', event.target.value)}
        />
        <TextField
          id="telephone"
          label="Telephone"
          variant="outlined"
          placeholder="Telephone"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('telephone', event.target.value)}
        />
        <TextField
          id="bussinesType"
          label="type"
          variant="outlined"
          placeholder="Type"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('bussinesType', event.target.value)}
        />
        <Box width="100%" className={classes.textField}>
          <Schedule handleOnAddSchedule={handleOnAddSchedule} />
        </Box>

        <TextField
          id="covidImpact"
          label="Covid Impact"
          variant="outlined"
          placeholder=""
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) => setField('covidImpact', event.target.value)}
        />
        <TextField
          id="benefitDescription"
          label="Description of benefit"
          variant="outlined"
          placeholder=""
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) =>
            setField('benefitDescription', event.target.value)
          }
        />
        <Typography variant="subtitle2" gutterBottom>
          Choose your location
        </Typography>

        <MapSelectLocation
          onGeolocationChange={handleOnGeolocationChange}
          markerType={SPONSOR}
          width="100%"
          height={400}
          mb={1}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Button
          disabled={
            !user.sponsorName ||
            !user.covidImpact ||
            !user.benefitDescription ||
            !user.website ||
            !user.telephone ||
            !user.bussinesType ||
            !user.schedule ||
            !user.secret ||
            !user.geolocation ||
            loading
          }
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Continue
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </form>
  )
}

SponsorSignup.propTypes = {
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool
}

SponsorSignup.defaultProps = {}

export default SponsorSignup
