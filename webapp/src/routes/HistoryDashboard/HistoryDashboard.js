import React, { useEffect, useCallback, useState, lazy, Suspense } from 'react'
import TransactionReport from '../components/TransactionReport'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'


import {
  PROFILE_QUERY,
  GRANT_CONSENT_MUTATION,
  REVOKE_CONSENT_MUTATION,
  EDIT_PROFILE_MUTATION,
  SET_USERNAME
} from '../../gql'
import { useUser } from '../../context/user.context'
import styles from './styles'

const useStyles = makeStyles(styles)


const HistoryDashboard = (user) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()


  return (
    <>
      {user && (user.role === 'lifebank' || user.role === 'sponsor') &&
        <TransactionReport report />

      }

    </>
  )
}


HistoryDashboard.propTypes = {
  user: PropTypes.object
}

export default HistoryDashboard
