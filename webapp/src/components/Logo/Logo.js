import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    maxHeight: 300,
    margin: 'auto',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    '& > div.MuiCard-root': {
      padding: theme.spacing(2),
      backgroundColor: 'transparent',
      border: '1px solid lightgray'
    }
  },
  logo: {
    maxWidth: '100%',
    maxHeight: 340,
    margin: 'auto'
  }
}))

const Logo = ({ logoUrl, showCaption }) => {
  const classes = useStyles()

  return (
    <Grid
      className={classes.imageContainer}
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
    >
      <Card style={{ textAlign: 'center' }} elevation={0}>
        <img className={classes.logo} src={logoUrl} alt="user-logo" />
        <br />
        {showCaption && (
          <Typography variant="caption" style={{ textAlign: 'right' }}>
            *Add image with transparent background if possible
          </Typography>
        )}
      </Card>
    </Grid>
  )
}

Logo.propTypes = {
  logoUrl: PropTypes.string,
  showCaption: PropTypes.bool
}

export default Logo
