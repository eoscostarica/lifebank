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

import { useUser } from '../../context/user.context'
import CustomRouterLink from '../../components/CustomRouterLink'
import { UPDATE_STATE_LIFEBANK, CREATE_ACCOUNT_LIFEBANK_MUTATION } from '../../gql'

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

const RegisterLifebank = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [lifebank, setLifebank] = useState()
  const [, { logout }] = useUser()
  const { code } = useParams()
  const history = useHistory()

  const [createAccountLifebank, { error: errorCreateAccount }] = useMutation(CREATE_ACCOUNT_LIFEBANK_MUTATION)

  const [
    verifyEmail,
    { loading: loadingVerifyEmail, error: errorVerifyEmail, data: { update_preregister_lifebank: lifebankData } = {} }
  ] = useMutation(UPDATE_STATE_LIFEBANK)


  const handleCreateAccountLifebank = () => {
    if (lifebank) {
      const { name, email, verification_code } = lifebank
      const secret = lifebank.password

      createAccountLifebank({
        variables: {
          email,
          name,
          secret,
          verification_code
        }
      })
    }
  }

  useEffect(() => {
    verifyEmail({
      variables: {
        verification_code: code
      }
    })
  }, [code])

  useEffect(() => {
    if (lifebankData) setLifebank(lifebankData.returning[0])

  }, [lifebankData])

  useEffect(() => {
    if (lifebank) handleCreateAccountLifebank()

  }, [lifebank])

  useEffect(() => {
    if (errorVerifyEmail) {
      if (errorVerifyEmail.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        verifyEmail({
          variables: {
            verification_code: code
          }
        })
      } else {
        setLifebank(null)
        history.push('/internal-error')
      }
    }

  }, [errorVerifyEmail])

  useEffect(() => {
    if (errorCreateAccount) {
      if (errorCreateAccount.message === 'GraphQL error: Could not verify JWT: JWTExpired') {
        logout()
        verifyEmail({
          variables: {
            verification_code: code
          }
        })
      } else {
        setLifebank(null)
        history.push('/internal-error')
      }
    }

  }, [errorCreateAccount])

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            {loadingVerifyEmail && <CircularProgress />}
            {!loadingVerifyEmail && lifebank && (
              <Typography className={classes.tittle}>
                {t('approveAccount.accountapprove')}
              </Typography>
            )}
            {!loadingVerifyEmail && !lifebank && (
              <Typography className={classes.tittle}>
                {t('approveAccount.somethingHappened')}
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

export default RegisterLifebank
