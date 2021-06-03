import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useLazyQuery } from '@apollo/react-hooks'
import MUIDataTable from 'mui-datatables'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'

import { GET_REPORT_QUERY, PROFILE_QUERY } from '../../gql'

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
  const [optionSR, setOption] = useState('sent')

  const options = [
    { value: 'sent', label: t('historyDashboard.tableTitleSent') },
    { value: 'received', label: t('historyDashboard.tableTitleReceived') }
  ]

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

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <>
      <Box className={classes.root} >
        <Typography className={classes.title} >{t('historyDashboard.title')}</Typography>
        <Box className={classes.boxSelect}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{t('historyDashboard.dashboard')}</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={optionSR}
              onChange={handleChange}
              label="optionSR"
            >
              {options.map((option) => {
                return (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.root}>
          {optionSR === 'sent' && (
            <Box>
              {bodySent && bodySent.length > 0 &&
                <Box className={classes.tableContent} >
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
                </Box>
              }
            </Box>)}
          {optionSR === 'received' && (
            <Box>
              {bodyReceive && bodyReceive.length > 0 &&
                <Box className={classes.tableContent} >
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
                </Box>
              }
            </Box>)}
        </Box>
      </Box>
    </>
  )
}

export default HistoryDashboard
