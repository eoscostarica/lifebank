import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  }
}))

const ProfileCompletion = ({ fields, profile }) => {
  const classes = useStyles()
  const [user, setUser] = useState({
    benefit_description: profile.benefit_description,
    bussines_type: profile.bussines_type,
    covid_impact: profile.covid_impact,
    email: profile.email,
    geolocation: JSON.parse(profile.location),
    name: profile.name,
    schedule: profile.schedule,
    telephone: profile.telephone,
    website: profile.website
  })

  const handleOnAddStringifyValues = (field, value) => {
    setUser({ ...user, [field]: JSON.stringify(value) })
  }

  return (
    <form className={classes.form}>
      {fields.map((field, key) => (
        <div key={key}>{field}</div>
      ))}
    </form>
  )
}

ProfileCompletion.propTypes = {
  fields: PropTypes.array,
  profile: PropTypes.object,
  classes: PropTypes.object
}

ProfileCompletion.defaultProps = {}

export default ProfileCompletion
