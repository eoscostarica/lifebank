import { constants } from '../../config'

const {
  LOCATION_TYPES: { SPONSOR, LIFE_BANK }
} = constants

const getRandomCoordinate = ({ longitude, latitude }) => {
  const r = 0.025 * Math.sqrt(Math.random())
  const theta = Math.random() * 2 * Math.PI

  return {
    longitude: longitude + r * Math.sin(theta),
    latitude: latitude + r * Math.cos(theta)
  }
}

const fetchFakeData = (cordinates) => {
  const locations = []

  for (let i = 0; i < 20; i++) {
    const id = i
    const { longitude, latitude } = getRandomCoordinate(cordinates)
    const type = id % 2 === 0 ? SPONSOR : LIFE_BANK

    locations.push({
      id,
      name: `${type} #${id}`,
      type,
      longitude,
      latitude
    })
  }

  return Promise.resolve({
    locations
  })
}

export default fetchFakeData
