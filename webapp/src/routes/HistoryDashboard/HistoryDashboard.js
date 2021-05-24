import React, { useEffect, useCallback, useState, lazy, Suspense } from 'react'

import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { GET_REPORT_QUERY, PROFILE_QUERY } from '../../gql'


import { useUser } from '../../context/user.context'
import styles from './styles'

const useStyles = makeStyles(styles)


const HistoryDashboard = (user) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [bodyReceive, setBodyReceive] = useState()
  const [currentUser] = useUser()

  const [
    loadProfile,
    { error: errroLoadProfile, data: { profile: { profile } = {} } = {}, client }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const [
    getReportQuery,
    { errorReport, data: { get_report: getReportResult } = {} }
  ] = useLazyQuery(GET_REPORT_QUERY, { fetchPolicy: 'network-only' })


  useEffect(() => {

    if (!getReportResult) {
      getReportQuery()
    } else {
      if (currentUser && currentUser.role === 'lifebank') formatDataToLifebankReport()
      //else if (currentUser && currentUser.role === 'sponsor') formatDataToSponsorReport()
      else return
    }

  }, [getReportResult])


  const formatDataToLifebankReport = () => {
    const received = getReportResult
    console.log(getReportResult.notifications.sent)
    console.log("PRUEBAA")
    setBodyReceive(received)
  }



  return (
    <>


    </>
  )
}



export default HistoryDashboard
