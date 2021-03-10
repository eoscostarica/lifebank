import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { JSONLD, Generic } from 'react-structured-data'
import { Typography } from '@material-ui/core';

const NotificationStructure = ({ title, description }) => {

  return (
    <>
      <Box  >
        <Typography>
          {title}
        </Typography>
        <Typography >
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
        <Typography >
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
      </Box>

    </>
  )
}


NotificationStructure.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string

}

export default NotificationStructure
