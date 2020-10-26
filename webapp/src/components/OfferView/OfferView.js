import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useUser } from '../../context/user.context'
import IconButton from '@material-ui/core/IconButton'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import MapModalOneLocation from '../MapModalOneLocation/MapModalOneLocation';
import DonationsDashboard from '../DonationsDashboard/DonationsDashboard';

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
  cardContentText: {
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
  componentActionsButton: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 10,
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
    color: "#121212"
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
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OfferView = ({ selectOffer, isDesktop, openOfferView, handleCloseOfferView }) => {

  const classes = useStyles()
  const theme = useTheme();
  const images = JSON.parse(selectOffer.images)
  const [activeStep, setActiveStep] = useState(0);
  const [currentUser] = useUser()
  const [openOpenModalLocation, setOpenModalLocation] = useState(false);
  const maxSteps = images.length;

  const handleClickOpen = () => {
    setOpenModalLocation(true);
  };

  const handleClose = () => {
    setOpenModalLocation(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
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
          <Typography paragraph className={classes.cardContentText} >{truncateString(selectOffer.description)}</Typography>
          <Typography paragraph className={classes.cardContentText}>This offer is only for online purchases.</Typography>
        </Box>
        <Box className={classes.componentActionsButton}>
          <IconButton disabled>
            <StarBorderIcon className={classes.iconBottomAppBar} />
          </IconButton>
          <MapModalOneLocation
            isDesktop={isDesktop}
            isSponor
            geolocation={selectOffer.user.location.info.geolocation}
            account={selectOffer.user.account}
          />
          {currentUser && currentUser.role === "donor" &&
            <DonationsDashboard isDesktop={isDesktop} isOffer={true} />
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
                Selected Offer
              </Typography>
            </Toolbar>
          </AppBar>
          <OfferContent />
        </Dialog>
      }
      {
        isDesktop &&
        <Dialog open={openOfferView} onClose={handleCloseOfferView} TransitionComponent={Transition}>
          <IconButton className={classes.backIcon} onClick={handleCloseOfferView} aria-label="close">
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Selected Offer
            </Typography>
          <Typography variant="h6" className={classes.title}>
            {selectOffer.offer_name}
          </Typography>
        </Dialog>
      }
    </>
  )
}

OfferView.defaultProps = {
  selectOffer: { images: "[]" },
};

OfferView.propTypes = {
  openOfferView: PropTypes.bool,
  handleCloseOfferView: PropTypes.func,
  isDesktop: PropTypes.bool,
  selectOffer: PropTypes.object,
}

export default OfferView
