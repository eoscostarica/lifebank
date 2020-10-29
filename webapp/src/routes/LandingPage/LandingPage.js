import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'

import { useUser } from '../../context/user.context'
import CustomRouterLink from '../../components/CustomRouterLink'
import MapStatic from '../../components/MapStatic'
import mobileBgImage from '../../assets/the-world.png'
import bgImage from '../../assets/lifebank-hero-bg.png'

const useStyles = makeStyles((theme) => ({
  homeHeader: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex',
    backgroundImage: `url(${mobileBgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.up('md')]: {
      height: 578,
      backgroundImage: `url(${bgImage})`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  boxLeft: {
    width: '60%',
    paddingTop: theme.spacing(2),
    '& h1': {
      color: theme.palette.white,
      letterSpacing: '1px',
      marginLeft: theme.spacing(1)
    },
    '& h5': {
      color: theme.palette.secondary.main,
      letterSpacing: '0.25px',
      fontSize: 18,
      fontWeight: 500
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      paddingTop: theme.spacing(8),
      '& h1': {
        fontSize: 72,
        lineHeight: 0.68,
        textShadow: `0 2px 10px ${theme.palette.primary.mediumEmphasizedBlackText}`
      }
    }
  },
  boxRight: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(5, 1, 0, 0),
    '& p': {
      color: theme.palette.white,
      textAlign: 'end',
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      alignItems: 'center',
      padding: theme.spacing(8, 1, 0, 0),
      '& p': {
        lineHeight: 1.22,
        letterSpacing: '1px',
        fontSize: 32,
        textShadow: `0 2px 10px ${theme.palette.primary.mediumEmphasizedBlackText}`
      }
    }
  },
  bodyHome: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      margin: theme.spacing(1, 0)
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 0),
      '& h5': {
        letterSpacing: '0.25px',
        fontSize: 34,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: '15%',
        marginRight: '15%'
      },
      '& p': {
        fontSize: 21,
        lineHeight: 1.33,
        letterSpacing: '0.66px',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
        marginLeft: '15%',
        marginRight: '15%'
      }
    }
  },
  readMoreBox: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      '& a': {
        width: 324,
        marginTop: theme.spacing(3)
      }
    }
  },
  loginTypeDonor: {
    backgroundColor: theme.palette.secondary[50],
    width: '60%',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  loginTypeSponsor: {
    backgroundColor: theme.palette.secondary[50],
    width: '70%',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  loginTypeLifeBank: {
    backgroundColor: theme.palette.secondary[50],
    width: '90%',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  linkBtn: {
    textDecoration: 'none',
    width: '100%'
  },
  registerBtn: {
    width: 'auto',
    [theme.breakpoints.up('md')]: {
      width: 231,
      height: 49,
      marginTop: theme.spacing(5)
    }
  },
  mapBox: {
    margin: theme.spacing(2, 0),
    width: '100%',
    height: 400,
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2, 0, 4, 0),
      height: 587
    }
  }
}))

const LandingPage = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [currentUser] = useUser()

  return (
    <Grid container justify="center">
      <Box className={classes.homeHeader}>
        <Box className={classes.boxLeft}>
          <Typography variant="h1">{t('hero.title')}</Typography>
          <Box className={classes.loginTypeDonor}>
            <Typography variant="h5">{t('signup.asAdonor')}</Typography>
          </Box>
          <Box className={classes.loginTypeSponsor}>
            <Typography variant="h5">{t('signup.asAsponsor')}</Typography>
          </Box>
          <Box className={classes.loginTypeLifeBank}>
            <Typography variant="h5">{t('signup.asAbank')}</Typography>
          </Box>
        </Box>
        <Box className={classes.boxRight}>
          <Typography variant="body1">{t('hero.subtitle1')}</Typography>
          <Typography variant="body1">{t('hero.subtitle2')}</Typography>
          <Button
            className={classes.registerBtn}
            variant="contained"
            color="primary"
            component={CustomRouterLink}
            to={`/${currentUser ? 'donations' : 'signup'}`}
          >
            {currentUser ? 'Donations' : 'Register'}
          </Button>
        </Box>
      </Box>
      <Grid item xs={12} className={classes.bodyHome}>
        <Typography variant="h5">{t('map.findLifebank')}</Typography>

        <MapStatic />

        <Typography variant="h5">
          {t('miscellaneous.howLifebankWorks')}
        </Typography>
        <Typography variant="body1">
          {t('about.lifebankIsApowerful')}
        </Typography>
        <Box className={classes.readMoreBox}>
          <Link to="/about" className={classes.linkBtn}>
            <Button variant="outlined" color="primary" fullWidth>
              {t('miscellaneous.readMore')}
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LandingPage
