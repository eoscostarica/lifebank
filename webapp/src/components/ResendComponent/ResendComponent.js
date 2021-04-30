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


import styles from './styles'

const useStyles = makeStyles(styles)

const ResendComponent = ({ open, handlerOpen, handlerSendEmail }) => {
  const { t } = useTranslation('translations')
  const theme = useTheme()
  const classes = useStyles()


  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })


  const resendEmail = () => {
    handlerSendEmail()
    handlerOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handlerOpen}
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
          onClick={resendEmail}
        >
          {t('login.resend')}</Button>
      </Box>
    </Dialog>
  )
}

ResendComponent.propTypes = {
  open: PropTypes.bool,
  handlerOpen: PropTypes.func,
  handlerSendEmail: PropTypes.func
}

export default ResendComponent
