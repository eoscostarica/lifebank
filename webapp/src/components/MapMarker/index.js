import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import { constants } from '../../config'

const {
  LOCATION_TYPES: { SPONSOR, LIFE_BANK }
} = constants

const useStyles = makeStyles((theme) => ({
  // TODO: Request svg icon for each type(SPONSOR | LIFE_BANK | DEFAULT).
  marker: {
    backgroundImage: ({ type }) => {
      switch (type) {
        case SPONSOR:
          return `url('./sponsor.svg')`

        case LIFE_BANK:
          return `url('./bloodBank.svg')`

        default:
          return `url('./default.svg')`
      }
    },
    backgroundSize: 'cover',
    width: 25,
    height: 25,
    borderRadius: '50%',
    cursor: 'pointer'
  },
  // TODO: Remove tempMarker classname after replace it for marker.
  tempMarker: {
    width: 25,
    height: 25,
    border: 'solid',
    backgroundColor: ({ type }) => {
      switch (type) {
        case SPONSOR:
          return 'red'

        case LIFE_BANK:
          return 'blue'

        default:
          return 'yellow'
      }
    }
  }
}))

function MapMarker({ type }) {
  const classes = useStyles({ type })

  // TODO: Use marker className instead of tempMarker to show svg icons based on the type(SPONSOR | LIFE_BANK | DEFAULT)
  return <Box className={classes.tempMarker} />
}

MapMarker.propTypes = {
  type: PropTypes.oneOf([SPONSOR, LIFE_BANK])
}

export default MapMarker
