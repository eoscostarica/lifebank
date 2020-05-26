import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'

import { mapboxConfig } from '../../config'
import MapMarker from '../MapMarker'

const initialGeoLocation = { lng: -84.1132, lat: 9.9363 }
const initialZoom = 12.5

function MapSelectLocation({ onLocationChange = () => {} }) {
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
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    )

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    )

    map.on('click', ({ lngLat }) => {
      const { lng, lat } = lngLat

      if (currentMarker && currentMarker.current) {
        currentMarker.current.remove()
      }

      const markerNode = document.createElement('div')
      ReactDOM.render(<MapMarker />, markerNode)

      const market = new mapboxgl.Marker(markerNode)
      market.setLngLat([lng, lat]).addTo(map)
      currentMarker.current = market

      onLocationChange({ lng, lat })
    })

    return () => map.remove()
  }, [onLocationChange])

  return <Box ref={mapContainerRef} width="100%" height="100%" />
}

MapSelectLocation.propTypes = {
  onLocationChange: PropTypes.func
}

export default MapSelectLocation
