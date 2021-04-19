import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'

import { mapboxConfig, constants } from '../../config'
import MapMarker from '../MapMarker'

const CR_SJ_POINT = { longitude: -84.0556371, latitude: 9.9195872 }
const initialZoom = 12.5
const {
  LOCATION_TYPES: { SPONSOR, PENDING_SPONSOR, LIFE_BANK }
} = constants

function MapEditLocation({
  onGeolocationChange = () => {},
  markerLocation,
  markerType,
  ...props
}) {
  const mapContainerRef = useRef(null)
  const currentMarker = useRef(null)

  if(!markerLocation) markerLocation = CR_SJ_POINT

  let markerNode = null
  let marker = null

  useEffect(() => {
    mapboxgl.accessToken = mapboxConfig.accessToken

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [markerLocation.longitude, markerLocation.latitude],
      zoom: initialZoom
    })

    markerNode = document.createElement('div')
    ReactDOM.render(<MapMarker type={markerType} />, markerNode)

    marker = new mapboxgl.Marker(markerNode)
    
    if(markerLocation !== CR_SJ_POINT) {
      marker
        .setLngLat([markerLocation.longitude, markerLocation.latitude])
        .addTo(map)
      currentMarker.current = marker
    }

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    )

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    )

    map.on('click', ({ lngLat }) => {
      const { lng, lat } = lngLat

      if (currentMarker && currentMarker.current) {
        currentMarker.current.remove()
      }

      markerNode = document.createElement('div')
      ReactDOM.render(<MapMarker type={markerType} />, markerNode)

      marker = new mapboxgl.Marker(markerNode)
      marker.setLngLat([lng, lat]).addTo(map)
      currentMarker.current = marker

      onGeolocationChange({ longitude: lng, latitude: lat })
    })

    return () => map.remove()
  }, [])

  return <Box ref={mapContainerRef} {...props} />
}

MapEditLocation.propTypes = {
  onGeolocationChange: PropTypes.func,
  markerLocation: PropTypes.object,
  markerType: PropTypes.oneOf([SPONSOR, PENDING_SPONSOR, LIFE_BANK]),
  props: PropTypes.object
}

MapEditLocation.defaultProps = {
  markerLocation: { longitude: -84.0556371, latitude: 9.9195872 }
}

export default MapEditLocation
