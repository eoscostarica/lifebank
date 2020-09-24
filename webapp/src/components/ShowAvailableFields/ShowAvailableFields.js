import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import { eosConfig, constants } from '../../config'
import Schedule from '../Schedule'
import MapSelectLocation from '../MapSelectLocation'
import MapShowLocations from '../MapShowLocations'

const {
  LOCATION_TYPES: { SPONSOR }
} = constants

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
  noCapitalize: {
    textTransform: 'none !important'
  }
}))

const ShowAvailableFields = ({ setPendingFieldsParent, profile }) => {
  const [pendingFields, setPendingFields] = useState([])
  const [availableFields, setAvailableFields] = useState([])
  const classes = useStyles()

  const accountJSX = (
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
  )

  const nameJSX = (
    <Box className={classes.rowBox}>
      <Typography variant="subtitle1">Organization</Typography>
      <Typography variant="body1">{profile.name}</Typography>
    </Box>
  )

  const telephoneJSX = (
    <Box className={classes.rowBox}>
      <Typography variant="subtitle1">Telephone</Typography>
      <Typography variant="body1">{profile.telephone}</Typography>
    </Box>
  )

  const websiteJSX = (
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
  )

  const mapJSX = (
    <Box className={classes.map}>
      <MapShowLocations
        location={profile ? JSON.parse(profile.location || '{}') : {}}
        width="100%"
        height={400}
        py={2}
      />
    </Box>
  )

  const selectLocationJSX = (
    <MapSelectLocation
      //onGeolocationChange={(value) => handleSetField('geolocation', value)}
      markerType={SPONSOR}
      width="100%"
      height={400}
      mb={1}
    />
  )

  const getRoleInfo = () => {
    !profile.account
      ? setPendingFields((prev) => [...prev, accountJSX])
      : setAvailableFields((prev) => [...prev, accountJSX])

    !profile.name
      ? setPendingFields((prev) => [...prev, nameJSX])
      : setAvailableFields((prev) => [...prev, nameJSX])

    !profile.telephone
      ? setPendingFields((prev) => [...prev, telephoneJSX])
      : setAvailableFields((prev) => [...prev, telephoneJSX])

    !profile.website
      ? setPendingFields((prev) => [...prev, websiteJSX])
      : setAvailableFields((prev) => [...prev, websiteJSX])

    switch (profile.role) {
      case 'sponsor':
        const businessTypeJSX = (
          <Box className={classes.rowBox}>
            <Typography variant="subtitle1">Type</Typography>
            <Typography variant="body1">{profile.bussines_type}</Typography>
          </Box>
        )

        const scheduleJSX = (
          <>
            <Box className={classes.rowBox}>
              <Typography variant="subtitle1">Schedule</Typography>
              <Typography variant="body1" />
            </Box>
            <Schedule
              data={
                profile && profile.schedule
                  ? JSON.parse(profile.schedule || '[]')
                  : []
              }
              showSchedule
              showButton={false}
            />
          </>
        )

        const covidImpactJSX = (
          <>
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
          </>
        )

        const benefitDescriptionJSX = (
          <>
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
          </>
        )

        !profile.bussines_type
          ? setPendingFields((prev) => [...prev, businessTypeJSX])
          : setAvailableFields((prev) => [...prev, businessTypeJSX])

        !profile.schedule
          ? setPendingFields((prev) => [...prev, scheduleJSX])
          : setAvailableFields((prev) => [...prev, scheduleJSX])

        !profile.covid_impact
          ? setPendingFields((prev) => [...prev, covidImpactJSX])
          : setAvailableFields((prev) => [...prev, covidImpactJSX])

        !profile.benefitDescription
          ? setPendingFields((prev) => [...prev, benefitDescriptionJSX])
          : setAvailableFields((prev) => [...prev, benefitDescriptionJSX])

        !profile.location
          ? setPendingFields((prev) => [...prev, selectLocationJSX])
          : setAvailableFields((prev) => [...prev, mapJSX])

        break
      case 'donor':
        break
      case 'lifebank':
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (profile) getRoleInfo()
  }, [profile])

  useEffect(() => {
    setPendingFieldsParent(pendingFields)
  }, [pendingFields])

  return <>{availableFields && availableFields.map((field) => <>{field}</>)}</>
}

ShowAvailableFields.propTypes = {
  setPendingFieldsParent: PropTypes.func,
  profile: PropTypes.object
}

ShowAvailableFields.defaultProps = {}

export default ShowAvailableFields
