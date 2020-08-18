import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      textTransform: 'capitalize'
    }
  },
  divider: {
    width: '100%'
  }
}))

const ProfilePageGuest = () => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="body1">Guest</Typography>
      </Box>
      <Divider className={classes.divider} />
    </>
  )
}

export default ProfilePageGuest
