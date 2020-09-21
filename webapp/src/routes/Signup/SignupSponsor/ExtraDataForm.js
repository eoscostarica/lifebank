import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import InputAdornment from '@material-ui/core/InputAdornment'

import { SIGNUP_MUTATION } from '../../gql'

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

const ExtraDataForm = () => {
  const classes = useStyles()
  const [sponsor, setSponsor] = useState()

  const [
    signup,
    { loading: signupLoading, data: { signup: signupResult } = {} }
  ] = useMutation(SIGNUP_MUTATION)

  const handleSignup = () => {
    const { username, secret, ...profile } = sponsor

    signup({
      variables: {
        profile
      }
    })
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
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
          onChange={(event) =>
            setSponsor({ ...sponsor, email: event.target.value })
          }
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
          onChange={(event) =>
            setSponsor({ ...sponsor, name: event.target.value })
          }
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
          onChange={(event) =>
            setSponsor({ ...sponsor, website: event.target.value })
          }
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
          onChange={(event) =>
            setSponsor({ ...sponsor, telephone: event.target.value })
          }
        />
        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel id="bussines-type-label">Type</InputLabel>
          <Select
            labelId="bussines-type-label"
            id="bussines-type"
            value={sponsor.bussines_type || ''}
            onChange={(event) =>
              setSponsor({ ...sponsor, bussines_type: event.target.value })
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
          onChange={(event) =>
            setSponsor({ ...sponsor, covid_impact: event.target.value })
          }
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
          label="Benefit description"
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
            setSponsor({ ...sponsor, benefit_description: event.target.value })
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
      </Box>
      <Box className={classes.btnWrapper}>
        <Button
          disabled={
            !sponsor.name ||
            !sponsor.covid_impact ||
            !sponsor.benefit_description ||
            !sponsor.website ||
            !sponsor.telephone ||
            !sponsor.bussines_type ||
            !sponsor.schedule ||
            !sponsor.secret ||
            !sponsor.geolocation ||
            !recaptchaValue ||
            signupLoading
          }
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Continue
        </Button>
        {signupLoading && <CircularProgress />}
      </Box>
    </form>
  )
}

ExtraDataForm.defaultProps = {}

export default ExtraDataForm
