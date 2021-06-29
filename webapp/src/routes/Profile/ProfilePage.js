import React, { memo, useEffect, useState, lazy, Suspense } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  PROFILE_QUERY,
  GRANT_CONSENT_MUTATION,
  REVOKE_CONSENT_MUTATION
} from '../../gql'
import { useUser } from '../../context/user.context'
import LoginModal from '../../components/LoginModal'
import styles from './styles'

const useStyles = makeStyles(styles)

const ProfilePageDonor = lazy(() => import('./ProfilePageDonor'));
const ProfilePageGuest = lazy(() => import('./ProfilePageGuest'));
const ProfilePageLifebank = lazy(() => import('./ProfilePageLifebank'));
const ProfilePageSponsor = lazy(() => import('./ProfilePageSponsor'));

const ProfilePage = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const history = useHistory()
  const [, { logout }] = useUser()
  const [openAlert, setOpenAlert] = useState(false)
  const [messegaAlert, setMessegaAlert] = useState("")
  const [severity, setSeverity] = useState("success")
  const [lastConsentChange, setLastConsentChange] = useState()
  const [currentUser] = useUser()
  const handleOpenAlert = () => {
    setOpenAlert(!openAlert)
  }
  const [
    loadProfile,
    { client, error: errorProfile, loading, data: { profile: { profile } = {} } = {} }
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

  const handleConsentChange = () => {
    setLastConsentChange(profile?.consent ? 'revoke' : 'grant')
    profile?.consent ? revokeConsent() : grantConsent()
  }

  useEffect(() => {
    if (!currentUser) {
      client && client.resetStore()

      return
    }

    loadProfile()
  }, [currentUser, history, client, loadProfile])

  useEffect(() => {
    if (
      !lastConsentChange ||
      (lastConsentChange === 'grant' && !grantConsentResult) ||
      (lastConsentChange === 'revoke' && !revokeConsentResult)
    ) {
      return
    }

    if (lastConsentChange === 'grant') {
      setSeverity("success")
      setMessegaAlert(t('signup.consentGranted'))
      handleOpenAlert()
    } else {
      setSeverity("success")
      setMessegaAlert(t('signup.consentRevoked'))
      handleOpenAlert()
    }

    loadProfile()
  }, [
    grantConsentResult,
    revokeConsentResult,
    lastConsentChange,
    loadProfile,
    classes
  ])

  useEffect(() => {
    if (profile && !profile.consent) {
      setSeverity("error")
      setMessegaAlert(t('signup.noConsentNoEdit'))
      handleOpenAlert()
    }
  }, [profile])

  useEffect(() => {
    if (errorProfile) {
      if (errorProfile.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push('/')
      } else history.push('/internal-error')
    }

  }, [errorProfile])

  useEffect(() => {
    if (errorRevokeConsent) {
      if (errorRevokeConsent.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push('/')
      } else {
        setSeverity("error")
        setMessegaAlert(t('signup.consentError'))
        handleOpenAlert()
      }
    }

  }, [errorRevokeConsent])

  useEffect(() => {
    if (errorGrantConsent) {
      if (errorGrantConsent.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        history.push('/')
      } else {
        setSeverity("error")
        setMessegaAlert(t('signup.consentError'))
        handleOpenAlert()
      }
    }

  }, [errorGrantConsent])

  return (
    <Box className={classes.contentBody}>
      {!profile && (<LoginModal isOutside />)} 
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleOpenAlert}>
        <Alert onClose={handleOpenAlert} severity={severity}>
          {messegaAlert}
        </Alert>
      </Snackbar>
      {loading && <CircularProgress />}
      {!loading && currentUser && profile?.role === 'donor' && (
        <Suspense fallback={<CircularProgress />}>
          <ProfilePageDonor
            profile={profile}
            onConsentChange={handleConsentChange}
            loading={grantConsentLoading || revokeConsentLoading}
          />
        </Suspense>
      )}
      {!loading && currentUser && profile?.role === 'sponsor' && (
        <Suspense fallback={<CircularProgress />}>
          <ProfilePageSponsor profile={profile} />
        </Suspense>
      )}
      {!loading && currentUser && profile?.role === 'lifebank' && (
        <Suspense fallback={<CircularProgress />}>
          <ProfilePageLifebank profile={profile}/>
        </Suspense>
      )}
      {!currentUser &&
        <Suspense fallback={<CircularProgress />}>
          <ProfilePageGuest />
        </Suspense>}
    </Box>


  )
}

export default memo(ProfilePage)