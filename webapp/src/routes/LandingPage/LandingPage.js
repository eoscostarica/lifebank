import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'

import CustomRouterLink from '../../components/CustomRouterLink'
import MapShowLocations from '../../components/MapShowLocations'

const useStyles = makeStyles((theme) => ({
  homeHeader: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex'
  },
  boxLeft: {
    width: '50%',
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
    }
  },
  boxRight: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(3, 1, 0, 0),
    '& p': {
      color: theme.palette.white,
      textAlign: 'end',
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(1)
    }
  },
  bodyHome: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    '& h5': {
      marginBottom: theme.spacing(2)
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(1)
    }
  },
  loginTypeDonor: {
    backgroundColor: theme.palette.secondary[50],
    width: '60%',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2)
  },
  loginTypeSponsor: {
    backgroundColor: theme.palette.secondary[50],
    width: '70%',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2)
  },
  loginTypeLifeBank: {
    backgroundColor: theme.palette.secondary[50],
    width: '90%',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2)
  }
}))

const LandingPage = () => {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Box className={classes.homeHeader}>
        <Box className={classes.boxLeft}>
          <Typography variant="h1">Join the Effort</Typography>
          <Box className={classes.loginTypeDonor}>
            <Typography variant="h5">As a Donor</Typography>
          </Box>
          <Box className={classes.loginTypeSponsor}>
            <Typography variant="h5">As a Sponsor</Typography>
          </Box>
          <Box className={classes.loginTypeLifeBank}>
            <Typography variant="h5">As a Life Bank</Typography>
          </Box>
        </Box>
        <Box className={classes.boxRight}>
          <Typography variant="body1">
            Catchy text to explain what this app is about and also a call to
            action so they go ahead and register!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={CustomRouterLink}
            to="/signup"
          >
            Register
          </Button>
        </Box>
      </Box>
      <Grid item xs={12} sm={8} md={6} className={classes.bodyHome}>
        <Typography variant="h5">
          Find your closest LifeBank or Sponsor
        </Typography>
        <Box width="100%" height={400} py={2}>
          <MapShowLocations />
        </Box>
        <Typography variant="h5">Am I Elegible?</Typography>
        <Typography variant="body1">
          Lifebank helps local communities create a virtuous circle of value
          exchange between three parties — a eligible donor user (EDU), a
          community donation center (CDC) and a participating local business
          (PLB).
        </Typography>

        <Button variant="outlined" color="primary">
          Read more
        </Button>
      </Grid>
    </Grid>
  )
}

LandingPage.propTypes = {}

LandingPage.defaultProps = {}

export default LandingPage
