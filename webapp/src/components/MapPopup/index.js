import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  popup: {}
}))

// TODO: Improve styles and add a Link using the id to navigate to the detail screen of the SPONSOR | LIFE_BANK.
function MapPopup({ id, name }) {
  const classes = useStyles()

  return (
    <Box key={id} className={classes.popup}>
      <Typography variant="h6">{name}</Typography>
    </Box>
  )
}

MapPopup.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default MapPopup
