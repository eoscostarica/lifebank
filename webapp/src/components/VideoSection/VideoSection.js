import React from 'react'
import PropTypes from 'prop-types'

const Video = ({ ...pros }) => (
  <iframe
    title={'unique' + Math.random()}
    width="100%"
    height="400px"
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    {...pros}
  />
)

Video.propTypes = {
  src: PropTypes.string.isRequired
}

export default Video
