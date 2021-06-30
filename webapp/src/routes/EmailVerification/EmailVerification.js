import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { useUser } from '../../context/user.context'
import CustomRouterLink from '../../components/CustomRouterLink'
import { VERIFY_EMAIL } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const EmailVerification = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [, { logout }] = useUser()
  const [validate, setValidate] = useState(true)
  const { code } = useParams()
  const history = useHistory()

  const [
    verifyEmail,
    { loading: loadingVerifyEmail, error: errorVerifyEmail, data: { verify_email: verifyEmailResult } = {} }
  ] = useMutation(VERIFY_EMAIL)

  useEffect(() => {
    verifyEmail({
      variables: {
        code: code
      }
    })
  }, [verifyEmail, code])

  useEffect(() => {
    if (verifyEmailResult) setValidate(verifyEmailResult.is_verified)

  }, [verifyEmailResult])

  useEffect(() => {
    if (errorVerifyEmail) {
      if (errorVerifyEmail.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        verifyEmail({
          variables: {
            code: code
          }
        })
      } else {
        setValidate(false)
        history.push('/internal-error')
      }
    }

  }, [verifyEmail, logout, code, history, errorVerifyEmail])

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            {loadingVerifyEmail && <CircularProgress />}
            {!loadingVerifyEmail && validate && (
              <Typography className={classes.title}>
                {t('emailVerification.emailVerified')}
              </Typography>
            )}
            {!loadingVerifyEmail && !validate && (
              <Typography className={classes.title}>
                {t('emailVerification.somethingHappened')}
              </Typography>
            )}
            {!loadingVerifyEmail && (
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
    </Box>
  )
}

export default EmailVerification
