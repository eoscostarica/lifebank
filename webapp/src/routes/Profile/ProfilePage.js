import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

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

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        My Profile
      </Typography>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="body1">John Doe</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Account</Typography>
        <Typography variant="body1">12letteruser</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Role</Typography>
        <Typography variant="body1">Donor</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Status</Typography>
        <Typography variant="body1">Active</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box height={30} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Tokens</Typography>
        <Typography variant="body1">0</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Redeemed</Typography>
        <Typography variant="body1">0</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Expired</Typography>
        <Typography variant="body1">0</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Button variant="contained" color="primary" className={classes.editBtn}>
        Edit
      </Button>
    </Box>
  )
}

export default ProfilePage
