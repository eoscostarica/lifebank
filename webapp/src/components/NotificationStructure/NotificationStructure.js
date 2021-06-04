import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import Divider from '@material-ui/core/Divider'
import NewNotificationIcon from '@material-ui/icons/Brightness1';
import OldNotificationIcon from '@material-ui/icons/PanoramaFishEye';
import { useQuery, useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import { GET_ACCOUNT_NAME, EDIT_NOTIFICATION_STATE } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const NotificationStructure = ({ title, description, type, payload, state }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [name, setName] = useState()

  const { refetch: getData } = useQuery(GET_ACCOUNT_NAME, {
    variables: {
      account: description.substring(5, 17)
    },
    skip: true
  })

  const [
    editNotificationState,
    { error: errorEditResults, loading: editLoading, data: { edit_notification_state: editNotificationStateResult } = {} }
  ] = useMutation(EDIT_NOTIFICATION_STATE)

  useEffect(() => {
    const response = async () => {
      const { data } = await getData({ account: description.substring(5, 17) })
      setName(data.user[0].name)
    }

    response()

    console.log("DATA")

  }, [description])

  const changeNotificationState = () => {
    editNotificationState({
      variables: {
        id: 5
      }
    })
  }

  useEffect(() => {
    changeNotificationState()
    console.log("AQUII...", editNotificationStateResult)

  }, [editNotificationStateResult])
  return (
    <Box className={classes.wrapper}>
      <Grid container item xs={12}>
        <Grid item xs={2}>
          {/* {state === false && ( */}
            <NewNotificationIcon className={classes.iconOption} />
          {/* )} */}
          {state === true && (
            <OldNotificationIcon className={classes.iconOption} />
          )}
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.labelOption}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.labelOption}>
            {description.replace(description.substring(5, 17), name)}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

NotificationStructure.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  payload: PropTypes.object,
  state: PropTypes.bool,

}
export default NotificationStructure