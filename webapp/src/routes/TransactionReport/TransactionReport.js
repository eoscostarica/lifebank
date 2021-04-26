import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
import { useTranslation } from 'react-i18next'

import { GET_REPORT_QUERY } from '../../gql'

const TransactionReport = () => {
  const { t } = useTranslation('translations')
  const properties = { header: 'Acme' }

  const headReceive = [
    [
      t('report.business'),
      t('report.date'),
      t('report.time'),
      t('report.tokens')
    ]
  ]
  const [bodyReceive, setBodyReceive] = useState()

  const headSent = [
    [
      t('report.donor'),
      t('report.date'),
      t('report.time'),
      t('report.tokens')
    ]
  ]
  const [bodySent, setBodySent] = useState()

  const [
    getReportQuery,
    { errorReport, data: { get_report: getReportResult } = {} }
  ] = useLazyQuery(GET_REPORT_QUERY, { fetchPolicy: 'network-only' })


  useEffect(() => {
    if(!getReportResult) {
      getReportQuery()
    } else {
      const receive = getReportResult.notifications.recieved.map(function(notification) {
        return [
          notification.business,
          notification.created_at_date,
          notification.created_at_time,
          notification.tokens
        ]
      })

      const sent = getReportResult.notifications.sent.map(function(notification) {
        return [
          notification.send_to,
          notification.created_at_date,
          notification.created_at_time,
          notification.tokens
        ]
      })

      setBodyReceive(receive)
      setBodySent(sent)
    }
    console.log('GET-REPORT-RESULT', getReportResult)
  }, [getReportResult])

  useEffect(() => {
    console.log('GET-REPORT-ERROR', errorReport)
  }, [errorReport])

  return (
    <>
      <PDF
        filename="Report"
        properties={properties}
        preview={true}
        previewWidth="100%"
      >
        <Text x={35} y={25} size={40}>{t('report.receivedTokens')}</Text>
        <Table
          head={headReceive}
          body={bodyReceive}
        />

        <AddPage />

        <Text x={35} y={25} size={40}>{t('report.sentTokens')}</Text>
        <Table
          head={headSent}
          body={bodySent}
        />
      </PDF>
    </>
  )
}

export default TransactionReport