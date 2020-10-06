import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Box from '@material-ui/core/Box'
import { useQuery } from '@apollo/react-hooks'

import { mapboxConfig } from '../../config'
import MapMarker from '../MapMarker'
import MapPopup from '../MapPopup'
import { GET_NEARBY_LOCATIONS_QUERY } from '../../gql'

const initialZoom = 12.5
let map = null
const searchDistance = 5000

function MapShowOneLocation({ markerLocation, accountProp, ...props }) {
  const mapContainerRef = useRef(null)
  const { refetch: getNearbyLocations } = useQuery(GET_NEARBY_LOCATIONS_QUERY, {
    variables: {
      distance: searchDistance,
      point: {
        type: 'Point',
        coordinates: [markerLocation.longitude, markerLocation.latitude]
      }
    },
    skip: true
  })

  const loadMarkersEvent = async () => {
    const { lng, lat } = map.getCenter()
    const { data } = await getNearbyLocations({
      distance: searchDistance,
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
        if (accountProp === account) {
          const markertemp = new mapboxgl.Marker(markerNode)
          markertemp.setLngLat(coordinates)
          markertemp.setPopup(
            new mapboxgl.Popup({ offset: 15 }).setDOMContent(popupNode)
          )
          markertemp.addTo(map)
        }
      })
  }

  useEffect(() => {
    mapboxgl.accessToken = mapboxConfig.accessToken

    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [markerLocation.longitude, markerLocation.latitude],
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

    map.on('load', () => loadMarkersEvent())

    return () => map.remove()
  }, [getNearbyLocations, markerLocation.longitude, markerLocation.latitude])

  return <Box ref={mapContainerRef} {...props} />
}

MapShowOneLocation.propTypes = {
  markerLocation: PropTypes.object,
  props: PropTypes.object,
  accountProp: PropTypes.string
}

MapShowOneLocation.defaultProps = {
  markerLocation: { longitude: -84.0556371, latitude: 9.9195872 }
}

export default MapShowOneLocation
