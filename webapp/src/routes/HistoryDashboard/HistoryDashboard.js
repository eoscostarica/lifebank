import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useLazyQuery } from '@apollo/react-hooks'
import Typography from '@material-ui/core/Typography'
import { GET_REPORT_QUERY, PROFILE_QUERY } from '../../gql'
import MUIDataTable from 'mui-datatables'


import { useUser } from '../../context/user.context'
import styles from './styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(styles)


const HistoryDashboard = (user) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [bodyReceive, setBodyReceive] = useState()
  const [bodySent, setBodySent] = useState()
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
      // else if (currentUser && currentUser.role === 'sponsor') formatDataToSponsorReport()
      else return
    }

  }, [getReportResult])

  const formatDataToLifebankReport = () => {

    const sent = getReportResult.notifications.sent
    const received = getReportResult.notifications.received

    setBodyReceive(received)
    setBodySent(sent)

  }

  return (
    <>
      <Box>
        {bodySent && bodySent.length > 0 &&
          <MUIDataTable
            title={t('historyDashboard.tableTitleSent')}
            data={bodySent.map((notification) => [
              notification.send_to,
              notification.created_at_date,
              notification.created_at_time,
              notification.tokens
            ])}
            columns={[
              {
                name: t('historyDashboard.donor'),
                options: {
                  filter: true,
                }
              },
              {
                name: t('historyDashboard.date'),
                options: {
                  filter: true,
                }
              },
              {
                name: t('historyDashboard.time'),
                options: {
                  filter: true,
                }
              },
              {
                name: t('historyDashboard.tokens'),
                options: {
                  filter: true,
                }
              }
            ]}
            options={{
              print: false,
              selectableRowsHideCheckboxes: true,
              selectableRowsHeader: false,
              download: false,
            }}
          />
        }
        {bodyReceive && bodyReceive.length > 0 &&
          <MUIDataTable
            title={t('historyDashboard.tableTitleSent')}
            data={bodyReceive.map((notification) => [
              notification.send_to,
              notification.created_at_date,
              notification.created_at_time,
              notification.tokens
            ])}
            columns={[
              {
                name: t('historyDashboard.donor'),
                options: {
                  filter: true,
                }
              },
              {
                name: t('historyDashboard.date'),
                options: {
                  filter: true,
                }
              },
              {
                name: t('historyDashboard.time'),
                options: {
                  filter: true,
                }
              },
              {
                name: t('historyDashboard.tokens'),
                options: {
                  filter: true,
                }
              }
            ]}
            options={{
              print: false,
              selectableRowsHideCheckboxes: true,
              selectableRowsHeader: false,
              download: false,
            }}
          />
        }
      </Box>
    </>
  )
}

export default HistoryDashboard
