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
import { useTranslation } from 'react-i18next'

import { ReactComponent as FirstLogo } from '../../assets/lifebank.svg'
import SecondLogoUrl from '../../assets/second.svg'
import ThirdLogoUrl from '../../assets/third.svg'
import FourthLogoUrl from '../../assets/fourth.svg'

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '100%',
      height: '70vh'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      height: '40vh'
    },
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  iconRoot: {
    textAlign: 'center',
    width: '100%',
    height: '100%'
  },
  carouselContainer: {
    height: '99vh',
    width: '100%',
    position: 'relative'
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    [theme.breakpoints.between('xs', 'sm')]: {
      maxHeight: 440
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 640
    }
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
    [theme.breakpoints.between('xs', 'sm')]: {
      zIndex: 9999,
      position: 'absolute',
      right: 0,
      top: 10
    },
    [theme.breakpoints.up('sm')]: {
      zIndex: 0,
      position: 'relative'
    }
  },
  nextBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: theme.spacing(2)
  },
  nextBtn: {
    borderRadius: '48px',
    height: '32px',
    width: '106px',
    verticalAlign: 'middle',
    color: 'white'
  },
  stepper: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: 0
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: 50
    }
  },
  mainHeading: {
    fontSize: '18px',
    letterSpacing: '0.64px',
    fontWeight: 'bold',
    lineHeight: '1.33',
    textAlign: 'center',
    fontStretch: 'normal'
  },
  medium: {
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: 0.5,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal'
  }
}))

const SplashIntro = ({ skipHandling, cookie }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const dotsRef = createRef()
  const matches = useMediaQuery('(max-width:600px)')
  const [activeStep, setActiveStep] = useState(0)

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const [slides] = useState([
    <Box className={classes.slide} justifyContent="space-evenly" key={0}>
      <Typography
        style={{
          fontSize: 24,
          letterSpacing: 0.86,
          fontWeight: 500,
          textAlign: 'center',
          fontStretch: 'normal'
        }}
        className={classes.capitalize}
      >
        {t('splash.welcomeTo')}
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
          {t('splash.workTogether')}
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
          {t('rolesTitle.singular.lifebank')}
        </Typography>
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginTop: '0 !important' }}
        >
          {t('splash.isAplace')}
        </Typography>
      </Box>
      <Box
        className={classes.imageIcon}
        style={{
          backgroundPositionY: 'center',
          backgroundImage: `url(${SecondLogoUrl})`,
          backgroundSize: matches ? 'normal' : '620px'
        }}
      ></Box>
    </Box>,
    <Box className={classes.slide} key={2}>
      <Box style={{ margin: 'auto', maxWidth: 317, textAlign: 'center' }}>
        <Typography
          variant="h2"
          style={{ lineHeight: '24px' }}
          className={clsx(classes.mainHeading, classes.capitalize)}
        >
          {t('rolesTitle.plural.sponsors')}
        </Typography>
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginTop: '0 !important', maxWidth: '300px' }}
        >
          {t('splash.sponsorDescription')}
        </Typography>
      </Box>
      <Box
        className={classes.imageIcon}
        style={{
          backgroundImage: `url(${ThirdLogoUrl})`,
          backgroundSize: matches ? 'normal' : '760px'
        }}
      ></Box>
    </Box>,
    <Box className={classes.slide} key={3}>
      <Box style={{ margin: 'auto', maxWidth: 317, textAlign: 'center' }}>
        <Typography
          variant="h2"
          className={clsx(classes.mainHeading, classes.capitalize)}
        >
          {t('rolesTitle.plural.donors')}
        </Typography>
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginTop: '0 !important' }}
        >
          {t('splash.donorsDescription')}
        </Typography>
      </Box>
      <Box
        className={classes.imageIcon}
        style={{
          backgroundImage: `url(${FourthLogoUrl})`,
          backgroundPositionY: matches ? 'center' : '80%',
          backgroundSize: matches ? 'normal' : '550px'
        }}
      ></Box>
    </Box>
  ])

  const handleDotClick = (event) => {
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
    }
  }, [dotsRef])

  return (
    <>
      {!cookie ? (
        <>
          <Dialog
            className={classes.dialog}
            fullScreen={matches}
            maxWidth="md"
            open={!cookie}
          >
            <Box className={classes.slideHeader}>
              <IconButton onClick={() => skipHandling('splash')}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid
              style={{
                marginTop: 50
              }}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {slides.map((slide, index) => (
                  <Fragment key={index}>{slide}</Fragment>
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
          </Dialog>
        </>
      ) : null}
    </>
  )
}

SplashIntro.propTypes = {
  skipHandling: PropTypes.func,
  cookie: PropTypes.string
}

export default SplashIntro
