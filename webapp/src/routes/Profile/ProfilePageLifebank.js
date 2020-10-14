import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'

import Schedule from '../../components/Schedule'
import MapShowOneLocation from '../../components/MapShowOneLocation'

const { eosConfig } = require('../../config')

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
  }
}))

const ProfilePageLifebank = ({ profile }) => {
  const classes = useStyles()
  console.log("profile.location", profile.location)
  console.log("profile.locationJS", JSON.parse(profile.location))
  return (
    <>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Account</Typography>
        <Typography variant="body1">
          <Link
            href={`${eosConfig.BLOCK_EXPLORER_URL}account/${profile.account}`}
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
        <Typography variant="subtitle1">Role</Typography>
        <Typography variant="body1">{profile.role}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Email</Typography>
        <Typography variant="body1">{profile.email}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Address</Typography>
        <Typography variant="body1">{profile.address}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Telephone</Typography>
        <Typography variant="body1">{profile.phone_number}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Consent</Typography>
        <Typography variant="body1">{`${profile.consent}`}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Community Assets</Typography>
        <Typography variant="body1" className={classes.secondaryText}>
          {profile.community_asset}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Has Immunity Test</Typography>
        <Typography variant="body1">{`${Boolean(
          profile.has_inmmunity_test
        )}`}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Blood Urgency Level</Typography>
        <Typography variant="body1" className={classes.secondaryText}>
          {profile.blood_urgency_level}
        </Typography>
      </Box>
      <Divider className={classes.divider} />

      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Schedule</Typography>
        <Typography variant="body1" />
      </Box>
      <Schedule
        data={JSON.parse(profile.schedule)}
        showSchedule
        showButton={false}
      />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Benefit Description</Typography>
        <Typography variant="body1" />
      </Box>
      <TextField
        id="benefitDescription"
        variant="outlined"
        disabled
        defaultValue={profile.description}
        InputLabelProps={{
          shrink: true
        }}
        multiline
        fullWidth
        rows={3}
      />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Location</Typography>
        <Typography variant="body1" />
      </Box>

      <MapShowOneLocation
        markerLocation={JSON.parse(profile.location)}
        accountProp={profile.account}
        width="100%"
        height={400}
        py={2}
      />

      <Divider className={classes.divider} />
      <LinkRouter to="/edit-profile" className={classes.editBtn}>
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </LinkRouter>
    </>
  )
}

ProfilePageLifebank.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageLifebank
