import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { eosConfig } from '../../config'

const URGENCY = {
  1: 'Low',
  2: 'Medium',
  3: 'High'
}

const useStyles = makeStyles(() => ({
  popup: {},
  ul: {
    margin: 0
  },
  title: {
    fontWeight: 'bold'
  },
  link: {
    textDecoration: 'none'
  }
}))

// TODO: Improve styles and add a Link using the id to navigate to the detail screen of the SPONSOR | LIFE_BANK.
function MapPopup({ id, info, account }) {
  const classes = useStyles()

  return (
    <Box key={id}>
      <div className={classes.title}>{info.name}</div>
      <div>
        Account:{' '}
        <a
          href={`${eosConfig.BLOCK_EXPLORER_URL}account/${account}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          {account}
        </a>
      </div>
      <div>
        Phone:{' '}
        <a
          href={`tel:${info.telephone || info.phone_number}`}
          className={classes.link}
        >
          {info.telephone || info.phone_number}
        </a>
      </div>
      {info.bussines_type && <div>Business type: {info.bussines_type}</div>}
      {info.benefit_description && (
        <div>Benefits: {info.benefit_description}</div>
      )}
      {info.description && <div>Description: {info.description}</div>}
      {info.description && (
        <div>Blood urgency: {URGENCY[info.blood_urgency_level]}</div>
      )}
      {info.website && (
        <div>
          Website:{' '}
          <a
            href={info.website}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            {info.website}
          </a>
        </div>
      )}
      <div>
        Schedule:
        <ul className={classes.ul}>
          {JSON.parse((info.schedule || '[]').replace(/\\/g, '')).map(
            (item, i) => (
              <li key={`${i}-${item.day}`}>
                {item.day}: {item.open} - {item.close}
              </li>
            )
          )}
        </ul>
      </div>
    </Box>
  )
}

MapPopup.propTypes = {
  id: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired
}

export default MapPopup
