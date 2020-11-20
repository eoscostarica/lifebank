import React from 'react'
import PropTypes from 'prop-types'
import { getOpeningHours } from '../../utils/getOpeningHours'
import { JSONLD, Generic } from 'react-structured-data'

const MedicalClinicStructuredData = ({
  name,
  openingHours,
  address,
  logo,
  email,
  description,
  location,
  telephone
}) => (
    <JSONLD>
      <Generic
        type="medicalClinic"
        jsonldtype="MedicalClinic"
        schema={{
          name: name,
          openingHours: getOpeningHours(openingHours),
          addres: address,
          logo: logo.length === 0 ? 'https://raw.githubusercontent.com/eoscostarica/lifebank/6ec27b8c7832ba6ccb4adebfe1ba8d1d94eb0544/docs/logos/2-OverWhite-lifebank-logo-v1-may25-2020-01.svg': logo,
          email: email,
          description: description,
          location: location,
          telephone: JSON.parse(telephone)[0]
        }}
      >
        <Generic
          type="geoCoordinates"
          jsonldtype="GeoCoordinates"
          schema={{
            latitude: JSON.parse(location).latitude,
            longitude: JSON.parse(location).longitude
          }}
        />
      </Generic>
    </JSONLD>
  )

MedicalClinicStructuredData.propTypes = {
  name: PropTypes.string,
  openingHours: PropTypes.string,
  address: PropTypes.string,
  logo: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  telephone: PropTypes.string,
}

export default MedicalClinicStructuredData
