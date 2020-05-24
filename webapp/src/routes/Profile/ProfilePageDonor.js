import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import QRCode from 'qrcode.react'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(2)
  }
}))

const ProfilePageDonor = ({ profile }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="body1">{profile.fullname}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Account</Typography>
        <Typography variant="body1">
          <Link
            href={`https://jungle.bloks.io/account/${profile.account}`}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            {profile.account}
          </Link>
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Role</Typography>
        <Typography variant="body1">{profile.role}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Comunities</Typography>
        <Typography variant="body1">
          {profile.comunities.join(', ') || 'N/A'}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Concent status</Typography>
        <Typography variant="body1">
          {profile.concent ? 'Granted' : 'Revoked'}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box height={30} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Tokens</Typography>
        <Typography variant="body1">
          {profile.balance.join(', ') || '0 LIFE'}
        </Typography>
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
      <QRCode value={profile.account} size={200} />
      <Button variant="contained" color="primary" className={classes.editBtn}>
        Edit
      </Button>
    </>
  )
}

ProfilePageDonor.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageDonor
