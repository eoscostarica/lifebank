import React, { useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  }
}))

const ProfilePage = () => {
  const classes = useStyles()
  const [currentUser] = useUser()
  const [
    loadProfile,
    { loading, data: { profile: { profile } = {} } = {} }
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

  const handleConsentChange = () => {
    profile?.consent ? revokeConsent() : grantConsent()
  }

  useEffect(() => {
    if (!currentUser) {
      return
    }

    loadProfile()
  }, [currentUser])

  useEffect(() => {
    if (grantConsentResult || revokeConsentResult) {
      loadProfile()
    }
  }, [grantConsentResult, revokeConsentResult])

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        My Profile
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
