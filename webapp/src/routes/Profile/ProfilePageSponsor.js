import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { Link as LinkRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import QRCode from 'qrcode.react'
import Link from '@material-ui/core/Link'

import Schedule from '../../components/Schedule'
import MapShowLocations from '../../components/MapShowLocations'

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
  },
  editBtn: {
    margin: theme.spacing(2, 0)
  },
  secondaryText: {
    color: `${theme.palette.secondary.main} !important`
  },
  noCapitalize: {
    textTransform: 'none !important'
  }
}))

const ProfilePageSponsor = ({ profile }) => {
  const classes = useStyles()

  console.log(profile)

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
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Organization</Typography>
        <Typography variant="body1">{profile.name}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Email</Typography>
        <Typography variant="body1" className={classes.noCapitalize}>
          {profile.email}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Role</Typography>
        <Typography variant="body1">{profile.role}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Status</Typography>
        <Typography variant="body1">Active</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Telephone</Typography>
        <Typography variant="body1">{profile.telephone}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Website</Typography>
        <Typography variant="body1" className={classes.noCapitalize}>
          <Link
            href={profile.account}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            {profile.website}
          </Link>
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Type</Typography>
        <Typography variant="body1">{profile.bussines_type}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Consent</Typography>
        <Typography variant="body1">{`${profile.consent}`}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Balance</Typography>
        <Link
          href={`https://jungle.bloks.io/account/lifebankcoin?loadContract=true&tab=Tables&table=accounts&account=lifebankcoin&scope=${profile.account}&limit=100`}
          target="_blank"
          rel="noopener"
          color="secondary"
        >
          <Typography variant="body1" className={classes.secondaryText}>
            {profile.balance[0]}
          </Typography>
        </Link>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Community Asset</Typography>
        <Typography variant="body1" className={classes.secondaryText}>
          {profile.community_asset}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Schedule</Typography>
        <Typography variant="body1" />
      </Box>
      <Schedule
        data={profile ? JSON.parse(profile.schedule || '[]') : []}
        showSchedule
        showButton={false}
      />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Covid Impact</Typography>
        <Typography variant="body1" />
      </Box>
      <TextField
        id="covidImpact"
        variant="outlined"
        disabled
        defaultValue={profile.covid_impact}
        InputLabelProps={{
          shrink: true
        }}
        multiline
        fullWidth
        rows={3}
      />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Benefit Description</Typography>
        <Typography variant="body1" />
      </Box>
      <TextField
        id="benefitDescription"
        variant="outlined"
        disabled
        defaultValue={profile.benefit_description}
        InputLabelProps={{
          shrink: true
        }}
        multiline
        fullWidth
        rows={3}
      />

      <MapShowLocations
        location={profile ? JSON.parse(profile.location || '{}') : {}}
        width="100%"
        height={400}
        py={2}
      />

      <QRCode value={profile.account} size={200} />
      <LinkRouter to="/edit-profile" className={classes.editBtn}>
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </LinkRouter>
    </>
  )
}

ProfilePageSponsor.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageSponsor
