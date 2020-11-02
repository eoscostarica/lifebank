import React from 'react'
import PropTypes from 'prop-types'
import { getOpeningHours } from '../../utils/getOpeningHours'
import { JSONLD, Generic } from 'react-structured-data'

const LocalBusinessStructuredData = ({
  name,
  openingHours,
  address,
  logo,
  email,
  location,
  telephone,
  socialMediaLinks
}) => (
  <JSONLD>
    <Generic
      type="localBusiness"
      jsonldtype="LocalBusiness"
      schema={{
        name: name,
        openingHours: getOpeningHours(openingHours),
        addres: address,
        logo: logo,
        email: email,
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
      {JSON.parse(socialMediaLinks).map((el, key) => (
        <Generic
          key={key}
          type="sameAs"
          jsonldtype="sameAs"
          schema={{
            url: el
          }}
        />
      ))}
    </Generic>
  </JSONLD>
)

LocalBusinessStructuredData.propTypes = {
  name: PropTypes.string,
  openingHours: PropTypes.string,
  address: PropTypes.string,
  logo: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  telephone: PropTypes.string,
  socialMediaLinks: PropTypes.string
}

export default LocalBusinessStructuredData
