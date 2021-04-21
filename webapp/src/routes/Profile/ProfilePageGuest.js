import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const useStyles = makeStyles(styles)

const ProfilePageGuest = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.name')}</Typography>
        <Typography variant="body1">{t('profile.guest')}</Typography>
      </Box>
      <Divider className={classes.divider} />
    </>
  )
}

export default memo(ProfilePageGuest)