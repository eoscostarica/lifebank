import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import { mapboxConfig } from '../../config'
import MapMarker from '../MapMarker'

const initialGeoLocation = { lng: -84.1132, lat: 9.9363 }
const initialZoom = 12.5

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  sidebarStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: theme.spacing(2),
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    zIndex: 1,
    padding: theme.spacing(2)
  }
}))

function MapSelectLocation({ onLocationChange = () => {} }) {
  const classes = useStyles()
  const [currentLocation, setCurrentLocation] = useState(null)
  const mapContainerRef = useRef(null)
  const currentMarker = useRef(null)

  useEffect(() => {
    if (!currentLocation) {
      return
    }

    onLocationChange(currentLocation)
  }, [onLocationChange, currentLocation])

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

      setCurrentLocation({ lng, lat })
    })

    return () => map.remove()
  }, [])

  // TODO: change styles: currently is a full screen map.
  return <Box ref={mapContainerRef} className={classes.mapContainer} />
}

MapSelectLocation.propTypes = {
  onLocationChange: PropTypes.func
}

export default MapSelectLocation
