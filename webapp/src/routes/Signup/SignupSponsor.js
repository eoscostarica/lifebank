import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import ReCAPTCHA from 'react-google-recaptcha'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import InputAdornment from '@material-ui/core/InputAdornment'

import MapSelectLocation from '../../components/MapSelectLocation'
import Schedule from '../../components/Schedule'
import { captchaConfig, constants } from '../../config'

const {
  LOCATION_TYPES: { SPONSOR },
  SPONSOR_TYPES
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(3)
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  tooltip: {
    maxWidth: 200,
    whiteSpace: 'normal'
  }
}))

const SponsorSignup = ({
  onSubmit,
  setField,
  user,
  loading,
  isUsernameValid,
  children
}) => {
  const classes = useStyles()
  const [recaptchaValue, serRecaptchaValue] = useState('')
  const [openTooltip, setOpenTooltip] = useState(null)

  const handleTooltipClose = (name) => {
    if (name !== openTooltip) {
      return
    }

    setOpenTooltip(null)
  }

  const handleTooltipOpen = (name) => {
    setOpenTooltip(name)
  }

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
        {children}
        <TextField
          id="secret"
          label="Secret"
          type="password"
          fullWidth
          placeholder="Your Secret"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('secret', event.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          placeholder="Your email"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('email', event.target.value)}
        />
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          placeholder="Your Sponsor Name"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('name', event.target.value)}
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
        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel id="bussines-type-label">Type</InputLabel>
          <Select
            labelId="bussines-type-label"
            id="bussines-type"
            value={user.bussines_type || ''}
            onChange={(event) => setField('bussines_type', event.target.value)}
            label="Type"
          >
            {SPONSOR_TYPES.map((option) => (
              <MenuItem key={`bussines-type-option-${option}`} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className={classes.textField}>
          <Schedule handleOnAddSchedule={handleOnAddSchedule} />
        </Box>
        <TextField
          id="covidImpact"
          label="Crisis Impact"
          variant="outlined"
          placeholder=""
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          multiline
          fullWidth
          rows={3}
          onChange={(event) => setField('covid_impact', event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ClickAwayListener
                  onClickAway={() => handleTooltipClose('covid_impact')}
                >
                  <div>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true
                      }}
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                      onClose={handleTooltipClose}
                      open={openTooltip === 'covid_impact'}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Describe how your business has been affected by the pandemic and how donors can help you."
                      arrow
                    >
                      <IconButton
                        onClick={() => handleTooltipOpen('covid_impact')}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </ClickAwayListener>
              </InputAdornment>
            )
          }}
        />
        <TextField
          id="benefitDescription"
          label="Value offer for Token"
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
            setField('benefit_description', event.target.value)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ClickAwayListener
                  onClickAway={() => handleTooltipClose('benefit_description')}
                >
                  <div>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true
                      }}
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                      onClose={handleTooltipClose}
                      open={openTooltip === 'benefit_description'}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="List and describe the promotions and benefits you will be offering in exchange for LIFE tokens."
                      arrow
                    >
                      <IconButton
                        onClick={() => handleTooltipOpen('benefit_description')}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </ClickAwayListener>
              </InputAdornment>
            )
          }}
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
        <ReCAPTCHA
          sitekey={captchaConfig.sitekey}
          onChange={(value) => serRecaptchaValue(value)}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Button
          disabled={
            !user.name ||
            !user.covid_impact ||
            !user.benefit_description ||
            !user.website ||
            !user.telephone ||
            !user.bussines_type ||
            !user.schedule ||
            !user.secret ||
            !user.geolocation ||
            !recaptchaValue ||
            !isUsernameValid ||
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
  loading: PropTypes.bool,
  isUsernameValid: PropTypes.bool,
  children: PropTypes.node
}

SponsorSignup.defaultProps = {}

export default SponsorSignup
