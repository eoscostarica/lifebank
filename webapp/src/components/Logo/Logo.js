import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    maxHeight: 200,
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
    maxHeight: 150,
    margin: 'auto'
  }
}))

const Logo = ({ logoUrl, showCaption, showDeleteButton, deleteActualLogo }) => {
  const { t } = useTranslation('translations')
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
        <img
          className={classes.logo}
          src={`//images.weserv.nl?url=${logoUrl}&h=300&dpr=2`}
          alt="user-logo"
        />
        <br />
        {showCaption && (
          <Typography variant="caption" style={{ textAlign: 'right' }}>
            {t('miscellaneous.addTransparentIfPossible')}
          </Typography>
        )}
      </Card>
    </Grid>
  )
}

Logo.propTypes = {
  logoUrl: PropTypes.string,
  showCaption: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  deleteActualLogo: PropTypes.func
}

export default Logo
