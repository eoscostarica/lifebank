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
  const history = useHistory()
  const [openSnackbar, setOpenSnackbar] = useState({ show: false })
  const [
    reopenAccount,
    {
      error: reopenAccountError,
      loading: reopenAccountLoading,
      data: { reopen_account: reopenAccountResult } = {}
    }
  ] = useMutation(REOPEN_ACCOUNT_MUTATION)

  const handleSnackbarClose = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const reopen_account = () => {
    reopenAccount({
      variables: {
        account: account
      }
    })
  }

  useEffect(() => {
    if (reopenAccountError) {
      setOpenSnackbar({
        show: true,
        message: t('reopenAndClose.error'),
        severity: 'error'
      })
    }
    if (reopenAccountResult) {
      history.push('/')
      setOpenSnackbar({
        show: true,
        message: t('reopenAndClose.success'),
        severity: 'success'
      })
    }
  }, [reopenAccountResult, reopenAccountError])

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            <Typography className={classes.title}>
              {t('reopenAndClose.welcomeBackTitle')}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={reopen_account}
              className={classes.btnHome}
            >
              {t('reopenAndClose.welcomeBack')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={CustomRouterLink}
              to="/"
              className={classes.btnReturn}
            >
              {t('reopenAndClose.takeHome')}
            </Button>
          </Box>
          <Box>
            {reopenAccountLoading && <CircularProgress />}
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar.show} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ReopenAccount