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
          logo: logo,
          email: email,
          description: description,
          location: location,
          telephone: telephone
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
