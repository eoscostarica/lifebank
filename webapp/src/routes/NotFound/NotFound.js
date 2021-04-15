import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

import CustomRouterLink from '../../components/CustomRouterLink'
import styles from './styles'

const useStyles = makeStyles(styles)

const NotFound = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            <Typography className={classes.tittle}>{t('notFound.404Error')}
              <Link className={classes.link} to="/" > {t('notFound.home')}</Link>
              {t('notFound.404Error2')} </Typography>
            <Typography className={classes.subTitle}>{t('notFound.notFoundMessage')}
              <a className={classes.link} href="https://t.me/eoscr" > {t('notFound.telegramChat')} </a>
              {t('notFound.notFoundMessage2')}
              <a className={classes.link} href="https://eoscostarica.io/contact-us/" > {t("notFound.linkEOS")} </a>
              {t('notFound.notFoundMessage3')}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.btnHome}
              component={CustomRouterLink}
              to="/"
            >
              {t('notFound.takeMeHome')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default NotFound
