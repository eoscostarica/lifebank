import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { useUser } from '../../context/user.context'
import { SIGNUP_MUTATION, PROFILE_QUERY, GET_ACCOUNT_NAME, EDIT_PROFILE_MUTATION } from '../../gql'
import SignupAccount from '../Signup/SignupAccount'
import SignupConsent from '../Signup/SignupConsent'
import styles from './styles'

const useStyles = makeStyles(styles)

const ConsetComponent = () => {
  const [currentUser] = useUser()
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [openConsent, setOpenConsent] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [maxWidthConset] = useState('sm')
  const [
    signup,
    { error: errorSignup, loading: signupLoading, data: { signup: signupResult } = {} }
  ] = useMutation(SIGNUP_MUTATION)

  const [
    loadProfile,
    { error: errorProfile, data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const { refetch: accountName } = useQuery(GET_ACCOUNT_NAME, {
    variables: {},
    skip: true
  })

  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION)

  const handleOpenConsent = () => {
    setOpenConsent(!openConsent)
  }

  const handleSingup = () => {
    signup({
      variables: {
        profile
      }
    })
    handleOpenConsent()
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  useEffect(() => {
    if (currentUser) {
      loadProfile()
    }

  }, [currentUser])

  useEffect(() => {
    if (currentUser && profile && !profile.consent) handleOpenConsent()
  }, [profile])

  useEffect(() => {
    if (signupResult) {
      if (signupResult.success) {
        if (profile.role === 'sponsor') updateProfile()
        setOpenSnackbar({
          show: true,
          message: t('signup.consentGranted'),
          severity: 'success'
        })
      } else {
        setOpenSnackbar({
          show: true,
          message: t('signup.consentError'),
          severity: 'error'
        })
      }
    }
  }, [signupResult])

  useEffect(() => {
    if (errorSignup || errorProfile) {
      setOpenSnackbar({
        show: true,
        message: t('signup.consentError'),
        severity: 'error'
      })
    }
  }, [errorSignup, errorProfile])

  const updateProfile = async () => {
    const { data: { user } } = await accountName({ account: currentUser.account })
    if (user.length > 0) {
      const name = user[0].name
      editProfile({
        variables: {
          profile: { name }
        }
      })
    }
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidthConset}
        open={openConsent}
        onClose={handleOpenConsent}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dialogConset}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOpenConsent}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box>
            <Box className={classes.stepperContent}>
              <Typography className={classes.titleConsent}> {t('signup.termsAndConditions')}</Typography>
              <Typography variant="body1" className={classes.textConsent}>{t('signup.termsAndConditionsInfo')}</Typography>
            </Box>
            <SignupAccount account={profile ? profile.account : ""} />
            <SignupConsent onSubmit={handleSingup} loading={signupLoading} />
          </Box>
        </Box>
      </Dialog>
      <Snackbar open={openSnackbar.show} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ConsetComponent