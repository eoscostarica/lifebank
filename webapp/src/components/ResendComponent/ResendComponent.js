import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'

import useMediaQuery from '@material-ui/core/useMediaQuery'


const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  dialog: {
    paddingTop: "48px",
    paddingLeft: "48px",
    paddingRight: "48px"
  },
  box: {
    alignItems: 'center',
    margin: '15%',
  },
  mainButton: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "50%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "34px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 15
  },
  subTitle: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 30
  }

}))

const ResendComponent = ({ open, handlerOpen }) => {
  const { t } = useTranslation('translations')
  const theme = useTheme()
  const classes = useStyles()

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  return (
    <Dialog
      open={open}
      onClose={handlerOpen}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      fullScreen={!isDesktop}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >

      <Box className={classes.dialog}>
        <Box className={classes.closeIcon}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handlerOpen}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.box}>
        <Box>
          <Typography className={classes.title}>
            {t('login.verify')}
          </Typography>
          <Typography className={classes.subTitle}>
            {t('login.textVerify')}
          </Typography>
        </Box>
        <Button
          className={classes.mainButton}
          variant="contained"
          color="secondary"
        >
          {t('login.resend')}</Button>
      </Box>
    </Dialog>
  )
}

ResendComponent.propTypes = {
  open: PropTypes.bool,
  handlerOpen: PropTypes.func
}

export default ResendComponent
