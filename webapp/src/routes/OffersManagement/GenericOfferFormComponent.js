import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
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
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Slide from '@material-ui/core/Slide'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import { useTranslation } from 'react-i18next'
import '@brainhubeu/react-carousel/lib/style.css'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import NumberFormat from 'react-number-format';

import { CREATE_OFFER_MUTATION, UPDATE_OFFER_MUTATION } from '../../gql'

import CarouselComponent from '../../components/Carousel'
import styles from './styles'

const useStyles = makeStyles(styles)

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      allowLeadingZeros={false}
      format="###"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const LimitationHandling = ({
  classes,
  setQuantity,
  initialDates,
  setDates
}) => {
  const { t } = useTranslation('translations')
  const [dates, onChange] = useState([
    initialDates[0] || undefined,
    initialDates[1] || undefined
  ])

  useEffect(() => {
    if (dates && dates[0] !== undefined && dates[1] !== undefined) {
      setDates(dates)
    }
  }, [dates])

  return (
    <Box className={classes.limitationHandlingPaper}>
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
      <Box className={classes.dateContainer}>
        <br />
        <Typography variant="h5" > {t('offersManagement.selectDateRange')}</Typography>
        <DateRangePicker
          minDate={new Date()}
          value={dates}
          onChange={onChange}
          className={classes.textField}
        />
      </Box>
    </Box>
  )
}

const GenericOfferFormComponent = ({
  open,
  setOpen,
  sponsor_id,
  isEditing,
  setOffers,
  data,
  offerNotification
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
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

  function executeAddImage(e) {
    if (e.key === 'Enter' && (!disableUrlInput)) {
      e.preventDefault()
      setOffer({
        ...offer,
        images: offer.images.concat(imgUrlValueRef.current.value)
      })
      imgUrlValueRef.current.value = ''
      setDisableUrlInput(true)
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <Box className={classes.dialog}>
        {fullScreen &&
          < AppBar className={classes.appBar} >
            <Toolbar>
              <IconButton
                className={classes.backIcon}
                onClick={() => setOpen(false)}
                aria-label="close"
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              <Typography variant="h1" className={classes.titleAppBar}>
                {t('offersManagement.addOffer')}
              </Typography>
            </Toolbar>
          </AppBar>
        }
        {!fullScreen &&
          <Box>
            <Box className={classes.closeIcon}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Typography className={classes.titleModal}>
              {t('offersManagement.addOffer')}
            </Typography>
          </Box>
        }
        {
          offer && (
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
                  label={t('offersManagement.selectOfferType')}
                  value={offer.offer_type || ''}
                  onChange={(event) =>
                    setOffer({ ...offer, offer_type: event.target.value })
                  }
                >
                  <MenuItem value="discount">{t('categories.discount')}</MenuItem>
                  <MenuItem value="freeProduct">{t('categories.freeProduct')}</MenuItem>//
                  <MenuItem value="coupon">{t('categories.coupon')}</MenuItem>
                  <MenuItem value="badge">{t('categories.badge')}</MenuItem>//
                  <MenuItem value="benefit">{t('categories.benefit')}</MenuItem>
                </Select>
              </FormControl>
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
              <TextField
                id="cost-in-tokens"
                label={t('offersManagement.costInTokens')}
                variant="outlined"
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                placeholder={t('offersManagement.costInTokensPlaceholder')}
                value={offer.cost_in_tokens || undefined}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                onChange={(event) =>
                  setOffer({ ...offer, cost_in_tokens: event.target.value })
                }
                className={classes.textField}
              />
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
              <Divider className={classes.divider} />
              <Typography className={classes.boldText} variant="subtitle1">{t('offersManagement.redeemAvailability')}</Typography>
              <FormControl component="fieldset" className={classes.radioGroup}>
                <RadioGroup
                  aria-label="limitation"
                  value={String(offer.limited) || undefined}
                  onChange={(event) => {
                    setOffer({ ...offer, limited: event.target.value })
                  }}
                >
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label={t('offersManagement.unlimited')}
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label={t('offersManagement.limited')}
                  />
                </RadioGroup>
                {(offer.limited === true || offer.limited === 'true') && (
                  <LimitationHandling
                    setQuantity={(val) => setOffer({ ...offer, quantity: val })}
                    initialDates={[offer.start_date, offer.end_date]}
                    setDates={(dates) =>
                      setOffer({
                        ...offer,
                        start_date: dates[0],
                        end_date: dates[1]
                      })
                    }
                    classes={classes}
                  />
                )}
              </FormControl>
              <Divider className={classes.divider} />
              <Typography className={classes.boldText} variant="subtitle1">{t('profile.images')}</Typography>
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
                onKeyPress={(event) =>
                  executeAddImage(event)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="secondary"
                        aria-label="add photo url"
                        disabled={disableUrlInput}
                        onClick={() => {
                          setOffer({
                            ...offer,
                            images: offer.images.concat(imgUrlValueRef.current.value)
                          })
                          imgUrlValueRef.current.value = ''
                          setDisableUrlInput(true)
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Box className={classes.addButtonContainer}>
                {offer.images.length < 1 &&
                  <Typography variant="caption">
                    {t('offersManagement.imageRestriction')}
                  </Typography>
                }
              </Box>
              {offer.images.length > 0 && (
                <>
                  {offer.images &&
                    <Box className={classes.carrouselContainer}>
                      <CarouselComponent
                        deleteItem={(url) => {
                          setOffer({
                            ...offer,
                            images: offer.images.filter((p) => p !== url)
                          })
                        }}
                        activeDeletion
                        images={offer.images} />
                    </Box>
                  }
                </>
              )}
              <Box
                style={{ marginTop: '50px' }}
              >
                <Button
                  className={classes.saveBtn}
                  disabled={
                    createOfferLoading ||
                    updateOfferLoading ||
                    !offer.description ||
                    !offer.offer_type ||
                    !offer.cost_in_tokens ||
                    offer.images.length < 1
                  }
                  onClick={() => {
                    handleSubmit()
                    offerNotification()
                    setOpen(false)
                  }}
                  variant="contained"
                  color="primary"
                >
                  {t('offersManagement.addOffer')}
                </Button>
              </Box>
            </form>
          )
        }
      </Box>
    </Dialog >
  )
}

LimitationHandling.propTypes = {
  classes: PropTypes.object,
  setQuantity: PropTypes.func,
  initialDates: PropTypes.array,
  setDates: PropTypes.func
}

GenericOfferFormComponent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  sponsor_id: PropTypes.number,
  isEditing: PropTypes.bool,
  setOffers: PropTypes.func,
  data: PropTypes.object,
  offerNotification: PropTypes.func
}

export default GenericOfferFormComponent
