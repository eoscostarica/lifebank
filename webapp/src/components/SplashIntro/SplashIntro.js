import React, { useState, useEffect, createRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import SwipeableViews from 'react-swipeable-views'

import { ReactComponent as FirstLogo } from '../../assets/lifebank.svg'
import { ReactComponent as SecondLogo } from '../../assets/second.svg'
import { ReactComponent as ThirdLogo } from '../../assets/third.svg'
import { ReactComponent as FourthLogo } from '../../assets/fourth.svg'

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    height: '100%',
    width: '100%'
  },
  iconRoot: {
    textAlign: 'center',
    width: '100%',
    height: '100%'
  },
  carouselContainer: {
    // [theme.breakpoints.between('xs', 'sm')]: {
    //   maxHeight: '500px'
    // },
    // [theme.breakpoints.between('sm', 'md')]: {
    //   maxHeight: '640px'
    // },
    // [theme.breakpoints.between('md', 'lg')]: {
    //   maxHeight: '640px'
    // },
    height: '80vh',
    width: '100%'
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    maxHeight: 400
  },
  capitalize: {
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  caption: {
    textTransform: 'uppercase',
    color: '#121212',
    opacity: 0.3
  },
  slideHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2)
  },
  nextBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: theme.spacing(3)
  },
  nextBtn: {
    borderRadius: '48px',
    height: '32px',
    width: '106px',
    verticalAlign: 'middle',
    color: 'white'
  },
  mainHeading: {
    fontSize: 24,
    letterSpacing: 0.86,
    fontWeight: 500,
    textAlign: 'center',
    fontStretch: 'normal'
  },
  stepper: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center'
  },
  swipeable: {
    '& > div.react-swipeable-view-container': {
      maxHeight: 500
    }
  },
  medium: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.5,
    fontStyle: 'normal',
    fontStretch: 'normal'
  },
  dialog: {
    padding: 100
  }
}))

const SplashIntro = ({ skipHandling }) => {
  const classes = useStyles()
  const dotsRef = createRef()
  const matches = useMediaQuery('(min-width:600px)')
  const [activeStep, setActiveStep] = useState(0)

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const [slides] = useState([
    <Box className={classes.slide} key={0}>
      <Typography className={clsx(classes.mainHeading, classes.capitalize)}>
        Welcome to
      </Typography>
      <FirstLogo style={{ marginTop: 67 }} />
      <Box
        style={{
          marginTop: 50,
          maxWidth: 175,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginBottom: 0 }}
        >
          Let's work together and keep life flowing
        </Typography>
      </Box>
    </Box>,
    <Box className={classes.slide} key={1}>
      <Box
        style={{
          margin: 'auto',
          maxWidth: 175,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          className={clsx(classes.mainHeading, classes.capitalize)}
        >
          Lifebank
        </Typography>
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginTop: '0 !important', lineHeight: '24px' }}
        >
          Is a place where you can donate blood
        </Typography>
      </Box>
      <SecondLogo />
    </Box>,
    <Box className={classes.slide} key={2}>
      <Box style={{ margin: 'auto', maxWidth: 317, textAlign: 'center' }}>
        <Typography
          variant="h2"
          style={{ lineHeight: '24px' }}
          className={clsx(classes.mainHeading, classes.capitalize)}
        >
          Sponsors
        </Typography>
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginTop: '0 !important', lineHeight: '24px' }}
        >
          Are businesses that will reward people that have donated through a
          lifebank
        </Typography>
      </Box>
      <ThirdLogo />
    </Box>,
    <Box className={classes.slide} key={3}>
      <Box style={{ margin: 'auto', maxWidth: 317, textAlign: 'center' }}>
        <Typography
          variant="h2"
          className={clsx(classes.mainHeading, classes.capitalize)}
        >
          Donors
        </Typography>
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginTop: '0 !important', lineHeight: '24px' }}
        >
          Will donate blood and be rewarded with life tokens which they can
          redeem at their convenience with sponsors of the community.
        </Typography>
      </Box>
      <FourthLogo />
    </Box>
  ])

  const handleDotClick = (event) => {
    console.log(event.target.id)
    setActiveStep(Number(event.target.id))
  }

  useEffect(() => {
    if (dotsRef.current) {
      for (let i = 0; i < dotsRef.current.children[0].children.length; i++) {
        dotsRef.current.children[0].children[i].id = String(i)
        dotsRef.current.children[0].children[i].addEventListener(
          'click',
          handleDotClick
        )
      }
      console.log(dotsRef.current.children[1])
    }
  }, [dotsRef])

  return (
    <>
      {matches ? (
        <Dialog style={{ padding: 10 }} open={matches} maxWidth="md">
          <Box className={classes.slideHeader}>
            <IconButton onClick={() => skipHandling('splash')}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container direction="row" justify="center" alignItems="center">
            <SwipeableViews
              index={activeStep}
              style={{ maxHeight: 400 }}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {slides.map((slide, index) => (
                <Fragment>{slide}</Fragment>
              ))}
            </SwipeableViews>
          </Grid>
          <Box className={classes.nextBtnContainer}>
            <Button
              className={classes.nextBtn}
              onClick={() =>
                activeStep === slides.length - 1
                  ? skipHandling('splash')
                  : setActiveStep(activeStep + 1)
              }
              style={{
                backgroundColor: '#B71C1C'
              }}
            >
              {activeStep === slides.length - 1 ? 'Start' : 'Next'}
            </Button>
          </Box>
          <MobileStepper
            ref={dotsRef}
            variant="dots"
            steps={4}
            position="static"
            activeStep={activeStep}
            className={classes.stepper}
          />
          <br />
          <br />
          <br />
        </Dialog>
      ) : (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.carouselContainer}
        >
          <Box className={classes.slideHeader}>
            <Button onClick={() => skipHandling('splash')}>
              <Typography className={classes.caption}>Skip</Typography>
            </Button>
          </Box>
          <Grid container direction="row" justify="center" alignItems="center">
            <SwipeableViews
              index={activeStep}
              style={{ maxHeight: 400 }}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {slides.map((slide, index) => (
                <Fragment>{slide}</Fragment>
              ))}
            </SwipeableViews>
          </Grid>
          <Box className={classes.nextBtnContainer}>
            <Button
              className={classes.nextBtn}
              onClick={() =>
                activeStep === slides.length - 1
                  ? skipHandling('splash')
                  : setActiveStep(activeStep + 1)
              }
              style={{
                backgroundColor: '#B71C1C'
              }}
            >
              {activeStep === slides.length - 1 ? 'Start' : 'Next'}
            </Button>
          </Box>
          <MobileStepper
            ref={dotsRef}
            variant="dots"
            steps={4}
            position="static"
            activeStep={activeStep}
            className={classes.stepper}
          />
        </Grid>
      )}
    </>
  )
}

SplashIntro.propTypes = {
  skipHandling: PropTypes.func
}

export default SplashIntro
