import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    height: 'calc(100vh - 60px)'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  centerText: {
    textAlign: 'center',
  },
  tittle: {
    fontFamily: "Roboto",
    fontSize: "34px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 15
  },
  subTitle: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 30
  },
  btnHome: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "50%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
}))

const EmailVerification = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [, { logout }] = useUser()
  const [validate, setValidate] = useState(true)
  const { code } = useParams()

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
  }, [code])

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
      } else setValidate(false)
    }

  }, [errorVerifyEmail])

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            {loadingVerifyEmail && <CircularProgress />}
            {!loadingVerifyEmail && validate && (
              <Typography className={classes.tittle}>
                {t('emailVerification.emailVerified')}
              </Typography>
            )}
            {!loadingVerifyEmail && !validate && (
              <Typography className={classes.tittle}>
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
