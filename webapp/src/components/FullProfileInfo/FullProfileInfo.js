import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import Schedule from '../Schedule'
import { eosConfig } from '../../config'

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

const FullProfileInfo = ({ setPendingFieldsComponents, profile }) => {
  const classes = useStyles()

  const handleSetField = (component) => {
    setPendingFieldsComponents((prev) => [...prev, component])
  }

  const getRoleInfo = () => {
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

    const account = profile.account ? accountJSX : handleSetField(accountJSX)

    const organization = profile.name ? nameJSX : handleSetField(nameJSX)

    const telephone = profile.telephone
      ? telephoneJSX
      : handleSetField(telephoneJSX)

    const website = profile.website ? websiteJSX : handleSetField(websiteJSX)

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
              profile={profile ? JSON.parse(profile.schedule || '[]') : []}
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
            {}

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

        return (
          <>
            {profile.bussines_type
              ? businessTypeJSX
              : handleSetField(businessTypeJSX)}
            {profile.schedule ? scheduleJSX : handleSetField(scheduleJSX)}
            {profile.covid_impact
              ? covidImpactJSX
              : handleSetField(covidImpactJSX)}
            {profile.benefitDescription
              ? benefitDescriptionJSX
              : handleSetField(benefitDescriptionJSX)}
            {account}
            {organization}
            {telephone}
            {website}
          </>
        )
      case 'donor':
        break
      case 'lifebank':
        break
      default:
        break
    }
  }

  return <>{getRoleInfo()}</>
}

FullProfileInfo.propTypes = {
  setPendingFieldsComponents: PropTypes.func,
  profile: PropTypes.object
}

FullProfileInfo.defaultProps = {}

export default FullProfileInfo
