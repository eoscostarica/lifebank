import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import SearchIcon from '@material-ui/icons/Search'

import MapShowLocations from '../MapShowLocations'
import SponsorSvg from './LocatorSponsor.js'
import LifeBankSvg from './LocatorDonators.js'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '80%',
    width: 350,
    outlineWidth: 0
  },
  closeIcon: {
    display: 'flex',
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
    height: '90%',
    padding: theme.spacing(0, 2),
    '& h3': {
      textAlign: 'center'
    }
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
  }
}))

const MapModal = ({ overrideBoxClass, overrideLabelClass, useButton }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Box
        className={clsx(classes.loginBtn, overrideBoxClass)}
        onClick={handleOpen}
      >
        {useButton && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            Find Location
          </Button>
        )}
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              <Typography variant="h3">
                Find Lifebanks or Sponsors Near You
              </Typography>
              <MapShowLocations width="100%" height="80%" my={2} />
              <Box className={classes.marker}>
                <SponsorSvg />
                <Typography variant="body1">Sponsors</Typography>
                <LifeBankSvg />
                <Typography variant="body1">Lifebanks</Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}

MapModal.propTypes = {
  overrideBoxClass: PropTypes.any,
  overrideLabelClass: PropTypes.any,
  useButton: PropTypes.bool
}

MapModal.defaultProps = {
  useButton: false
}

export default MapModal
