import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import { constants } from '../../config'
import sponsorSvg from './locator-sponsor-01.svg'
import pendingSponsorSvg from './locator-donators-01.svg'
import lifeBankSvg from './locator-donators-01.svg'

const {
  LOCATION_TYPES: { PENDING_SPONSOR, SPONSOR, LIFE_BANK }
} = constants

const useStyles = makeStyles((theme) => ({
  marker: {
    backgroundImage: ({ type }) => {
      switch (type) {
        case SPONSOR:
          return `url(${sponsorSvg})`

        case PENDING_SPONSOR:
          return `url(${pendingSponsorSvg})`

        case LIFE_BANK:
          return `url(${lifeBankSvg})`

        default:
          return `url(${lifeBankSvg})`
      }
    },
    backgroundSize: 'cover',
    width: 30,
    height: 30,
    borderRadius: '50%',
    cursor: 'pointer'
  }
}))

function MapMarker({ type }) {
  const classes = useStyles({ type })

  return <Box className={classes.marker} />
}

MapMarker.propTypes = {
  type: PropTypes.oneOf([SPONSOR, PENDING_SPONSOR, LIFE_BANK])
}

export default MapMarker
