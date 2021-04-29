import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'

import CustomRouterLink from '../../components/CustomRouterLink'
import styles from './styles'

const useStyles = makeStyles(styles)

const InternalError = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            <Typography className={classes.title}>{t('internalError.500Error')}</Typography>
            <Typography className={classes.subTitle}>{t('internalError.errorMessage')}</Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.btnHome}
              component={CustomRouterLink}
              to="/"
            >
              {t('internalError.takeMeHome')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default InternalError
