import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import { ReactComponent as ReactLogo } from '../../assets/lifebank.svg'

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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
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
    borderRadius: '10px',
    backgroundColor: theme.palette.secondary.main,
    height: '32px',
    width: '106px',
    verticalAlign: 'middle',
    color: 'white'
  }
}))

const SplashIntro = () => {
  const classes = useStyles()
  const [slides, setSlides] = useState([
    <Box className={classes.slide}>
      <Typography variant="h2" className={classes.capitalize}>
        Welcome to
      </Typography>
      <ReactLogo />
      <Typography variant="h2" className={classes.capitalize}>
        Let's work together and keep life flowing
      </Typography>
      <Box>
        <Button></Button>
      </Box>
    </Box>
  ])

  return (
    <Box className={classes.carouselContainer}>
      <Box className={classes.slideHeader}>
        <Button>
          <Typography className={classes.caption}>Skip</Typography>
        </Button>
      </Box>
      <Carousel plugins={['clickToChange']} slides={slides} />
      <Box className={classes.nextBtnContainer}>
        <Button
          className={classes.nextBtn}
          // disabled={actualImageIndex === images.length - 1}
          // onClick={() => setActualImageIndex(actualImageIndex + 1)}
        >
          Next
        </Button>
      </Box>
      <Dots
        value={slides}
        onChange={(value) => setSlides({ value })}
        number={slides.length}
      />
    </Box>
  )
}

export default SplashIntro
