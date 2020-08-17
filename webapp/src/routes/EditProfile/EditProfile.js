import React, { useEffect, useCallback, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Alert, AlertTitle } from '@material-ui/lab'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'

import {
  PROFILE_QUERY,
  GRANT_CONSENT_MUTATION,
  REVOKE_CONSENT_MUTATION,
  EDIT_PROFILE_MUTATION
} from '../../gql'
import { useUser } from '../../context/user.context'

import EditProfileDonor from './EditProfileDonor'
import EditProfileBank from './EditProfileBank'
import EditProfileSponsor from './EditProfileSponsor'

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
  },
  linkSuccess: {
    textDecoration: 'none',
    color: 'rgb(26, 64, 28)'
  },
  linkError: {
    textDecoration: 'none',
    color: 'rgb(91, 22, 21)'
  },
  boxMessage: {
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}))

const EditProfilePage = () => {
  const classes = useStyles()
  const [currentUser] = useUser()
  const [showAlert, setShowAlert] = useState({ error: false, success: false })
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

  const [
    editProfile,
    { loading: editLoading, data: { edit_profile: editProfileResult } = {} }
  ] = useMutation(EDIT_PROFILE_MUTATION)

  const handleConsentChange = () => {
    profile?.consent ? revokeConsent() : grantConsent()
  }

  const handleUpdateUser = useCallback(
    (userEdited) => {
      editProfile({
        variables: {
          profile: userEdited
        }
      })
    },
    [editProfile]
  )

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
      loadProfile()
      setShowAlert({ error: false, success: true })
    } else if (!success) {
      setShowAlert({ error: true, success: false })
    }
  }, [editProfileResult, loadProfile])

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.boxMessage}>
        {showAlert.error && (
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowAlert({ error: false, success: false })}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Error</AlertTitle>
            During save profile data -
            <Link to="/profile" className={classes.linkError}>
              <strong> Go to profile!</strong>
            </Link>
          </Alert>
        )}
        {showAlert.success && (
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowAlert({ error: false, success: false })}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Success</AlertTitle>
            Profile was updated —
            <Link to="/profile" className={classes.linkSuccess}>
              <strong> Go to profile!</strong>
            </Link>
          </Alert>
        )}
      </Box>
      <Typography variant="h1" className={classes.title}>
        Edit Profile
      </Typography>
      {loading && <CircularProgress />}
      {!loading && currentUser && profile?.role === 'donor' && (
        <EditProfileDonor
          profile={profile}
          onConsentChange={handleConsentChange}
          loading={grantConsentLoading || revokeConsentLoading || editLoading}
          onSubmit={handleUpdateUser}
        />
      )}
      {!loading && currentUser && profile?.role === 'sponsor' && (
        <EditProfileSponsor
          profile={profile}
          onSubmit={handleUpdateUser}
          loading={editLoading}
        />
      )}
      {!loading && currentUser && profile?.role === 'lifebank' && (
        <EditProfileBank
          profile={profile}
          onSubmit={handleUpdateUser}
          loading={editLoading}
        />
      )}
    </Box>
  )
}

export default EditProfilePage
