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
  telephone
}) => {
  return (
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
      />
    </JSONLD>
  )
}

LocalBusinessStructuredData.propTypes = {
  name: PropTypes.string,
  openingHours: PropTypes.string,
  address: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  telephone: PropTypes.telephone
}

export default LocalBusinessStructuredData
