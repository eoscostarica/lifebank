import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

import VideoSection from '../../components/VideoSection'

const useStyles = makeStyles((theme) => ({
  contentInfo: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(2, 1),
    '& svg': {
      fontSize: 50,
      marginBottom: theme.spacing(3)
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(2)
    },
    '& h4': {
      marginBottom: theme.spacing(2)
    }
  },
  video: {
    margin: 'auto',
    maxWidth: '800px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '1rem'
  }
}))

const About = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.contentInfo}>
      <VideoSection
        src="https://www.youtube.com/embed/tgbZWs5vE5s"
        className={classes.video}
      />
      <Typography variant="h4">
        {t('navigationDrawer.aboutLifebank')}:
      </Typography>
      <Typography variant="body1">{t('about.eosioBased')}</Typography>
      <Typography variant="body1">{t('about.eoscrInitiative')}</Typography>

      <Typography variant="h4">{t('about.storyBehindLifebank')}:</Typography>
      <Typography variant="body1">{t('about.weIdentified')}</Typography>
      <Typography variant="body1">{t('about.moreOver')}</Typography>

      <Typography variant="h4">{t('about.aboutLifeTokens')}:</Typography>
      <Typography variant="body1">{t('about.aDonorCanEarn')}</Typography>
      <Typography variant="body1">{t('about.also')}</Typography>
    </Box>
  )
}

export default About
