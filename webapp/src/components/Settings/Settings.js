import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles, useTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import Backdrop from '@material-ui/core/Backdrop'

import CloseIcon from '@material-ui/icons/Close'
import LanguageSelector from '../LanguageSelector'

import styles from './styles'

const useStyles = makeStyles(styles)

const Settings = ({ onCloseSetting }) => {
  const { t } = useTranslation('translations')
  const [user, setUser] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [open, setOpen] = useState(true)
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(!open)
    onCloseSetting()
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        fullScreen={false}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dimensions}>
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
            <Grid container xs={12}>
              <Grid item xs={12}>
                <Box className={classes.textFieldWrapper}>
                  <Typography variant="h3" className={classes.title}>
                    {t('setting.setting')}
                  </Typography>
                </Box>
                <Box className={classes.box}>
                  <Typography variant="h3" className={classes.text}>
                    {t('setting.language')}
                  </Typography>
                  <LanguageSelector alt="settings" />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.box}>
                  <Typography variant="h3" className={classes.text}>
                    {t('setting.changePassword')}
                  </Typography>
                  <Button color="secondary" className={classes.button}>
                    {t('setting.password')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

Settings.propTypes = {
  onCloseSetting: PropTypes.func
}

export default Settings