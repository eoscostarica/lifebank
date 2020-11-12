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
import { UPDATE_STATE_LIFEBANK, CREATE_ACCOUNT_LIFEBANK_MUTATION } from '../../gql'

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

const RegisterLifebank = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [lifebank, setLifebank] = useState()
  const { code } = useParams()

  const [createAccountLifebank,] = useMutation(CREATE_ACCOUNT_LIFEBANK_MUTATION)

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

  const [
    verifyEmail,
    { data: { update_preregister_lifebank: lifebankData } = {} }
  ] = useMutation(UPDATE_STATE_LIFEBANK)

  useEffect(() => {
    verifyEmail({
      variables: {
        verification_code: code
      }
    })
  }, [code])

  useEffect(() => {
    if (lifebankData) {
      setLoading(false)
      setLifebank(lifebankData.returning[0])
    }
  }, [lifebankData])

  useEffect(() => {
    if (lifebank)
      handleCreateAccountLifebank()
  }, [lifebank])

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <div className={classes.centerText}>
            {loading && <CircularProgress />}
            {!loading && lifebank && (
              <Typography variant="h1">
                {t('approveAccount.accountapprove')}
              </Typography>
            )}
            {!loading && !lifebank && (
              <Typography variant="h1">
                {t('approveAccount.somethingHappened')}
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

export default RegisterLifebank
