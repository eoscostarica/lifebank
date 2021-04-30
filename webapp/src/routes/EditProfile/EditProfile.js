import React, { useEffect, useCallback, useState, lazy, Suspense } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { Alert, AlertTitle } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'react-i18next'

import {
  PROFILE_QUERY,
  GRANT_CONSENT_MUTATION,
  REVOKE_CONSENT_MUTATION,
  EDIT_PROFILE_MUTATION,
  SET_USERNAME
} from '../../gql'
import { useUser } from '../../context/user.context'
import styles from './styles'

const useStyles = makeStyles(styles)

const EditProfileDonor = lazy(() => import('./EditProfileDonor'));
const EditProfileBank = lazy(() => import('./EditProfileBank'));
const EditProfileSponsor = lazy(() => import('./EditProfileSponsor'));

const EditProfilePage = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const [, { logout }] = useUser()
  const [currentUser] = useUser()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [isCompleting, setIsCompleting] = useState()
  const [userName, setuserName] = useState()
  const [
    loadProfile,
    { error: errorProfile, loading, data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const [
    revokeConsent,
    {
      error: errorRevokeConsent,
      loading: revokeConsentLoading,
      data: { revoke_consent: revokeConsentResult } = {}
    }
  ] = useMutation(REVOKE_CONSENT_MUTATION)

  const [
    grantConsent,
    {
      error: errorGrantConsent,
      loading: grantConsentLoading,
      data: { grant_consent: grantConsentResult } = {}
    }
  ] = useMutation(GRANT_CONSENT_MUTATION)

  const [
    editProfile,
    { error: errorEditResults, loading: editLoading, data: { edit_profile: editProfileResult } = {} }
  ] = useMutation(EDIT_PROFILE_MUTATION)

  const [setUsername] = useMutation(SET_USERNAME)

  const handleConsentChange = () => {
    profile?.consent ? revokeConsent() : grantConsent()
  }

  const handleUpdateUser = (userEdited, userNameEdited, account) => {
    editProfile({
      variables: {
        profile: userEdited
      }
    })
    if (account && userNameEdited) {
      setUsername({
        variables: {
          account: account,
          username: userNameEdited
        }
      })
    }
  }
  const handleCloseSnackBar = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }
  useEffect(() => {
    if (!currentUser) {
      return
    }

    loadProfile()
  }, [currentUser, loadProfile])

  useEffect(() => {
    if (grantConsentResult || revokeConsentResult) {
      loadProfile()
    }
  }, [grantConsentResult, revokeConsentResult, loadProfile])

  useEffect(() => {
    if (!editProfileResult) return

    const { success } = editProfileResult

    if (success) {
      history.push({
        pathname: '/profile',
        state: true
      })

    } else if (!success) {
      setOpenSnackbar({
        show: true,
        message: t('editProfile.duringSaveProfileData'),
        severity: 'error'
      })
    }
  }, [editProfileResult])

  useEffect(() => {
    if (location.state) {
      location.state
        ? setIsCompleting(location.state.isCompleting)
        : setIsCompleting(false)
      setuserName(location.state.userName)
    } else history.push('/profile')

  }, [location])

  useEffect(() => {
    if (errorProfile) {
      if (errorProfile.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push('/')
      } else history.push('/internal-error')
    }

  }, [errorProfile])

  useEffect(() => {
    if (errorRevokeConsent || errorGrantConsent || errorEditResults) {
      setOpenSnackbar({
        show: true,
        message: t('editProfile.duringSaveProfileData'),
        severity: 'error'
      })
    }

  }, [errorRevokeConsent, errorGrantConsent, errorEditResults])


  return (
    <Box className={classes.wrapper}>
      <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleCloseSnackBar}>
        <Alert
          severity={openSnackbar.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseSnackBar}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{t('editProfile.error')}</AlertTitle>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
      <Typography variant="h1" className={classes.title}>
        {t('editProfile.editProfile')}
      </Typography>
      {loading && <CircularProgress />}
      {!loading && currentUser && profile?.role === 'donor' && (
        <Suspense fallback={<CircularProgress />}>
          <EditProfileDonor
            profile={profile}
            onConsentChange={handleConsentChange}
            loading={grantConsentLoading || revokeConsentLoading || editLoading}
            onSubmit={handleUpdateUser}
          />
        </Suspense>
      )}
      {!loading && currentUser && profile?.role === 'sponsor' && (
        <Suspense fallback={<CircularProgress />}>
          <EditProfileSponsor
            profile={profile}
            isCompleting={isCompleting}
            onSubmit={handleUpdateUser}
            loading={editLoading}
          />
        </Suspense>
      )}
      {!loading && currentUser && profile?.role === 'lifebank' && (
        <Suspense fallback={<CircularProgress />}>
          <EditProfileBank
            profile={profile}
            userName={userName}
            isCompleting={isCompleting}
            onSubmit={handleUpdateUser}
            loading={editLoading}
          />
        </Suspense>
      )}
    </Box>
  )
}

export default EditProfilePage
