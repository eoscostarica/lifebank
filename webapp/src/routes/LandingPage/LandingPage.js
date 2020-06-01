import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { useUser } from '../../context/user.context'
import CustomRouterLink from '../../components/CustomRouterLink'
import MapShowLocations from '../../components/MapShowLocations'

const useStyles = makeStyles((theme) => ({
  homeHeader: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex'
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
    }
  },
  boxRight: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(7, 1, 0, 0),
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
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      margin: theme.spacing(1, 0)
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
  },
  linkBtn: {
    textDecoration: 'none',
    width: '100%'
  }
}))

const LandingPage = () => {
  const classes = useStyles()
  const [currentUser] = useUser()

  return (
    <Grid container justify="center">
      <Box className={classes.homeHeader}>
        <Box className={classes.boxLeft}>
          <Typography variant="h1">Start Saving Lives</Typography>
          <Box className={classes.loginTypeDonor}>
            <Typography variant="h5">As a Donor</Typography>
          </Box>
          <Box className={classes.loginTypeSponsor}>
            <Typography variant="h5">As a Sponsor</Typography>
          </Box>
          <Box className={classes.loginTypeLifeBank}>
            <Typography variant="h5">As a Lifebank</Typography>
          </Box>
        </Box>
        <Box className={classes.boxRight}>
          <Typography variant="body1">
            Give blood banks a lifeline. Register to donate life.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={CustomRouterLink}
            to={`/${currentUser ? 'profile' : 'signup'}`}
          >
            {currentUser ? 'Profile' : 'Register'}
          </Button>
        </Box>
      </Box>
      <Grid item xs={12} sm={8} md={6} className={classes.bodyHome}>
        <Typography variant="h5">
          Find a Lifebank or sponsor near you.
        </Typography>

        <MapShowLocations width="100%" height={400} my={2} />

        <Typography variant="h5">How Lifebank works</Typography>
        <Typography variant="body1">
          Lifebank is a powerful application that uses blockchain technology to
          save lives. After completing a donation at any registered Lifebank, a
          life donor will earn a Life Token that can be redeemed at a local
          sponsor.
        </Typography>
        <Link to="/about" className={classes.linkBtn}>
          <Button variant="outlined" color="primary" fullWidth>
            Read more
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default LandingPage
