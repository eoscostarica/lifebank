import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import Backdrop from '@material-ui/core/Backdrop'
import CloseIcon from '@material-ui/icons/Close'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel';

import LanguageSelector from '../LanguageSelector'

import { PROFILE_QUERY, CHANGE_PASSWORD } from '../../gql'
import { useUser } from '../../context/user.context'
import styles from './styles'

const useStyles = makeStyles(styles)

const Settings = ({ onCloseSetting }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [open, setOpen] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [validEmailFormat, setValidEmailFormat] = useState(false)
  const [currentUser] = useUser()
  const [
    loadProfile,
    { error: errorProfile, loading, data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const [
    changePassword,
    { loading: loadingChangePassword, error: errorChangePassword, data: { change_password: responseChangePassword } = {} }
  ] = useMutation(CHANGE_PASSWORD)

  const handleCloseSnackBar = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const handleOpen = () => {
    setOpen(!open)
    onCloseSetting()
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const handleSubmitChangePassword = async () => {
    if (user.newPassword === user.confirmPassword) {
      changePassword({
        variables: {
          email: profile.email,
          newPassword: user.newPassword,
          currentPassword: user.currentPassword,
          emailContent: {
            subject: t('emailMessage.subjectChangePassword'),
            title: t('emailMessage.titleChangePassword'),
            message: t('emailMessage.messageChangePassword')
          }
        }
      })
    } else {
      setOpenSnackbar({
        show: true,
        message: t('setting.confirmPasswordError'),
        severity: 'error'
      })
    }
    // } else setOpenSnackbar({
    //   show: true,
    //   message: t('credentialsRecovery.passwordNotChangeable'),
    //   severity: 'error'
    // })
  }
  useEffect(() => {
    if (errorProfile)
      setOpenSnackbar({
        show: true,
        message: t('credentialsRecovery.emailError'),
        severity: 'error'
      })
  }, [errorProfile, t])

  useEffect(() => {
    if (errorChangePassword) {
      if (errorChangePassword.message === `GraphQL error: Cannot read property 'secret' of null`)
        setOpenSnackbar({
          show: true,
          message: t('credentialsRecovery.emailError'),
          severity: 'error'
        })
      else setOpenSnackbar({
        show: true,
        message: errorChangePassword.message.replace('GraphQL error: ', ''),
        severity: 'error'
      })
    }
  }, [errorChangePassword, t])

  useEffect(() => {
    if (!currentUser) {
      return
    }

    loadProfile()
  }, [currentUser, loadProfile])

  function executeCredentialsRecovery(e) {
    if (e.key === 'Enter' && (user.newPassword && user.currentPassword)) {
      e.preventDefault()
    }
    else if (e.key === 'Enter' && (!loading)) {
      e.preventDefault()
    }
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
          <form autoComplete="off">
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
              <Grid container >
                <Grid item xs={12}>
                  <Box className={classes.textFieldWrapper}>
                    <Typography variant="h3" className={classes.title}>
                      {t('setting.setting')}
                    </Typography>
                    <Divider />
                  </Box>
                  <Box className={classes.box}>
                    <Typography variant="h3" className={classes.text}>
                      {t('setting.language')}
                    </Typography>
                  </Box>
                  <Box className={classes.box}>
                    <LanguageSelector alt="settings" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.box}>
                    <Typography variant="h3" className={classes.text}>
                      {t('setting.changePassword')}
                    </Typography>
                    <Grid item xs={12}>
                      <TextField
                        id="currentPassword"
                        variant="filled"
                        type={showPassword ? 'text' : 'password'}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <InputLabel id="select-label">
                                {t('setting.currentPassword')}
                              </InputLabel>
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            </>
                          )
                        }}
                        value={user.currentPassword || ''}
                        onChange={(event) =>
                          handleSetField('currentPassword', event.target.value)
                        }
                        onKeyPress={(event) =>
                          executeCredentialsRecovery(event)
                        }
                        className={classes.box}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <InputLabel id="select-label">
                                {t('setting.newPassword')}
                              </InputLabel>
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            </>
                          )
                        }}
                        value={user.newPassword || ''}
                        onChange={(event) =>
                          handleSetField('newPassword', event.target.value)
                        }
                        onKeyPress={(event) =>
                          executeCredentialsRecovery(event)
                        }
                        className={classes.box}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <InputLabel id="select-label">
                                {t('setting.confirmPassword')}
                              </InputLabel>
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            </>
                          )
                        }}
                        value={user.confirmPassword || ''}
                        onChange={(event) =>
                          handleSetField('confirmPassword', event.target.value)
                        }
                        onKeyPress={(event) =>
                          executeCredentialsRecovery(event)
                        }
                        className={classes.box}
                      />
                    </Grid>
                    <Box className={classes.box}>
                      <Button
                        disabled={(!user.newPassword || !user.currentPassword)}
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmitChangePassword}
                        className={classes.button}
                      >
                        {t('setting.changePassword')}
                      </Button>
                    </Box>
                    <Box className={classes.loadingBox}>
                      {loading && <CircularProgress />}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleCloseSnackBar}>
                <Alert
                  className={classes.alert}
                  severity={openSnackbar.severity}
                >
                  {openSnackbar.message}
                </Alert>
              </Snackbar>
            </Box>
          </form>
        </Box>
      </Dialog>
    </>
  )
}

Settings.propTypes = {
  onCloseSetting: PropTypes.func
}

export default Settings