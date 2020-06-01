import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'
import { useQuery } from '@apollo/react-hooks'

import { mapboxConfig } from '../../config'
import MapMarker from '../MapMarker'
import MapPopup from '../MapPopup'
import { GET_NEARBY_LOCATIONS_QUERY } from '../../gql'

const initialZoom = 12.5
const distance = 5000

function MapShowLocations({ location, ...props }) {
  const mapContainerRef = useRef(null)
  // useLazyQuery execution function should return a promise
  // https://github.com/apollographql/react-apollo/issues/3499
  // temporary fix here
  // https://github.com/apollographql/react-apollo/issues/3499#issuecomment-586039082
  const { refetch: getNearbyLocations } = useQuery(GET_NEARBY_LOCATIONS_QUERY, {
    variables: {
      distance,
      point: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      }
    },
    skip: true
  })

  const handleEvent = async (map) => {
    const { lng, lat } = map.getCenter()

    const { data } = await getNearbyLocations({
      distance,
      point: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    })

    data &&
      data.locations &&
      data.locations.forEach((location) => {
        const {
          id,
          account,
          type,
          geolocation: { coordinates },
          info
        } = location

        const markerNode = document.createElement('div')
        ReactDOM.render(<MapMarker type={type} />, markerNode)

        const popupNode = document.createElement('div')
        ReactDOM.render(
          <MapPopup id={id} info={info} account={account} />,
          popupNode
        )

        new mapboxgl.Marker(markerNode)
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 15 }).setDOMContent(popupNode))
          .addTo(map)
      })
  }

  useEffect(() => {
    mapboxgl.accessToken = mapboxConfig.accessToken

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [location.longitude, location.latitude],
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

    map.on('moveend', () => handleEvent(map))

    map.on('load', () => handleEvent(map))

    return () => map.remove()
  }, [getNearbyLocations, location.longitude, location.latitude])

  return <Box ref={mapContainerRef} {...props} />
}

MapShowLocations.propTypes = {
  location: PropTypes.object,
  props: PropTypes.object
}

MapShowLocations.defaultProps = {
  location: { longitude: -74.0030977, latitude: 40.7378021 }
}

export default MapShowLocations
