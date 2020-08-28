import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import MenuItem from '@material-ui/core/MenuItem'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '90vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '60vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw'
    },
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(10)
  },
  radioGroup: {
    marginTop: theme.spacing(3),
    width: '100%'
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  limitationHandlingPaper: {
    width: '90%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    margin: 'auto',
    border: `0.5px dashed ${theme.palette.secondary.light}`
  },
  addButtonContainer: {
    textAlign: 'center',
    marginTop: '5px'
  }
}))

const LimitationHandling = ({ classes }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <Paper className={classes.limitationHandlingPaper}>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        Limitation Handling
      </Typography>
      <TextField
        id="secret"
        label="Quantity"
        type="text"
        fullWidth
        placeholder="Available service quantity"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        className={classes.textField}
        // onChange={(event) => setField('secret', event.target.value)}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            inputVariant="outlined"
            margin="normal"
            id="date-picker-dialog"
            label="Select start offer date"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <KeyboardDatePicker
            inputVariant="outlined"
            margin="normal"
            id="date-picker-dialog"
            label="Select end offer date"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <Typography variant="caption">No deadlines selected *</Typography>
        </Grid>
      </MuiPickersUtilsProvider>
    </Paper>
  )
}

const OffersManagement = () => {
  const classes = useStyles()
  const [offer, setOffer] = useState({ limitation: true, images: [] })
  const imgUrlValueRef = useRef('')

  return (
    <form autoComplete="off" className={classes.form}>
      <Typography variant="h2" style={{ textAlign: 'center' }}>
        Offers Management
      </Typography>
      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel id="bussines-type-label">Select offer type</InputLabel>
        <Select
          labelId="offer-type-label"
          id="offer-type"
          value={offer.offer_type || ''}
          onChange={(event) =>
            setOffer({ ...offer, offer_type: event.target.value })
          }
          label="Type"
        >
          <MenuItem value="discount">Discount</MenuItem>
          <MenuItem value="gift">Gift</MenuItem>
          <MenuItem value="benefit">Benefit</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            //checked={state.checkedB}
            //onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Online only"
      />
      <TextField
        id="offer-description"
        label="Offer description"
        variant="outlined"
        placeholder="Description here"
        fullWidth
        InputLabelProps={{
          shrink: true
        }}
        className={classes.textField}
      />
      <FormControl component="fieldset" className={classes.radioGroup}>
        <Typography variant="h3">Redeem availability</Typography>
        <RadioGroup
          aria-label="limitation"
          value={offer.limitation || undefined}
          onChange={(event) =>
            setOffer({ ...offer, limitation: event.target.value })
          }
        >
          <FormControlLabel value="true" control={<Radio />} label="Limited" />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Unlimited"
          />
        </RadioGroup>
        {offer && offer.limitation === 'true' && (
          <LimitationHandling classes={classes} />
        )}
      </FormControl>
      <TextField
        id="image-url"
        label="Image url"
        variant="outlined"
        placeholder="Image url here"
        fullWidth
        inputRef={imgUrlValueRef}
        InputLabelProps={{
          shrink: true
        }}
        className={classes.textField}
      />
      <Box className={classes.addButtonContainer}>
        <Button
          onClick={() =>
            setOffer({
              ...offer,
              images: [...offer.images, imgUrlValueRef.current.value]
            })
          }
          size="small"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Add image url
        </Button>
      </Box>
      {offer.images.length > 0 && (
        <Carousel
          plugins={[
            'infinite',
            'arrows',
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 2
              }
            }
          ]}
        >
          {offer.images.map((url, key) => (
            <img src={url} key={key} />
          ))}
        </Carousel>
      )}
      <Box style={{ marginTop: '10px' }} className={classes.addButtonContainer}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  )
}

LimitationHandling.propTypes = {
  classes: PropTypes.object
}

LimitationHandling.defaultProps = {}

OffersManagement.propTypes = {
  user: PropTypes.object,
  setField: PropTypes.func
}

OffersManagement.defaultProps = {}

export default OffersManagement
