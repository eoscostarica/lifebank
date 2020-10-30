import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import CustomRouterLink from '../../components/CustomRouterLink'
import { useUser } from '../../context/user.context'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import StarIcon from '@material-ui/icons/Star'
import { useTranslation } from 'react-i18next'

import DonationsDashboard from '../../components/DonationsDashboard'
import MapModal from '../../components/MapModal'
import ShowOffers from './ShowOffers'
import ShowLifebanks from './ShowLifebanks'
import ShowSponsors from './ShowSponsors'
import mobileBgImage from '../../assets/the-world.png'
import bgImage from '../../assets/lifebank-hero-bg.png'
import FilterHome from '../../components/FilterHome'

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
  registerBtn: {
    width: 180,
    height: 49,
    backgroundColor: 'transparent',
    margin: theme.spacing(2, 0, 4, 0),
    borderRadius: ' 2px',
    border: 'solid 2px #ffffff'
  },
  fabButtonDesktop: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'fixed',
    zIndex: 1,
    bottom: 20,
    right: 20,
    margin: '0',
    color: '#ffffff'
  },
  iconFab: {
    color: '#ffffff',
    marginRight: 10
  },
  buttonIconDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  title: {
    height: '50px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  },
  boxControls: {
    padding: 20,
    display: 'flex'
  },
  mainGridControlsDesktop: {
    backgroundColor: '#ffffff'
  },
  mainGridDesktop: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRigth: 20,
    backgroundColor: '#ffffff'
  },
  boxIcons: {
    marginRight: '15px'
  },
  searchBar: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.75',
    letterSpacing: '0.44px',
    '& .MuiInputBase-input ': {
      paddingTop: '12px'
    }
  },
  iconSeachBar: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: 20,
    height: 20,
    marginLeft: 15,
    marginRight: 15
  },
  titleMainSection: {
    fontSize: '24px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal'
  }
}))

const HomeDesktop = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [currentUser] = useUser()

  return (
    <>
      <Box className={classes.homeHeader}>
        <Box className={classes.boxLeft}>
          <Typography variant="h1">{t('hero.title')}</Typography>
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
            {currentUser ? t('donations.donations') : t('hero.register')}
          </Button>
        </Box>
      </Box>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={0}
        className={classes.mainGridControlsDesktop}
      >
        <Grid item md={7} lg={6} className={classes.boxControls}>
          <Box className={classes.boxIcons}>
            <MapModal isDesktop />
          </Box>
          <Box className={classes.boxIcons}>
            <FilterHome isDesktop applyFilters={props.applyFilters} />
          </Box>
          <Box className={classes.boxIcons}>
            <Button
              disabled
              className={classes.buttonIconDesktop}
              startIcon={<StarIcon />}
            >
              {t('contentToolbar.favorites')}
            </Button>
          </Box>
        </Grid>
        <Grid item md={5} lg={6} className={classes.boxControls}>
          <TextField
            id="filled-basic"
            variant="filled"
            className={classes.searchBar}
            placeholder={t('contentToolbar.inputPlaceholder')}
            InputProps={{
              startAdornment: <SearchIcon className={classes.iconSeachBar} />
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={0}
        className={classes.mainGridDesktop}
      >
        <Grid item md={12}>
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('cardsSection.availableOffers')}
          </Typography>
          <ShowOffers
            offers={props.offers}
            loading={props.loadingOffers}
            isDesktop
          />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('rolesTitle.plural.lifebanks')}
          </Typography>
          <ShowLifebanks
            banks={props.lifebanks}
            loading={props.loadingLifebanks}
            isDesktop
          />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('rolesTitle.plural.sponsors')}
          </Typography>
          <ShowSponsors
            sponsors={props.sponsors}
            loading={props.loadingSponsors}
            isDesktop
          />
        </Grid>
        {currentUser && (
          <DonationsDashboard isDesktop role={currentUser.role} />
        )}
      </Grid>
    </>
  )
}

HomeDesktop.propTypes = {
  offers: PropTypes.array,
  loadingOffers: PropTypes.bool,
  lifebanks: PropTypes.array,
  loadingLifebanks: PropTypes.bool,
  sponsors: PropTypes.array,
  loadingSponsors: PropTypes.bool,
  applyFilters: PropTypes.func
}

export default HomeDesktop
