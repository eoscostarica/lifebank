import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
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
import MenuItem from '@material-ui/core/MenuItem'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import { useTranslation } from 'react-i18next'
import '@brainhubeu/react-carousel/lib/style.css'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import { CREATE_OFFER_MUTATION, UPDATE_OFFER_MUTATION } from '../../gql'

import CarouselComponent from '../../components/Carousel'

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

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
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  }
}))

const LimitationHandling = ({
  classes,
  setQuantity,
  setStartDate,
  setEndDate
}) => {
  const { t } = useTranslation('translations')
  const [selectedStartDate, setSelectedStartDate] = useState(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState(new Date())

  return (
    <Paper className={classes.limitationHandlingPaper}>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        {t('offersManagement.limitationHandling')}
      </Typography>
      <TextField
        id="secret"
        label={t('offersManagement.quantity')}
        type="number"
        fullWidth
        placeholder={t('offersManagement.quantityPlaceholder')}
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
            id="start-date-picker-dialog"
            label={t('offersManagement.selectStartOfferDate')}
            format="MM/dd/yyyy"
            value={selectedStartDate}
            onChange={(date) => {
              setStartDate(date)
              setSelectedStartDate(date)
            }}
            KeyboardButtonProps={{
              'aria-label': t('offersManagement.startDate')
            }}
          />
          <KeyboardDatePicker
            inputVariant="outlined"
            margin="normal"
            id="end-date-picker-dialog"
            label={t('offersManagement.selectEndOfferDate')}
            format="MM/dd/yyyy"
            value={selectedEndDate}
            onChange={(date) => {
              setEndDate(date)
              setSelectedEndDate(date)
            }}
            KeyboardButtonProps={{
              'aria-label': t('offersManagement.endDate')
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Paper>
  )
}

const GenericOfferFormComponent = ({
  open,
  setOpen,
  sponsor_id,
  isEditing,
  setOffers,
  data
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [disableUrlInput, setDisableUrlInput] = useState(true)
  const imgUrlValueRef = useRef(undefined)
  const [offer, setOffer] = useState()
  const [updatedOffer, setUpdatedOffer] = useState()
  const [openSnackbar, setOpenSnackbar] = useState({
    show: false,
    message: '',
    severity: 'success'
  })

  const [
    createOffer,
    {
      loading: createOfferLoading,
      data: { insert_offer_one: createOfferResult } = {}
    }
  ] = useMutation(CREATE_OFFER_MUTATION)

  const [
    updateOffer,
    {
      loading: updateOfferLoading,
      data: { update_offer: updateOfferResult } = {}
    }
  ] = useMutation(UPDATE_OFFER_MUTATION)

  const handleSubmit = () => {
    const {
      offer_type,
      online_only,
      description,
      limited,
      quantity,
      start_date,
      end_date,
      offer_name,
      id,
      active,
      cost_in_tokens
    } = offer

    const images = JSON.stringify(offer.images)

    if (!isEditing)
      createOffer({
        variables: {
          offer_type,
          online_only: online_only || false,
          description,
          limited,
          quantity: quantity || undefined,
          start_date: start_date || undefined,
          end_date: end_date || undefined,
          cost_in_tokens,
          images,
          sponsor_id,
          active: true,
          offer_name: offer_name
        }
      })
    else {
      updateOffer({
        variables: {
          offer_type,
          online_only,
          description,
          limited,
          quantity: quantity || undefined,
          start_date: start_date || undefined,
          end_date: end_date || undefined,
          cost_in_tokens,
          images,
          offer_name,
          id,
          active
        }
      })
      setUpdatedOffer({
        offer_type,
        online_only,
        description,
        limited,
        quantity: quantity || undefined,
        start_date: start_date || undefined,
        end_date: end_date || undefined,
        cost_in_tokens,
        images,
        offer_name,
        id,
        active
      })
    }
  }

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return

    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  useEffect(() => {
    if (data) {
      data.images = JSON.parse(data.images)
      setOffer(data)
    } else
      setOffer({
        limited: true,
        images: [],
        online_only: true
      })
  }, [data])

  useEffect(() => {
    if (updateOfferResult) {
      setOpenSnackbar({
        show: true,
        message: t('offersManagement.offerUpdatedMessage'),
        severity: 'success'
      })
      setOffers((offs) =>
        offs.map((offr) => {
          if (offr.id === updatedOffer.id) offr = updatedOffer
          return offr
        })
      )
    }
  }, [updateOfferResult])

  useEffect(() => {
    if (createOfferResult) {
      setOpenSnackbar({
        show: true,
        message: t('offersManagement.offerCreatedMessage'),
        severity: 'success'
      })
      setOffers((offs) => [...offs, createOfferResult])
    }
  }, [createOfferResult])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h1" className={classes.title}>
            {t('offersManagement.addOffer')}
          </Typography>
        </Toolbar>
      </AppBar>
      {offer && (
        <form autoComplete="off" className={classes.form}>
          <TextField
            id="offer-name"
            label={t('offersManagement.offerName')}
            variant="outlined"
            placeholder={t('offersManagement.offerNamePlaceholder')}
            value={offer.offer_name || undefined}
            fullWidth
            onChange={(event) =>
              setOffer({ ...offer, offer_name: event.target.value })
            }
            InputLabelProps={{
              shrink: true
            }}
            className={classes.textField}
          />
          <FormControl variant="outlined" className={classes.textField}>
            <InputLabel id="bussines-type-label">
              {t('offersManagement.selectOfferType')}
            </InputLabel>
            <Select
              labelId="offer-type-label"
              id="offer-type"
              value={offer.offer_type || ''}
              onChange={(event) =>
                setOffer({ ...offer, offer_type: event.target.value })
              }
              label={t('offersManagement.type')}
            >
              <MenuItem value="discount">
                {t('offersManagement.discount')}
              </MenuItem>
              <MenuItem value="gift">{t('offersManagement.gift')}</MenuItem>//
              <MenuItem value="benefit">
                {t('offersManagement.benefit')}
              </MenuItem>
              <MenuItem value="other">{t('offersManagement.other')}</MenuItem>//
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
            label={t('offersManagement.onlineOnly')}
          />
          <TextField
            id="offer-description"
            label={t('offersManagement.offerDescription')}
            variant="outlined"
            placeholder={t('offersManagement.offerDescriptionPlaceholder')}
            value={offer.description || undefined}
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
            <Typography variant="h3">
              {t('offersManagement.redeemAvailability')}
            </Typography>
            <RadioGroup
              aria-label="limitation"
              value={String(offer.limited) || undefined}
              onChange={(event) => {
                setOffer({ ...offer, limited: event.target.value })
              }}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label={t('offersManagement.limited')}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label={t('offersManagement.unlimited')}
              />
            </RadioGroup>
            {(offer.limited === true || offer.limited === 'true') && (
              <LimitationHandling
                setQuantity={(val) => setOffer({ ...offer, quantity: val })}
                setStartDate={(val) => setOffer({ ...offer, start_date: val })}
                setEndDate={(val) => setOffer({ ...offer, end_date: val })}
                classes={classes}
              />
            )}
          </FormControl>
          <TextField
            id="cost-in-tokens"
            label={t('offersManagement.costInTokens')}
            variant="outlined"
            type="number"
            placeholder={t('offersManagement.costInTokensPlaceholder')}
            value={offer.cost_in_tokens || undefined}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) =>
              setOffer({ ...offer, cost_in_tokens: event.target.value })
            }
            className={classes.textField}
          />
          <TextField
            id="image-url"
            label={t('offersManagement.imageUrl')}
            variant="outlined"
            placeholder={t('offersManagement.imageUrlPlaceholder')}
            fullWidth
            inputRef={imgUrlValueRef}
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => setDisableUrlInput(e.target.value.length < 1)}
            className={classes.textField}
          />
          <Box className={classes.addButtonContainer}>
            <div>
              {offer.images.length < 1 ? (
                <Typography variant="caption">
                  {t('offersManagement.imageRestriction')}
                </Typography>
              ) : null}
            </div>
            <Button
              onClick={() => {
                setOffer({
                  ...offer,
                  images: offer.images.concat(imgUrlValueRef.current.value)
                })
                imgUrlValueRef.current.value = ''
              }}
              disabled={disableUrlInput}
              size="small"
              color="secondary"
              startIcon={<AddIcon />}
            >
              {t('offersManagement.addUrl')}
            </Button>
          </Box>
          {offer.images.length > 0 && (
            <>{offer.images && <CarouselComponent images={offer.images} />} </>
          )}
          <Box
            style={{ marginTop: '10px' }}
            className={classes.addButtonContainer}
          >
            <Button
              disabled={
                createOfferLoading ||
                updateOfferLoading ||
                !offer.description ||
                !offer.offer_type ||
                !offer.cost_in_tokens ||
                offer.images.length < 1
              }
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              {t('common.submit')}
            </Button>
          </Box>
        </form>
      )}
      <Snackbar
        open={openSnackbar.show}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </Dialog>
  )
}

LimitationHandling.propTypes = {
  classes: PropTypes.object,
  setQuantity: PropTypes.func,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func
}

GenericOfferFormComponent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  sponsor_id: PropTypes.number,
  isEditing: PropTypes.bool,
  setOffers: PropTypes.func,
  data: PropTypes.object
}

export default GenericOfferFormComponent
