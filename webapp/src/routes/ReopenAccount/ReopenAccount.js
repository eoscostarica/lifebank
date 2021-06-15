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
import { REOPEN_ACCOUNT_MUTATION } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const ReopenAccount = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const { account } = useParams()
  const [openSnackbar, setOpenSnackbar] = useState()

  useEffect(() => {
    if (reopenAccountError) {
      setOpenSnackbar({
        show: true,
        message: t('signup.noConsentNoEdit'),
        severity: 'error'
      })
    }
    if (reopenAccountResult) {
      setOpenSnackbar({
        show: true,
        message: t('signup.noConsentNoEdit'),
        severity: 'success'
      })
    }
  }, [reopenAccountResult, reopenAccountError])

  const [
    reopenAccount,
    {
      error: reopenAccountError,
      loading: reopenAccountLoading,
      data: { success: reopenAccountResult } = {}
    }
  ] = useMutation(REOPEN_ACCOUNT_MUTATION)
  console.log(account)

  const handleSnackbarClose = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const reopen_account = () => {
    reopenAccount({
      variables: {
        account : account
      }
    })
  }

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            {reopenAccountLoading && <CircularProgress />}
              <Typography className={classes.title}>
                {'Deseas Volver a Lifebank'}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={reopen_account}
                className={classes.btnHome}
              >
                {t('Bienvenido de Nuevo')}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={CustomRouterLink}
                to="/"
                className={classes.btnHome}
              >
                {t('emailVerification.takeHome')}
              </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert severity="error">
          {t('emailSubscription.error')}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ReopenAccount