import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

const useStyles = makeStyles({
  carouselPictureContainer: {
    maxHeight: '440px',
    maxWidth: '600px'
  }
})

const CarouselComponent = ({ images }) => {
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)

  return (
    <Box borderRadius="8px" boxShadow={2}>
      <Carousel
        value={actualImageIndex}
        onChange={(val) => setActualImageIndex(val)}
        plugins={[
          'infinite',
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 2
            }
          }
        ]}
      >
        {images.map((url, key) => (
          <Box key={key} className={classes.carouselPictureContainer}>
            <img src={url} key={key} alt={`${key}`} />
          </Box>
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
