import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Alert from '@material-ui/lab/Alert'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import QRCode from 'qrcode.react'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'

import Schedule from '../../components/Schedule'
import MapShowLocations from '../../components/MapShowLocations'
import { eosConfig } from '../../config'

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

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
  element: {
    height: '100%',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2)
  },
  dialogContent: {
    padding: theme.spacing(5, 2),
    marginTop: theme.spacing(10)
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  },
  textFieldWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
  const [open, setOpen] = useState(false)
  const [pendingFields, setPendingFields] = useState()
  //const [pendingFieldsComponents, setPendingFieldsComponents] = useState([])

  const checkAvailableFields = () => {
    let pendingFieldsObject = {}

    if (!profile.name)
      pendingFieldsObject = { ...pendingFieldsObject, name: false }

    if (!profile.telephone)
      pendingFieldsObject = { ...pendingFieldsObject, telephone: false }

    if (!profile.website)
      pendingFieldsObject = { ...pendingFieldsObject, website: false }

    if (!profile.schedule)
      pendingFieldsObject = { ...pendingFieldsObject, schedule: false }

    if (!profile.covid_impact)
      pendingFieldsObject = { ...pendingFieldsObject, covid_impact: false }

    if (!profile.benefit_description)
      pendingFieldsObject = {
        ...pendingFieldsObject,
        benefit_description: false
      }

    if (!profile.location)
      pendingFieldsObject = { ...pendingFieldsObject, location: false }

    setPendingFields(pendingFieldsObject)
  }

  // const handleSetField = (field, value) => {
  //   setUser({ ...user, [field]: value })
  // }

  useEffect(() => {
    if (profile) checkAvailableFields()
  }, [profile])

  return (
    <>
      {pendingFields && (
        <Box>
          <Alert severity="info">
            Your profile is not complete
            <Button
              to={{ pathname: '/edit-profile', state: { isCompleting: true } }}
              className={classes.noCapitalize}
            >
              Update
            </Button>
          </Alert>
          <LinearProgress
            variant="determinate"
            value={(Object.keys(pendingFields).length * 100) / 10}
          />
        </Box>
      )}
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Email</Typography>
        <Typography variant="body1" className={classes.noCapitalize}>
          {profile.email}
        </Typography>
      </Box>
      <Box
        style={{ display: !profile.account ? 'none' : '' }}
        className={classes.rowBox}
      >
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
      <Box
        style={{ display: !profile.name ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Organization</Typography>
        <Typography variant="body1">{profile.name}</Typography>
      </Box>
      <Box
        style={{ display: !profile.telephone ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Telephone</Typography>
        <Typography variant="body1">{profile.telephone}</Typography>
      </Box>
      <Box
        style={{ display: !profile.website ? 'none' : '' }}
        className={classes.rowBox}
      >
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
      <Box
        style={{ display: !profile.bussines_type ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Type</Typography>
        <Typography variant="body1">{profile.bussines_type}</Typography>
      </Box>
      <Box
        style={{ display: !profile.consent ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Consent</Typography>
        <Typography variant="body1">{`${profile.consent}`}</Typography>
      </Box>
      <Box
        style={{ display: !profile.community_asset ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Community Asset</Typography>
        <Typography variant="body1" className={classes.secondaryText}>
          {profile.community_asset}
        </Typography>
      </Box>
      <Box
        style={{ display: !profile.schedule ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Schedule</Typography>
        <Typography variant="body1" />
      </Box>
      <Schedule
        style={{ display: !profile.schedule ? 'none' : '' }}
        data={profile ? JSON.parse(profile.schedule || '[]') : []}
        showSchedule
        showButton={false}
      />
      <Box
        style={{ display: !profile.covid_impact ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Covid Impact</Typography>
        <Typography variant="body1" />
      </Box>
      <TextField
        style={{ display: !profile.covid_impact ? 'none' : '' }}
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
      <Box
        style={{ display: !profile.benefit_description ? 'none' : '' }}
        className={classes.rowBox}
      >
        <Typography variant="subtitle1">Benefit Description</Typography>
        <Typography variant="body1" />
      </Box>
      <TextField
        style={{ display: !profile.benefit_description ? 'none' : '' }}
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
      {profile.location && (
        <MapShowLocations
          location={profile ? JSON.parse(profile.location || '{}') : {}}
          width="100%"
          height={400}
          py={2}
        />
      )}
      {/* {pendingFieldsComponents && (
           <Paper className={classes.paper}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4">Your profile is not complete</Typography>
            <LinearProgress
              variant="determinate"
              value={(pendingFieldsComponents.length * 100) / 10}
            />
            <hr />
            <Box display="flex" justifyContent="center">
              <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                color="secondary"
              >
                Complete profile
              </Button>
            </Box>
            <Dialog
              fullScreen
              open={open}
              onClose={() => setOpen(false)}
              TransitionComponent={Transition}
            >
              <AppBar>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setOpen(false)}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h1" className={classes.title}>
                    Complete your profile
                  </Typography>
                </Toolbar>
              </AppBar>
              <Box
                className={classes.dialogContent}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <ProfileCompletion
                  fields={pendingFieldsComponents}
                  classes={classes}
                />
              </Box>
            </Dialog>
          </Box>
        </Paper>
      )} */}

      <QRCode value={profile.account} size={200} />
      <LinkRouter
        to={{ pathname: '/edit-profile', state: { isCompleting: false } }}
        className={classes.editBtn}
      >
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
