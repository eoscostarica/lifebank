import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import { mapboxConfig } from '../../config'
import fetchFakeData from './fetchFakeData'
import MapMarker from '../MapMarker'
import MapPopup from '../MapPopup'

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

function MapShowLocations() {
  const classes = useStyles()
  const mapContainerRef = useRef(null)

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

    map.on('moveend', async () => {
      const { lng, lat } = map.getCenter()

      // TODO: Change fake request to a real Hasura query.
      // see: https://hasura.io/blog/building-a-realtime-geolocation-app-with-hasura-graphql-and-postgis/
      const data = await fetchFakeData({
        longitude: lng,
        latitude: lat,
        bound: 1000
      })

      data.locations.forEach((location) => {
        const { id, name, type, longitude, latitude } = location

        const markerNode = document.createElement('div')
        ReactDOM.render(<MapMarker type={type} />, markerNode)

        const popupNode = document.createElement('div')
        ReactDOM.render(<MapPopup id={id} name={name} />, popupNode)

        new mapboxgl.Marker(markerNode)
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup({ offset: 15 }).setDOMContent(popupNode))
          .addTo(map)
      })
    })

    return () => map.remove()
  }, [])

  // TODO: change styles: currently is a full screen map.
  return <Box ref={mapContainerRef} className={classes.mapContainer} />
}

export default MapShowLocations
