import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import NewNotificationIcon from '@material-ui/icons/Brightness1';
import OldNotificationIcon from '@material-ui/icons/PanoramaFishEye';
import { useQuery, useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import { GET_ACCOUNT_NAME, EDIT_NOTIFICATION_STATE } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const NotificationStructure = ({ id, title, description, state, dateAndTime }) => {
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
    { error: errorEditResults, loading: editLoading, data: { update_notification: editNotificationStateResult } = {} }
  ] = useMutation(EDIT_NOTIFICATION_STATE)

  useEffect(() => {
    const response = async () => {
      const { data } = await getData({ account: description.substring(5, 17) })
      setName(data.user[0].name)
    }
    response()
  }, [description])

  const changeNotificationState = () => {
    editNotificationState({
      variables: {
        id: id
      }
    })
  }

  return (
    <>
      <Button className={classes.wrapper} onMouseOver={changeNotificationState}>
        <Grid container>
          <Grid item xs={12}>
            {state === true && (
              <NewNotificationIcon className={classes.iconOption} />
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography className={classes.labelOption}>
              {description.replace(description.substring(5, 17), name)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.labelOption}>
              {dateAndTime.substring(11, 19)}
              <br ></br>
              {dateAndTime.substring(5, 10) + "-" + dateAndTime.substring(0, 4)}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </>
  )
}

NotificationStructure.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  state: PropTypes.bool,
  dateAndTime: PropTypes.string

}
export default NotificationStructure