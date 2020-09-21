import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

const useStyles = makeStyles({
  carousel: {
    maxWidth: '100%'
  },
  img: {
    maxWidth: '100%'
  }
})

const CarouselComponent = ({ images }) => {
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)

  return (
    <Box justifyContent="center" borderRadius="8px" boxShadow={2}>
      <Carousel
        value={actualImageIndex}
        className={classes.carousel}
        onChange={(val) => setActualImageIndex(val)}
        plugins={[
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 1
            }
          }
        ]}
      >
        {images.map((url, key) => (
          <img className={classes.img} src={url} key={key} alt={`${key}`} />
        ))}
      </Carousel>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          disabled={actualImageIndex === 0}
          onClick={() => setActualImageIndex(actualImageIndex - 1)}
        >
          Prev
        </Button>
        <Button
          disabled={actualImageIndex === images.length - 1}
          onClick={() => setActualImageIndex(actualImageIndex + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

CarouselComponent.propTypes = {
  images: PropTypes.array
}

export default CarouselComponent
