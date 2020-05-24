import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import { PROFILE_QUERY } from '../../gql'
import { useUser } from '../../context/user.context'

import ProfilePageGuest from './ProfilePageGuest'
import ProfilePageDonor from './ProfilePageDonor'
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
    { called, loading, data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  useEffect(() => {
    if (!currentUser || called) {
      return
    }

    loadProfile()
  }, [currentUser])

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        My Profile
      </Typography>
      {loading && <CircularProgress />}
      {!loading && currentUser && profile?.role === 'donor' && (
        <ProfilePageDonor profile={profile} />
      )}
      {!loading && currentUser && profile?.role === 'sponsor' && (
        <ProfilePageSponsor profile={profile} />
      )}
      {!currentUser && <ProfilePageGuest />}
    </Box>
  )
}

export default ProfilePage
