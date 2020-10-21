import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

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

  var isMobile = {
    platform: function () {
      return navigator.platform.match(/Android|Linux|iPhone|iPod|iPad|iPhone Simulator|iPod Simulator|iPad Simulator|Pike v7.6 release 92|Pike v7.8 release 517/i);
    }
  }

  const goto = () => {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i) && isMobile.platform()) {
      return "maps:0,0?q=" + info.geolocation.latitude + "," + info.geolocation.longitude
    }
    else if (navigator.userAgent.match(/Android|BlackBerry|Opera Mini/i) && isMobile.platform()) {
      return "geo:0,0?q=" + info.geolocation.latitude + "," + info.geolocation.longitude
    }
    else {
      return "http://maps.google.com/maps?q=" + info.geolocation.latitude + "," + info.geolocation.longitude
    }
  }

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
      <div>
        Location:{' '}
        <a
          className={classes.link}
          href={goto()}
        >
          Go to
        </a>
      </div>
    </Box>
  )
}

MapPopup.propTypes = {
  id: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired
}

export default MapPopup
