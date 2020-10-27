import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import useMediaQuery from '@material-ui/core/useMediaQuery';



const Video = ({ ...pros }) => {

  const matches = useMediaQuery('(max-width:600px)');

  const [height, setHeight] = useState("500px");

  useEffect(() => {
    setVideoHeight()
  },[matches])

  const setVideoHeight = () => {
    matches ? setHeight("300px") : setHeight("500px");
  }

  return (

      <iframe
        title={'unique' + Math.random()}
        width="100%"
        height={height}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...pros}
      />

  )
}

Video.propTypes = {
  src: PropTypes.string.isRequired
}

export default Video
