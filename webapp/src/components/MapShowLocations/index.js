import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'
import { useQuery } from '@apollo/react-hooks'

import { mapboxConfig } from '../../config'
import MapMarker from '../MapMarker'
import MapPopup from '../MapPopup'
import { GET_NEARBY_LOCATIONS_QUERY } from '../../gql'

const initialGeoLocation = { lng: -84.1132, lat: 9.9363 }
const initialZoom = 12.5
const distance = 5000

function MapShowLocations({ ...props }) {
  // useLazyQuery execution function should return a promise
  // https://github.com/apollographql/react-apollo/issues/3499
  // temporary fix here
  // https://github.com/apollographql/react-apollo/issues/3499#issuecomment-586039082
  const { refetch: getNearbyLocations } = useQuery(GET_NEARBY_LOCATIONS_QUERY, {
    variables: {
      distance,
      point: {
        type: 'Point',
        coordinates: [initialGeoLocation.lng, initialGeoLocation.lat]
      }
    },
    skip: true
  })
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

      const { data } = await getNearbyLocations({
        distance,
        point: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      })

      data.locations.forEach((location) => {
        const {
          id,
          name,
          type,
          geolocation: { coordinates }
        } = location

        const markerNode = document.createElement('div')
        ReactDOM.render(<MapMarker type={type} />, markerNode)

        const popupNode = document.createElement('div')
        ReactDOM.render(<MapPopup id={id} name={name} />, popupNode)

        new mapboxgl.Marker(markerNode)
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 15 }).setDOMContent(popupNode))
          .addTo(map)
      })
    })

    return () => map.remove()
  }, [getNearbyLocations])

  return <Box ref={mapContainerRef} {...props} />
}

MapShowLocations.propTypes = {
  props: PropTypes.object
}

export default MapShowLocations
