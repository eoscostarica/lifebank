import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../context/user.context'
import { GET_REPORT_QUERY, PROFILE_QUERY } from '../../gql'

const TransactionReport = ({saveReport, onReportSaved}) => {
  const { t } = useTranslation('translations')
  const [currentUser] = useUser()
  const [headReceive, setHeadReceived] = useState()
  const [bodyReceive, setBodyReceive] = useState()
  const [bodySent, setBodySent] = useState()
  
  const [
    loadProfile,
    { error: errroLoadProfile, data: { profile: { profile } = {} } = {}, client }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const headSent = [
    [
      t('report.donor'),
      t('report.date'),
      t('report.time'),
      t('report.tokens')
    ]
  ]

  const [
    getReportQuery,
    { errorReport, data: { get_report: getReportResult } = {} }
  ] = useLazyQuery(GET_REPORT_QUERY, { fetchPolicy: 'network-only' })

  useEffect(() => {
    if(!profile) loadProfile()
  }, [profile])

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
        notification.offer ? notification.offer.cost_in_tokens : '']
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
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()


    if(currentUser && currentUser.role === 'lifebank') {
      doc.autoTable({
        margin: { top: 30, bottom: 30 },
        pageBreak: 'auto',
        head: headReceive,
        body: bodyReceive
      })

      doc.autoTable({
        margin: { top: 30, bottom: 30 },
        pageBreak: 'auto',
        head: headSent,
        body: bodySent,
      })
    } else if (currentUser && currentUser.role === 'sponsor') {
      doc.autoTable({
        margin: { top: 30, bottom: 30 },
        pageBreak: 'auto',
        head: headReceive,
        body: bodyReceive,
      })
    }

    for(let i = 1; i < doc.internal.pages.length; i++) {
      doc.setPage(i)
      doc.setFontSize(14)
      doc.text(profile? profile.name : '', pageWidth/2, 10, { align: 'center' })
      doc.text(new Date().toISOString().slice(0, 10), pageWidth/2, 16, { align: 'center' })
      doc.text(t('report.pdfHeader'), pageWidth/2, 22, { align: 'center' })
      doc.text(t('report.pdfFooter'), pageWidth/2, pageHeight - 20, { align: 'center', maxWidth: pageWidth - 50 })
    }

    doc.save(t('report.reportDownloadName'))
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