import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'


import CustomRouterLink from '../../components/CustomRouterLink'



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
    paddingLeft: "5%",
    paddingRight: "5%"
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
    marginBottom: 15,
    textDecoration: 'none'
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
    marginBottom: 30,
    marginLeft: 10

  },
  link: {
    textDecoration: 'none'
  },
  btnHome: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "25%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      width: "60%",
    }
  },
}))

const NotFound = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const preventDefault = (event) => event.preventDefault();

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
