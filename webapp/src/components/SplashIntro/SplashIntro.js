import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { ReactComponent as FirstLogo } from '../../assets/lifebank.svg'
import { ReactComponent as SecondLogo } from '../../assets/second.svg'
import { ReactComponent as ThirdLogo } from '../../assets/third.svg'
import { ReactComponent as FourthLogo } from '../../assets/fourth.svg'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

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
    display: 'grid',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90vh',
    width: '100%'
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
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
  carousel: {
    '& > button.BrainhubCarousel_dot': {
      backgroundColor: 'transparent'
    }
  },
  mainHeading: {
    fontSize: 24,
    letterSpacing: 0.86,
    fontWeight: 500,
    lineHeight: 'normal',
    textAlign: 'center',
    fontStretch: 'normal'
  },
  medium: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.5,
    fontStyle: 'normal',
    fontStretch: 'normal'
  }
}))

const SplashIntro = ({ skipHandling }) => {
  const classes = useStyles()
  const [index, setIndex] = useState(0)
  const [slides] = useState([
    <Box className={classes.slide} key={0}>
      <Typography className={clsx(classes.mainHeading, classes.capitalize)}>
        Welcome to
      </Typography>
      <FirstLogo style={{ marginTop: 67 }} />
      <Box
        style={{
          margin: 'auto',
          marginTop: 50,
          maxWidth: 175,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
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
          style={{ marginTop: '0 !important' }}
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
          className={clsx(classes.mainHeading, classes.capitalize)}
        >
          Sponsors
        </Typography>
        <Typography
          variant="h2"
          className={clsx(classes.medium, classes.capitalize)}
          style={{ marginTop: '0 !important' }}
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
          style={{ marginTop: '0 !important' }}
        >
          Will donate blood and be rewarded with life tokens which they can
          redeem at their convenience with sponsors of the community.
        </Typography>
      </Box>
      <FourthLogo />
    </Box>
  ])

  return (
    <Box className={classes.carouselContainer}>
      <Box className={classes.slideHeader}>
        <Button onClick={() => skipHandling('splash')}>
          <Typography className={classes.caption}>Skip</Typography>
        </Button>
      </Box>
      <Carousel value={index} slides={slides} />
      <Box className={classes.nextBtnContainer}>
        <Button
          className={classes.nextBtn}
          onClick={() =>
            index === slides.length - 1
              ? skipHandling('splash')
              : setIndex(index + 1)
          }
          style={{
            backgroundColor: '#B71C1C'
          }}
        >
          {index === slides.length - 1 ? 'Start' : 'Next'}
        </Button>
      </Box>
      <Dots
        value={index}
        onChange={(value) => setIndex(value)}
        number={slides.length}
      />
    </Box>
  )
}

SplashIntro.propTypes = {
  skipHandling: PropTypes.func
}

export default SplashIntro
