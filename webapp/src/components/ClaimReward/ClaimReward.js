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
import FavoriteIcon from '@material-ui/icons/Favorite'
import Fade from '@material-ui/core/Fade'
import QRCode from 'qrcode.react'
import { useTranslation } from 'react-i18next'

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
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    '& h1': {
      fontSize: 48,
      textAlign: 'center',
      fontWeight: 'normal',
      lineHeight: '45px'
    },
    '& h3': {
      fontSize: 38,
      fontWeight: 500
    },
    '& h4': {
      fontSize: 34,
      letterSpacing: '0.25',
      color: theme.palette.secondary.main,
      fontWeight: 'normal'
    }
  },
  labelBtn: {
    color: theme.palette.white
  }
}))

const ClaimReward = ({ overrideBoxClass, useButton, profile }) => {
  const { t } = useTranslation('translations')
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
            classes={{ label: classes.labelBtn }}
            variant="contained"
            color="secondary"
            startIcon={<FavoriteIcon />}
          >
            {t('claimReward.claimReward')}
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
              <Typography variant="h1">
                {t('claimReward.claimYourReward')}
              </Typography>
              <Typography variant="h4">
                {t('claimReward.showThisCode')}
              </Typography>
              <QRCode value={profile.account || 'n/a'} size={200} />
              <Typography variant="h4">
                {t('claimReward.orYourUsername')}
              </Typography>
              <Typography variant="h3">{profile.account}</Typography>
              <Button variant="outlined" color="primary" onClick={handleOpen}>
                {t('claimReward.imDone')}
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}

ClaimReward.propTypes = {
  overrideBoxClass: PropTypes.any,
  overrideLabelClass: PropTypes.any,
  useButton: PropTypes.bool,
  profile: PropTypes.object
}

ClaimReward.defaultProps = {
  useButton: false,
  profile: {}
}

export default ClaimReward
