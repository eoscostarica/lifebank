import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
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
import StarBorderIcon from '@material-ui/icons/StarBorder'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'

import MapModalOneLocation from '../MapModalOneLocation/MapModalOneLocation'
import DonationsDashboard from '../DonationsDashboard/DonationsDashboard'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: 'inherit'
  },
  notificationIcon: {
    color: "#121212",
    width: 24,
    height: 24,
  },
  notificationIconTransparent: {
    color: "#ffffff",
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)"
  },
  backIcon: {
    color: "#121212",
  },
  buttonIconDesktop: {
    padding: 20,
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.6)"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: "20px",
    fontWeight: "500",
  },
  offerContent: {
    padding: 30,
  },
  componentHeader: {
    padding: 20,
    margin: 0,
    width: "100%",
    display: "flex",
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  componentAvatar: {
    height: "40px",
    width: "40px",
  },
  componentTitleContainer: {
    width: "100%"
  },
  componentTitle: {
    marginLeft: 17,
    marginTop: 3,
    width: "100%",
    fontFamily: "Roboto",
    fontsize: "20px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.15px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.87)",
  },
  componentSubTitle: {
    marginLeft: 17,
    marginTop: 1,
    width: "100%",
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
  },
  componentContent: {
    overflow: "auto",
    padding: 20,
    marginTop: 10,
    marginBttom: 10,
  },
  componentontentText: {
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
  },
  componentontentTextAux: {
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "#121212",
  },
  componentActionsButton: {
    width: "100%",
    [theme.breakpoints.down('md')]: {
      position: "absolute",
      bottom: 0,
      padding: 10,
    }
  },
  cardActionButton: {
    position: "absolute",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    paddingTop: 10,
    bottom: 10,
    right: 15,
    borderRadius: "48px",
    backgroundColor: "#ba0d0d",
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.5",
    textAlign: "center",
    color: "#ffffff",
  },
  iconBottomAppBar: {
    color: "rgba(0, 0, 0, 0.6)"
  },
  stepper: {
    backgroundColor: "#ffffff",
  },
  img: {
    height: "30vh",
    objectFit: "cover",
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    right: 20,
    margin: '0',
    height: "5vh",
    '& svg': {
      fontSize: 25,
      color: "#121212"
    }
  },
}))

const monthKey = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agt", "Sep", "Oct", "Nov", "Dec"]

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const OfferView = ({ selectOffer, isDesktop, openOfferView, handleCloseOfferView }) => {
  const classes = useStyles()
  const theme = useTheme()
  const images = JSON.parse(selectOffer.images)
  const [activeStep, setActiveStep] = useState(0)
  const [currentUser] = useUser()
  const maxSteps = images.length
  const startDate = new Date(selectOffer.start_date)
  const endDate = new Date(selectOffer.end_date)
  const { t } = useTranslation('translations')

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const truncateString = (str) => {
    const num = 150

    if (str.length <= num)
      return str

    return str.slice(0, num) + '...'
  }

  const ShowImages = () => {
    return (
      <Box>
        <img
          className={classes.img}
          src={images[activeStep]}
        />
        <MobileStepper
          className={classes.stepper}
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              {t('common.next')}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
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
          <Avatar className={classes.componentAvatar} src={selectOffer.user.location.info.logo_url} />
          <Box className={classes.componentTitleContainer}>
            <Typography className={classes.componentTitle} noWrap>{selectOffer.offer_name}</Typography>
            <Typography className={classes.componentSubTitle} noWrap>{selectOffer.user.location.info.name}</Typography>
          </Box>
        </Box>
        <Box className={classes.cardMedia}>
          <ShowImages />
        </Box>
        <Box className={classes.componentContent}>
          <Typography paragraph className={classes.componentontentText} >{truncateString(selectOffer.description)}</Typography>
          {!isNaN(startDate.getMonth()) && !isNaN(endDate.getMonth()) &&
            <Typography paragraph className={classes.componentontentTextAux}>{t("offerView.available")} {t(`months.${monthKey[startDate.getMonth()]}`)} {startDate.getDay()} {t("offerView.to")} {t(`months.${monthKey[endDate.getMonth()]}`)} {endDate.getDay()}</Typography>
          }
          {selectOffer.online_only &&
            <Typography paragraph className={classes.componentontentTextAux}>{t('offerView.onlinePurchases')}</Typography>
          }
        </Box>
        <Box className={classes.componentActionsButton}>
          {!isDesktop &&
            <IconButton disabled>
              <StarBorderIcon className={classes.iconBottomAppBar} />
            </IconButton>
          }
          {isDesktop &&
            <Button
              disabled
              className={classes.buttonIconDesktop}
              startIcon={<StarBorderIcon />}
            >
              {t('contentToolbar.favorite')}
            </Button>
          }
          <MapModalOneLocation
            isDesktop={isDesktop}
            isSponor
            geolocation={selectOffer.user.location.info.geolocation}
            account={selectOffer.user.account}
          />
          {currentUser && currentUser.role === "donor" &&
            <DonationsDashboard isDesktop={isDesktop} isOffer />
          }
        </Box>
      </Box>
    )
  }

  return (
    <>
      {
        !isDesktop &&
        <Dialog fullScreen open={openOfferView} onClose={handleCloseOfferView} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton className={classes.backIcon} onClick={handleCloseOfferView} aria-label="close">
                <KeyboardBackspaceIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {t('offerView.selectedOffer')}
              </Typography>
            </Toolbar>
          </AppBar>
          <OfferContent />
        </Dialog>
      }
      {
        isDesktop &&
        <Dialog open={openOfferView} onClose={handleCloseOfferView} TransitionComponent={Transition} maxWidth="sm" fullWidth>
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
        </Dialog>
      }
    </>
  )
}

OfferView.defaultProps = {
  selectOffer: { images: "[]" },
}

OfferView.propTypes = {
  openOfferView: PropTypes.bool,
  handleCloseOfferView: PropTypes.func,
  isDesktop: PropTypes.bool,
  selectOffer: PropTypes.object,
}

export default OfferView
