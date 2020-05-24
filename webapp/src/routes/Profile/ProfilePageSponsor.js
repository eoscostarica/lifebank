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

const ProfilePageSponsor = ({ profile }) => {
  const classes = useStyles()

  return (
    <>
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
      <QRCode value={profile.account} size={200} />
      <Button variant="contained" color="primary" className={classes.editBtn}>
        Edit
      </Button>
    </>
  )
}

ProfilePageSponsor.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageSponsor
