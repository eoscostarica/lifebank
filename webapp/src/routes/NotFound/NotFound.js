import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

import CustomRouterLink from '../../components/CustomRouterLink'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    height: '100vh'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  centerText: {
    textAlign: 'center'
  }
}))

const NotFound = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <div className={classes.centerText}>
            <Typography variant="h1">{t('notFound.404Error')}</Typography>
            <Typography variant="subtitle2">
              {t('notFound.notFoundMessage')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              activeClassName={classes.active}
              component={CustomRouterLink}
              to="/"
            >
              {t('notFound.TakeMeHome')}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default NotFound
