import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert, AlertTitle } from '@material-ui/lab'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  PROFILE_QUERY,
  GRANT_CONSENT_MUTATION,
  REVOKE_CONSENT_MUTATION,
  NOTIFICATION_SUBSCRIPTION
} from '../../gql'
import { useUser } from '../../context/user.context'
import ProfilePageDonor from './ProfilePageDonor'
import ProfilePageGuest from './ProfilePageGuest'
import ProfilePageLifebank from './ProfilePageLifebank'
import ProfilePageSponsor from './ProfilePageSponsor'
import { eosConfig } from '../../config'

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
  const [snackbarState, setSnackbarState] = useState({})
  const [lastNotification, setLastNotification] = useState()
  const [lastConsentChange, setLastConsentChange] = useState()
  const [currentUser] = useUser()
  const [
    loadProfile,
    { client, loading, data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })
  const [
    revokeConsent,
    {
      loading: revokeConsentLoading,
      data: { revoke_consent: revokeConsentResult } = {}
    }
  ] = useMutation(REVOKE_CONSENT_MUTATION)
  const [
    grantConsent,
    {
      loading: grantConsentLoading,
      data: { grant_consent: grantConsentResult } = {}
    }
  ] = useMutation(GRANT_CONSENT_MUTATION)
  const { data: { notification } = {} } = useSubscription(
    NOTIFICATION_SUBSCRIPTION
  )

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

    setSnackbarState({
      open: true,
      title: `Success ${lastConsentChange} consent`,
      description: (
        <>
          Transaction
          <Link
            href={`${eosConfig.BLOCK_EXPLORER_URL}transaction/${
              lastConsentChange === 'grant'
                ? grantConsentResult.transaction_id
                : revokeConsentResult.transaction_id
            }`}
            target="_blank"
            rel="noopener"
            color="secondary"
            className={classes.transactionLink}
          >
            {lastConsentChange === 'grant'
              ? grantConsentResult.transaction_id
              : revokeConsentResult.transaction_id}
          </Link>
        </>
      )
    })
    loadProfile()
  }, [
    grantConsentResult,
    revokeConsentResult,
    lastConsentChange,
    loadProfile,
    classes
  ])

  useEffect(() => {
    if (
      !profile ||
      !notification?.length ||
      notification[0]?.id === lastNotification?.id
    ) {
      return
    }

    if (
      notification[0]?.payload.newBalance.join() === profile?.balance.join()
    ) {
      return
    }

    setLastNotification(notification[0])
    loadProfile()
  }, [notification, profile, lastNotification, loadProfile])

  useEffect(() => {
    if (!lastNotification) {
      return
    }

    setSnackbarState({
      open: true,
      title: lastNotification.title,
      description: lastNotification.description
    })
  }, [lastNotification])

  return (
    <Box className={classes.wrapper}>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarState({})}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarState({})} severity="success">
          <AlertTitle>{snackbarState.title}</AlertTitle>
          {snackbarState.description}
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
