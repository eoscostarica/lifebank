import React, { useState, useEffect, useRef } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
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
import { CREATE_OFFER_MUTATION, PROFILE_ID_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({}))

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
    padding: theme.spacing(5, 2),
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
  },
  carouselPictureContainer: {
    maxHeight: '440px',
    maxWidth: '600px'
  }
}))

const LimitationHandling = ({
  classes,
  setQuantity,
  setStartDate,
  setEndDate
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState(new Date())

  return (
    <Paper className={classes.limitationHandlingPaper}>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        Limitation Handling
      </Typography>
      <TextField
        id="secret"
        label="Quantity"
        type="number"
        fullWidth
        placeholder="Available service quantity"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        className={classes.textField}
        onChange={(event) => setQuantity(Number(event.target.value))}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            inputVariant="outlined"
            margin="normal"
            id="date-picker-dialog"
            label="Select start offer date"
            format="MM/dd/yyyy"
            value={selectedStartDate}
            onChange={(date) => {
              setStartDate(date)
              setSelectedStartDate(date)
            }}
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
            value={selectedEndDate}
            onChange={(date) => {
              setEndDate(date)
              setSelectedEndDate(date)
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Paper>
  )
}

const AddOffer = () => {
  const classes = useStyles()
  const [offer, setOffer] = useState({
    limited: true,
    images: [],
    online_only: true
  })
  const imgUrlValueRef = useRef('')
  const [actualImageIndex, setActualImageIndex] = useState(0)
  const [
    createOffer,
    {
      loading: createOfferLoading,
      data: { create_offer: createOfferResult } = {}
    }
  ] = useMutation(CREATE_OFFER_MUTATION)

  const [
    loadProfileID,
    { data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_ID_QUERY, { fetchPolicy: 'network-only' })

  useEffect(() => {
    loadProfileID()
  }, [loadProfileID])

  const handleSubmit = () => {
    const {
      offer_type,
      online_only,
      description,
      limited,
      quantity,
      start_date,
      end_date
    } = offer

    let images = JSON.stringify(offer.images)
    const sponsor_id = profile.id

    createOffer({
      variables: {
        offer_type,
        online_only,
        description,
        limited,
        quantity,
        start_date,
        end_date,
        images,
        sponsor_id
      }
    })
  }

  useEffect(() => {
    if (createOfferResult)
      console.log('Offer result success ', createOfferResult)
  }, [createOfferResult])

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
            checked={offer.online_only}
            onChange={(event) =>
              setOffer({ ...offer, online_only: event.target.checked })
            }
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
        onChange={(event) =>
          setOffer({ ...offer, description: event.target.value })
        }
        InputLabelProps={{
          shrink: true
        }}
        className={classes.textField}
      />
      <FormControl component="fieldset" className={classes.radioGroup}>
        <Typography variant="h3">Redeem availability</Typography>
        <RadioGroup
          aria-label="limitation"
          value={offer.limited || undefined}
          onChange={(event) => {
            setOffer({ ...offer, limited: event.target.value })
          }}
        >
          <FormControlLabel
            value={'true'}
            control={<Radio />}
            label="Limited"
          />
          <FormControlLabel
            value={'false'}
            control={<Radio />}
            label="Unlimited"
          />
        </RadioGroup>
        {offer && offer.limited === 'true' && (
          <LimitationHandling
            setQuantity={(val) => setOffer({ ...offer, quantity: val })}
            setStartDate={(val) => setOffer({ ...offer, start_date: val })}
            setEndDate={(val) => setOffer({ ...offer, end_date: val })}
            classes={classes}
          />
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
          onClick={() => {
            setOffer({
              ...offer,
              images: [...offer.images, imgUrlValueRef.current.value]
            })
            imgUrlValueRef.current.value = ''
          }}
          size="small"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Add image url
        </Button>
      </Box>
      {offer.images.length > 0 && (
        <Box borderRadius="8px" boxShadow={2}>
          <Carousel
            value={actualImageIndex}
            onChange={(val) => setActualImageIndex(val)}
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
            {offer.images.map &&
              offer.images.map((url, key) => (
                <Box key={key} className={classes.carouselPictureContainer}>
                  <img
                    className={classes.imgDot}
                    src={url}
                    key={key}
                    alt={`${key}`}
                  />
                </Box>
              ))}
          </Carousel>
          <Box display="flex" justifyContent="center" alignContent="center">
            <Button
              disabled={actualImageIndex === 0}
              onClick={() => setActualImageIndex(actualImageIndex - 1)}
            >
              Prev
            </Button>
            <Button
              disabled={actualImageIndex === offer.images.length - 1}
              onClick={() => setActualImageIndex(actualImageIndex + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
      <Box style={{ marginTop: '10px' }} className={classes.addButtonContainer}>
        <Button
          disabled={
            createOfferLoading || !offer.description || !offer.start_date
          }
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

LimitationHandling.propTypes = {
  classes: PropTypes.object,
  setQuantity: PropTypes.func,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func
}

LimitationHandling.defaultProps = {}

AddOffer.propTypes = {}

AddOffer.defaultProps = {}
