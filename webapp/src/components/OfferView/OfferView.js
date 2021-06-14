import React, { useState, forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useUser } from '../../context/user.context'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import MobileStepper from '@material-ui/core/MobileStepper'
import ImportantIcon from '@material-ui/icons/LabelImportant'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'

import MapModalOneLocation from '../MapModalOneLocation/MapModalOneLocation'
import styles from './styles'
import { REDEEM_OFFER_MUTATION } from '../../gql'

const useStyles = makeStyles(styles)

const monthKey = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Agt',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const OfferView = ({
  selectOffer,
  isDesktop,
  openOfferView,
  handleCloseOfferView
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const images = JSON.parse(selectOffer.images)
  const [activeStep, setActiveStep] = useState(0)
  const [currentUser] = useUser()
  const maxSteps = images.length
  const startDate = new Date(selectOffer.start_date)
  const endDate = new Date(selectOffer.end_date)
  const { t } = useTranslation('translations')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const [
    redeemOffer,
    { loading: loadingRedeemOffer, error: errorRedeemOffer , data: { redeem_offer: redeemOfferResult } = {} }
  ] = useMutation(REDEEM_OFFER_MUTATION)

  const handleRedeemOffer = () => {
    redeemOffer({
      variables: {
        to: selectOffer.user.account,
        memo: "Best day ever",
        quantity: 1,
        offer: selectOffer
      }
    })
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  useEffect(() => {
    if (redeemOfferResult) {
      if(redeemOfferResult.transaction_id)
        setOpenSnackbar({
          show: true,
          message: t('donations.redeemOfferSuccess'),
          severity: 'success'
        })
    }
    if (errorRedeemOffer) {
      setOpenSnackbar({
        show: true,
        message: t('donations.redeemOfferError'),
        severity: 'error'
      })
    }
  }, [redeemOfferResult, errorRedeemOffer])

  const truncateString = (str) => {
    const num = 150

    if (str.length <= num) return str

    return str.slice(0, num) + '...'
  }

  const ShowImages = () => {
    return (
      <Box>
        <img className={classes.img} src={images[activeStep]} />
        <MobileStepper
          className={classes.stepper}
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {t('common.next')}
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              {t('common.prev')}
            </Button>
          }
        />
      </Box>
    )
  }

  const OfferContent = () => {
    return (
      <Box>
        <Box className={classes.componentHeader}>
          <Avatar
            className={classes.componentAvatar}
            src={
              selectOffer.user.location.info.logo_url !== ''
                ? `//images.weserv.nl?url=${selectOffer.user.location.info.logo_url}&h=60&dpr=1`
                : ''
            }
          />
          <Box className={classes.componentTitleContainer}>
            <Typography className={classes.componentTitle} noWrap>
              {selectOffer.offer_name}
            </Typography>
            <Typography className={classes.componentSubTitle} noWrap>
              {selectOffer.user.location.info.name}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.cardMedia}>
          <ShowImages />
        </Box>
        <Box className={classes.componentContent}>
          <Typography paragraph className={classes.componentontentText}>
            {truncateString(selectOffer.description)}
          </Typography>
          {!isNaN(startDate.getMonth()) && !isNaN(endDate.getMonth()) && (
            <Typography paragraph className={classes.componentontentTextAux}>
              {t('offerView.available')}{' '}
              {t(`months.${monthKey[startDate.getMonth()]}`)}{' '}
              {startDate.getDay()} {t('offerView.to')}{' '}
              {t(`months.${monthKey[endDate.getMonth()]}`)} {endDate.getDay()}
            </Typography>
          )}
          {selectOffer.online_only && (
            <Typography paragraph className={classes.componentontentTextAux}>
              {t('offerView.onlinePurchases')}
            </Typography>
          )}
        </Box>
        <Box className={classes.componentActionsButton}>
            <MapModalOneLocation
              isDesktop={isDesktop}
              isSponor
              geolocation={selectOffer.user.location.info.geolocation}
              account={selectOffer.user.account}
            />
            <Button
              disabled
              className={classes.buttonIconDesktop}
              startIcon={<ImportantIcon />}
            >
              {t(`categories.${selectOffer.offer_type}`)}
            </Button>
          {currentUser && currentUser.role === 'donor' && (
              <Button variant="contained" color="secondary" 
                className={classes.fabButtonOffer}
                disabled = {loadingRedeemOffer}
                onClick={handleRedeemOffer}>
                {t('tokenTransfer.redeem')}
              </Button>
          )}
        </Box>
      </Box>
    )
  }

  return (
    <>
      {!isDesktop && (
        <Dialog
          fullScreen
          open={openOfferView}
          onClose={handleCloseOfferView}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                className={classes.backIcon}
                onClick={handleCloseOfferView}
                aria-label="close"
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {t('offerView.selectedOffer')}
              </Typography>
            </Toolbar>
          </AppBar>
          <OfferContent />
          {loadingRedeemOffer &&
            <Box className={classes.loadingBox}>
              <CircularProgress />
            </Box>
          }
          <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleSnackbarClose}>
            <Alert severity={openSnackbar.severity}>
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </Dialog>
      )}
      {isDesktop && (
        <Dialog
          open={openOfferView}
          onClose={handleCloseOfferView}
          TransitionComponent={Transition}
          maxWidth="sm"
          fullWidth
        >
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseOfferView}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <OfferContent />
          {loadingRedeemOffer &&
            <Box className={classes.loadingBox}>
              <CircularProgress />
            </Box>
          }
          <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleSnackbarClose}>
            <Alert severity={openSnackbar.severity}>
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </Dialog>
      )}
    </>
  )
}

OfferView.defaultProps = {
  selectOffer: { images: '[]' }
}

OfferView.propTypes = {
  openOfferView: PropTypes.bool,
  handleCloseOfferView: PropTypes.func,
  isDesktop: PropTypes.bool,
  selectOffer: PropTypes.object
}

export default OfferView
