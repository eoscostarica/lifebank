import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { eosConfig } from '../../config'

const URGENCY = {
  1: 'Low',
  2: 'Medium',
  3: 'High'
}

const useStyles = makeStyles(() => ({
  popup: {},
  ul: {
    margin: 0
  },
  title: {
    fontWeight: 'bold'
  },
  link: {
    textDecoration: 'none'
  }
}))

// TODO: Improve styles and add a Link using the id to navigate to the detail screen of the SPONSOR | LIFE_BANK.
function MapPopup({ id, info }) {
  const classes = useStyles()
  const nameURL = info.name.replaceAll(" ", "-")
  console.log("nameURL", nameURL)
  console.log("info.geolocation.latitude", info.geolocation.latitude)
  return (
    <Box key={id}>
      <div className={classes.title}>{info.name}</div>
      <div>
        Phone:{' '}
        <a
          href={`tel:${info.telephone || info.phone_number}`}
          className={classes.link}
        >
          {info.telephone || info.phone_number}
        </a>
      </div>
      {info.business_type && <div>Business type: {info.business_type}</div>}
      {(
        <div>
          Website:{' '}
          <a
            href={window.location.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            Open site
          </a>
        </div>
      )}
      <div>
        Location:{' '}
        <a
          className={classes.link}
          href={"http://maps.google.com/maps?q=" + info.geolocation.latitude + "," + info.geolocation.longitude}
        >
          Go to
        </a>
      </div>
    </Box>
  )
}

MapPopup.propTypes = {
  id: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired
}

export default MapPopup
