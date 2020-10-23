import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'

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

function MapPopup({ id, info, account }) {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box key={id}>
      <div className={classes.title}>{info.name}</div>
      <div>
        {t('common.account')}:
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
        {t('common.telephone')}:
        <a
          href={`tel:${info.telephone || info.phone_number}`}
          className={classes.link}
        >
          {info.telephone || info.phone_number}
        </a>
      </div>
      {info.business_type && (
        <div>
          {t('offersManagement.business_type')}: {info.business_type}
        </div>
      )}
      {info.benefit_description && (
        <div>
          {t('common.benefits')}: {info.benefit_description}
        </div>
      )}
      {info.description && (
        <div>
          {t('common.description')}: {info.description}
        </div>
      )}
      {info.description && (
        <div>
          {t('common.bloodUrgency')}: {URGENCY[info.blood_urgency_level]}
        </div>
      )}
      {info.website && (
        <div>
          {t('common.website')}:
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
        {t('common.schedule')}:
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
