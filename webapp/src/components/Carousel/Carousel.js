import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import DeleteIcon from '@material-ui/icons/Delete'
import '@brainhubeu/react-carousel/lib/style.css'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  carousel: {
    maxWidth: '100%'
  },
  img: {
    maxWidth: '100%'
  }
})

const CarouselComponent = ({ images, activeDeletion, deleteItem }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)

  return (
    <Box justifyContent="center" borderRadius="8px" boxShadow={0}>
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
          <Box display="flex" flexDirection="column" key={key}>
            <img className={classes.img} src={url} key={key} alt={`${key}`} />
            {activeDeletion && (
              <Button
                variant="contained"
                disableElevation
                size="small"
                onClick={() => deleteItem(url)}
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                {t('common.delete')}
              </Button>
            )}
          </Box>
        ))}
      </Carousel>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          disabled={actualImageIndex === 0}
          onClick={() => setActualImageIndex(actualImageIndex - 1)}
        >
          {t('common.prev')}
        </Button>
        <Button
          disabled={actualImageIndex === images.length - 1}
          onClick={() => setActualImageIndex(actualImageIndex + 1)}
        >
          {t('common.next')}
        </Button>
      </Box>
    </Box>
  )
}

CarouselComponent.propTypes = {
  images: PropTypes.array,
  activeDeletion: PropTypes.bool,
  deleteItem: PropTypes.func
}

export default CarouselComponent
