import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useTranslation } from 'react-i18next'

import { mapboxConfig } from '../../config'
import MapShowLocations from '../MapShowLocations'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '100%',
    width: '100%',
    outlineWidth: 0,
    borderRadius: '0px'
  },
  closeIcon: {
    display: 'flex',
    height: '5vh',
    justifyContent: 'flex-end',
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center'
  },
  bodyWrapper: {
    height: '90vh',
    '& h3': {
      textAlign: 'center',
      padding: 8,
      fontSize: 20
    }
  },
  map: {
    height: '90vh'
  },
  marker: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    '& svg': {
      width: 30
    },
    '& p': {
      fontSize: 12,
      color: theme.palette.primary.mediumEmphasizedBlackText,
      lineHeight: 1.33,
      letterSpacing: '0.4px'
    }
  },
  mapStatic: {
    padding: 0,
    margin: 0,
    width: '100%'
  }
}))

const MapStatic = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const LoadMap = () => {
    let windowSize = window.innerWidth
    const heightMap = windowSize / 2

    if (windowSize > 1280) {
      windowSize = 1280
    }

    const api =
      'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-84.0556371,9.9195872,7/' +
      windowSize.toString() +
      'x' +
      heightMap.toString() +
      '?access_token=' +
      mapboxConfig.accessToken

    return <img src={api} onClick={handleOpen} />
  }

  return (
    <>
      <LoadMap />
      <Modal
        aria-labelledby="show-location-map"
        className={classes.modal}
        open={open}
        onClose={handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <Box className={classes.closeIcon}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleOpen}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Box className={classes.bodyWrapper}>
              <Typography variant="h3">{t('map.findLifebank')}</Typography>
              <MapShowLocations className={classes.map} />
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}

export default MapStatic
