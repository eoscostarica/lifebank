import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'

import { mapboxConfig, constants } from '../../config'
import MapMarker from '../MapMarker'

const initialGeoLocation = { lng: -74.0030977, lat: 40.7378021 }
const initialZoom = 12.5
const {
  LOCATION_TYPES: { SPONSOR, LIFE_BANK }
} = constants

function MapSelectLocation({
  onGeolocationChange = () => {},
  markerType,
  ...props
}) {
  const mapContainerRef = useRef(null)
  const currentMarker = useRef(null)

  useEffect(() => {
    mapboxgl.accessToken = mapboxConfig.accessToken

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialGeoLocation.lng, initialGeoLocation.lat],
      zoom: initialZoom
    })

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

      const markerNode = document.createElement('div')
      ReactDOM.render(<MapMarker type={markerType} />, markerNode)

      const market = new mapboxgl.Marker(markerNode)
      market.setLngLat([lng, lat]).addTo(map)
      currentMarker.current = market

      onGeolocationChange({ longitude: lng, latitude: lat })
    })

    return () => map.remove()
  }, [onGeolocationChange, markerType])

  return <Box ref={mapContainerRef} {...props} />
}

MapSelectLocation.propTypes = {
  onGeolocationChange: PropTypes.func,
  markerType: PropTypes.oneOf([SPONSOR, LIFE_BANK]),
  props: PropTypes.object
}

export default MapSelectLocation
