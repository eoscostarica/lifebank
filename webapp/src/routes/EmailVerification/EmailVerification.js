import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

import CustomRouterLink from '../../components/CustomRouterLink'
import { VERIFY_EMAIL } from '../../gql'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  centerText: {
    textAlign: 'center'
  },
  button: {
    marginTop: 10
  }
}))

const EmailVerification = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [validate, setValidate] = useState(true)
  const { code } = useParams()

  const [
    verifyEmail,
    { data: { verify_email: verifyEmailResult } = {} }
  ] = useMutation(VERIFY_EMAIL)

  useEffect(() => {
    verifyEmail({
      variables: {
        code: code
      }
    })
  }, [code])

  useEffect(() => {
    if (verifyEmailResult) {
      setLoading(false)
      setValidate(verifyEmailResult.is_verified)
    }
  }, [verifyEmailResult])

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <div className={classes.centerText}>
            {loading && <CircularProgress />}
            {!loading && validate && (
              <Typography variant="h1">
                {t('emailVerification.emailVerified')}
              </Typography>
            )}
            {!loading && !validate && (
              <Typography variant="h1">
                {t('emailVerification.somethingHappened')}
              </Typography>
            )}
            {!loading && (
              <Button
                variant="contained"
                color="primary"
                activeClassName={classes.active}
                component={CustomRouterLink}
                to="/"
                className={classes.button}
              >
                {t('emailVerification.takeHome')}
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default EmailVerification
