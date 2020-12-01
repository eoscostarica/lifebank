import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
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
import ProfilePageDonor from './ProfilePageDonor'
import ProfilePageGuest from './ProfilePageGuest'
import ProfilePageLifebank from './ProfilePageLifebank'
import ProfilePageSponsor from './ProfilePageSponsor'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '100%',
    padding: theme.spacing(6, 1, 0, 1),
    alignItems: 'center'
  },
  title: {
    fontSize: 48,
    marginBottom: theme.spacing(4)
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    }
  },
  divider: {
    width: '100%'
  },
  editBtn: {
    marginTop: theme.spacing(4)
  },
  transactionLink: {
    wordBreak: 'break-all'
  }
}))

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
      history.replace('/')

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
    <Box className={classes.wrapper}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleOpenAlert}>
        <Alert onClose={handleOpenAlert} severity={severity}>
          {messegaAlert}
        </Alert>
      </Snackbar>
      <Typography variant="h1" className={classes.title}>
        {t('profile.myProfile')}
      </Typography>
      {loading && <CircularProgress />}
      {!loading && currentUser && profile?.role === 'donor' && (
        <ProfilePageDonor
          profile={profile}
          onConsentChange={handleConsentChange}
          loading={grantConsentLoading || revokeConsentLoading}
        />
      )}
      {!loading && currentUser && profile?.role === 'sponsor' && (
        <ProfilePageSponsor profile={profile} />
      )}
      {!loading && currentUser && profile?.role === 'lifebank' && (
        <ProfilePageLifebank profile={profile} />
      )}
      {!currentUser && <ProfilePageGuest />}
    </Box>
  )
}

export default ProfilePage
