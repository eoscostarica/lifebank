import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import HttpIcon from '@material-ui/icons/Http'
import TelegramIcon from '@material-ui/icons/Telegram'
import GitHubIcon from '@material-ui/icons/GitHub'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  contentInfo: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: theme.spacing(3, 1),
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      marginTop: theme.spacing(2)
    }
  },
  boxLinks: {
    display: 'flex',
    marginTop: theme.spacing(3),
    '& a': {
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '& svg': {
      marginRight: theme.spacing(3),
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    },
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      marginTop: 0
    }
  }
}))

const Help = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.contentInfo}>
      <Typography variant="h4">{t('miscellaneous.help')}</Typography>
      <Typography variant="body1">
        {t('miscellaneous.thankYouForUsingLifebank')}
      </Typography>
      <Box className={classes.boxLinks}>
        <GitHubIcon />
        <Link
          href="https://github.com/eoscostarica"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="body1">Github EOS Costa Rica</Typography>
        </Link>
      </Box>
      <Box className={classes.boxLinks}>
        <TelegramIcon />
        <Link
          href="https://web.telegram.org/#/eoscr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="body1">{t('miscellaneous.telegram')}</Typography>
        </Link>
      </Box>
      <Box className={classes.boxLinks}>
        <HttpIcon />
        <Link
          href="https://eoscostarica.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="body1">
            {t('miscellaneous.websiteEoscr')}
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default Help
