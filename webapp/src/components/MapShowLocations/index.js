import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import Box from '@material-ui/core/Box'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useTranslation } from 'react-i18next'

import { mapboxConfig, constants } from '../../config'
import MapMarker from '../MapMarker'
import MapPopup from '../MapPopup'
import { GET_NEARBY_LOCATIONS_QUERY } from '../../gql'

const initialZoom = 12.5
let map = null
let checkLifebank = true
let checkSponsor = true
let markerList = []
let searchDistance = 5000
let filterSponsorcategory = 'All'

const useStyles = makeStyles((theme) => ({
  mapOverlay: {
    position: 'absolute',
    top: 110,
    '@media only screen and (max-width: 900px)': {
      top: 120
    },
    right: 10,
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
  },
  mapOverlayinner: {
    backgroundColor: '#fff',
    borderRadius: '3px',
    padding: '5px'
  },
  icon: {
    fontSize: 18
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#FFF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15
  },
  checkBoxForm: {
    marginBottom: 10
  },
  buttonStyle: {
    width: '100%',
    marginBottom: 15
  }
}))

const customData = {
  features: [],
  type: 'FeatureCollection'
}

const { SPONSOR_TYPES } = constants

const sponsorsCategories = ['All'].concat(SPONSOR_TYPES)

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
}

function MapShowLocations({ location, ...props }) {
  const { t } = useTranslation('translations')
  const [distance, setDistance] = React.useState(5000)
  const [state, setState] = React.useState({
    checkedLifebank: true,
    checkedSponsor: true
  })
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const [sponsorsCat, setSponsorsCat] = React.useState('All')

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })

    switch (event.target.name) {
      case 'checkedLifebank': {
        checkLifebank = !checkLifebank
        break
      }
      default: {
        checkSponsor = !checkSponsor
        break
      }
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    loadMarkersEvent()
  }

  const handleSaveChanges = () => {
    setOpen(false)
    loadMarkersEvent()
  }

  const handleChangeDistance = (event) => {
    setDistance(event.target.value)
    searchDistance = parseInt(event.target.value)
  }

  const handleChangeSponsorsCat = (event) => {
    setSponsorsCat(event.target.value)
    filterSponsorcategory = event.target.value
  }

  const mapContainerRef = useRef(null)

  const { refetch: getNearbyLocations } = useQuery(GET_NEARBY_LOCATIONS_QUERY, {
    variables: {
      distance: searchDistance,
      point: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      }
    },
    skip: true
  })

  const loadPointData = (name, type, coordinates) => {
    customData.features.push({
      type: 'Feature',
      properties: {
        title: name,
        type: type
      },
      geometry: {
        coordinates: [coordinates[0], coordinates[1]],
        type: 'Point'
      }
    })
  }

  const claerPointsData = () => {
    customData.features = []
    markerList = []
  }

  const removeMarkers = () => {
    for (let i = 0; i <= markerList.length - 1; i++) {
      markerList[i].remove()
    }
  }

  const loadMarkersEvent = async () => {
    removeMarkers()
    claerPointsData()

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

        loadPointData(info.name, type, coordinates)

        const markerNode = document.createElement('div')

        ReactDOM.render(<MapMarker type={type} />, markerNode)

        const popupNode = document.createElement('div')

        ReactDOM.render(
          <MapPopup id={id} info={info} account={account} />,
          popupNode
        )

        const markertemp = new mapboxgl.Marker(markerNode)
        markertemp.setLngLat(coordinates)
        markertemp.setPopup(
          new mapboxgl.Popup({ offset: 15 }).setDOMContent(popupNode)
        )

        if (type === 'SPONSOR') {
          if (checkSponsor) {
            if (filterSponsorcategory === 'All') {
              markertemp.addTo(map)
              markerList.push(markertemp)
            } else {
              if (info.business_type === filterSponsorcategory) {
                markertemp.addTo(map)
                markerList.push(markertemp)
              }
            }
          }
        } else {
          if (checkLifebank) {
            markertemp.addTo(map)
            markerList.push(markertemp)
          }
        }
      })
  }

  const centerUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.flyTo({
          center: [position.coords.longitude, position.coords.latitude]
        })
      })
    }
  }

  const forwardGeocoder = (query) => {
    const matchingFeatures = []

    for (let i = 0; i < customData.features.length; i++) {
      const feature = customData.features[i]

      if (
        feature.properties.title.toLowerCase().search(query.toLowerCase()) !==
        -1
      ) {
        if (feature.properties.type === 'LIFE_BANK') {
          feature.place_name = '🩸 ' + feature.properties.title
        } else {
          feature.place_name = '🏬 ' + feature.properties.title
        }

        feature.center = feature.geometry.coordinates
        feature.place_type = [feature.properties.type]
        matchingFeatures.push(feature)
      }
    }
    return matchingFeatures
  }

  useEffect(() => {
    mapboxgl.accessToken = mapboxConfig.accessToken

    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [location.longitude, location.latitude],
      zoom: initialZoom
    })

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: forwardGeocoder,
        zoom: 16,
        placeholder: t('map.mapInputPlaceholder'),
        mapboxgl: mapboxgl,
        marker: null
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

    map.on('moveend', () => loadMarkersEvent())

    map.on('load', () => loadMarkersEvent())

    map.on('load', () => centerUserLocation())

    return () => map.remove()
  }, [getNearbyLocations, location.longitude, location.latitude])

  const classes = useStyles()

  const FilterModalComp = () => {
    return (
      <div className={classes.mapOverlay}>
        <IconButton className={classes.mapOverlayinner} onClick={handleOpen}>
          <MenuIcon fontSize="inherit" className={classes.icon} />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={0}
            >
              <Grid item xs={12}>
                <h1 color="textSecondary" className={classes.accordionTittle}>
                  {t('contentToolbar.filters')}
                </h1>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label={t('map.distance')}
                  value={distance}
                  onChange={handleChangeDistance}
                  name="distance"
                  variant="outlined"
                  type="number"
                  className={classes.inputStyle}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">m</InputAdornment>
                    )
                  }}
                />
                <Grid item xs={12}>
                  <FormControlLabel
                    className={classes.checkBoxForm}
                    control={
                      <Checkbox
                        checked={state.checkedLifebank}
                        onChange={handleChange}
                        name="checkedLifebank"
                      />
                    }
                    label={t('rolesTitle.plural.lifebanks')}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.inputStyle} />
              <Grid item xs={12}>
                <FormControlLabel
                  className={classes.checkBoxForm}
                  control={
                    <Checkbox
                      checked={state.checkedSponsor}
                      onChange={handleChange}
                      name="checkedSponsor"
                    />
                  }
                  label={t('rolesTitle.plural.sponsors')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-select-currency"
                  select
                  label={t('map.sponsorCategories')}
                  value={sponsorsCat}
                  onChange={handleChangeSponsorsCat}
                  className={classes.inputStyle}
                  variant="outlined"
                >
                  {sponsorsCategories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonStyle}
                  onClick={handleSaveChanges}
                >
                  {t('common.saveChanges')}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <Box>
      <Box ref={mapContainerRef} {...props}>
        <FilterModalComp />
      </Box>
    </Box>
  )
}

MapShowLocations.propTypes = {
  location: PropTypes.object,
  props: PropTypes.object
}

MapShowLocations.defaultProps = {
  location: { longitude: -84.0556371, latitude: 9.9195872 }
}

export default MapShowLocations
