import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import CustomRouterLink from '../../components/CustomRouterLink'
import { UPDATE_EMAIL_SUBSCRIPTION_MUTATION } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const ReopenAccount = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const { account } = useParams()
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleOpenSnackbar = () => {
    setOpenSnackbar(!openSnackbar)
  }

  const [
    updateEmailSubscription,
    {
      error: errorUpdateEmailSubscription,
      loading: updateEmailSubscriptionLoading,
      data: { update_user: updateEmailSubscriptionResult } = {}
    }
  ] = useMutation(UPDATE_EMAIL_SUBSCRIPTION_MUTATION)

  const onUpdateEmailSubscriptionClick = () => {
    updateEmailSubscription({
      variables: {
        account,
        state: false
      }
    })
  }

  useEffect(() => {
    if(updateEmailSubscriptionResult && updateEmailSubscriptionResult.affected_rows === 0) handleOpenSnackbar()
  }, [updateEmailSubscriptionResult])

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            {updateEmailSubscriptionLoading && <CircularProgress />}
            {!updateEmailSubscriptionLoading && !updateEmailSubscriptionResult && (
              <Typography className={classes.title}>
                {t('emailSubscription.cancelMessage')}
              </Typography>
            )}
            {!updateEmailSubscriptionLoading && updateEmailSubscriptionResult && (
              <Typography className={classes.title}>
                {t('emailSubscription.successfulCancel')}
              </Typography>
            )}
            {!updateEmailSubscriptionLoading && !updateEmailSubscriptionResult && (
              <Button
                variant="contained"
                color="secondary"
                onClick={onUpdateEmailSubscriptionClick}
                className={classes.btnHome}
              >
                {t('emailSubscription.cancel')}
              </Button>
            )}
            {!updateEmailSubscriptionLoading && updateEmailSubscriptionResult && (
              <Button
                variant="contained"
                color="secondary"
                component={CustomRouterLink}
                to="/"
                className={classes.btnHome}
              >
                {t('emailVerification.takeHome')}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleOpenSnackbar}>
        <Alert severity="error">
          {t('emailSubscription.error')}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ReopenAccount