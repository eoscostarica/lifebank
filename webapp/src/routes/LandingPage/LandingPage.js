import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'

import CustomRouterLink from '../../components/CustomRouterLink'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  }
}))

const LandingPage = () => {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h1">What is Lifebank?</Typography>
          <Typography variant="body1">
            Lifebank helps local communities create a virtuous circle of value
            exchange between three parties — a eligible donor user (EDU), a
            community donation center (CDC) and a participating local business
            (PLB).
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={CustomRouterLink}
            to="/signup"
          >
            Sign up
          </Button>
        </Paper>
      </Grid>
    </Grid>
  )
}

LandingPage.propTypes = {}

LandingPage.defaultProps = {}

export default LandingPage
