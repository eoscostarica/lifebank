import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/user.context'
import { GET_REPORT_QUERY } from '../../gql'

const TransactionReport = ({saveReport, onReportSaved}) => {
  const { t } = useTranslation('translations')
  const [currentUser] = useUser()
  const doc = new jsPDF()

  const [headReceive, setHeadReceived] = useState()
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
      if(currentUser && currentUser.role === 'lifebank') formatDataToLifebankReport()
      else if(currentUser && currentUser.role === 'sponsor') formatDataToSponsorReport()
    }
  }, [getReportResult])

  const formatDataToLifebankReport = () => {
    const received = getReportResult.notifications.received.map(function(notification) {
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

    setHeadReceived([
        [
          t('report.business'),
          t('report.date'),
          t('report.time'),
          t('report.tokens')
        ]
      ]
    )
    setBodyReceive(received)
    setBodySent(sent)
  }

  const formatDataToSponsorReport = () => {
    const received = getReportResult.notifications.received.map(function(notification) {
      return [
        notification.payerUser,
        notification.offer ? notification.offer.offer_name : '',
        notification.created_at_date,
        notification.created_at_time,
        notification.offer ? notification.offer.cost_in_tokens : ''      ]
    })

    setHeadReceived([
      [
        t('report.user'),
        t('report.offer'),
        t('report.date'),
        t('report.time'),
        t('report.tokens')
      ]
    ]
  )

    setBodyReceive(received)
  }

  useEffect(() => {
    if(saveReport) downloadReport()
  }, [saveReport])

  const downloadReport = () => {
    if(currentUser && currentUser.role === 'lifebank') {
      doc.autoTable({
        head: headReceive,
        body: bodyReceive,
      })

      doc.autoTable({
        head: headSent,
        body: bodySent,
      })
    } else if (currentUser && currentUser.role === 'sponsor') {
      doc.autoTable({
        head: headReceive,
        body: bodyReceive,
      })
    }

    doc.save('report.pdf')
    onReportSaved()
  }

  return (
    <>
    </>
  )
}

TransactionReport.propTypes = {
  saveReport: PropTypes.bool,
  onReportSaved: PropTypes.func
}

TransactionReport.defaultProps = {
  saveReport: false
}

export default TransactionReport