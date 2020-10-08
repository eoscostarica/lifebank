import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { ReactComponent as ReactLogo } from '../../assets/lifebank.svg'
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
    justifyContent: 'space-between',
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
    marginTop: 142,
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
    marginTop: 50,
    maxWidth: 220,
    fontStretch: 'normal'
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 500,
    maxWidth: 220,
    marginTop: 73,
    fontStyle: 'normal',
    fontStretch: 'normal'
  }
}))

const SplashIntro = ({ skipHandling }) => {
  const classes = useStyles()
  const [index, setIndex] = useState(0)
  const [slides] = useState([
    <Box className={classes.slide}>
      <Typography className={clsx(classes.mainHeading, classes.capitalize)}>
        Welcome to
      </Typography>
      <ReactLogo style={{ marginTop: 67 }} />
      <Typography
        variant="h2"
        className={clsx(classes.subHeading, classes.capitalize)}
      >
        Let's work together and keep life flowing
      </Typography>
    </Box>,
    <Box className={classes.slide}>
      <Typography
        variant="h2"
        className={clsx(classes.mainHeading, classes.capitalize)}
      >
        Welcome to
      </Typography>
      <ReactLogo />
      <Typography className={clsx(classes.subHeading, classes.capitalize)}>
        Let's work together and keep life flowing
      </Typography>
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
          disabled={index === slides.length - 1}
          onClick={() => setIndex(index + 1)}
          style={{
            backgroundColor:
              index === slides.length - 1 ? 'lightgray' : '#B71C1C'
          }}
        >
          Next
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
