import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import RoomIcon from '@material-ui/icons/Room'
import { useTranslation } from 'react-i18next'

import MapShowLocations from '../MapShowLocations'
import styles from './styles'

const useStyles = makeStyles(styles)

const MapModal = ({ isDesktop }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [maxWidth] = useState('md')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {isDesktop && (
        <Button
          onClick={handleClickOpen}
          className={classes.buttonMapDesktop}
          startIcon={<RoomIcon />}
        >
          {t('map.browseWithAmap')}
        </Button>
      )}
      {!isDesktop && (
        <IconButton onClick={handleClickOpen}>
          <RoomIcon className={classes.iconBottomAppBar} />
        </IconButton>
      )}
      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box className={classes.closeIcon}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {t('map.findLifebank')}
        </DialogTitle>
        <MapShowLocations className={classes.map} />
      </Dialog>
    </>
  )
}

MapModal.propTypes = {
  isDesktop: PropTypes.bool
}

MapModal.defaultProps = {
  isDesktop: false
}

export default MapModal
