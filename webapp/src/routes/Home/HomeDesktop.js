import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { useUser } from '../../context/user.context'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import StarIcon from '@material-ui/icons/Star'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/Mic'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import ShowOffersDesktop from '../../components/ShowElements/ShowOffersDesktop'
import ShowLifebanksDesktop from '../../components/ShowElements/ShowLifebanksDesktop'
import ShowSponsorsDesktop from '../../components/ShowElements/ShowSponsorsDesktop'
import DonationsDashboard from '../../components/DonationsDashboard'
import MapModal from '../../components/MapModal'
import FilterHome from '../../components/FilterHome'
import Signup from '../../components/Signup/Signup'
import styles from './styles'

import {
  SEND_EMAIL_MUTATION,
  CHECK_EMAIL_VERIFIED
} from '../../gql'

const useStyles = makeStyles(styles)

const HomeDesktop = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [currentUser] = useUser()
  const [recording, setRecording] = React.useState(false)
  const { transcript } = useSpeechRecognition()
  const [
    sendEmail,
    {
      error: errorSendEmail,
      loading: SendEmailLoading,
      data: { send_email: sendEmailResult } = {}
    }
  ] = useMutation(SEND_EMAIL_MUTATION)

  const [
    checkEmailVerified,
    {
      error: errorCheckEmailVerified,
      loading: checkEmailVerifiedLoading,
      data: { check_email_verified: checkEmailVerifiedResult } = {}
    }
  ] = useMutation(CHECK_EMAIL_VERIFIED)

  const handleSendEmail = () => {
    // sendEmail({
    //   variables: {
    //     account: 'steph1@gmail.com',
    //     emailContent: {
    //       subject: t('emailMessage.subjectVerificationCode'),
    //       title: t('emailMessage.titleVerificationCode'),
    //       message: t('emailMessage.messageVerificationCode'),
    //       button: t('emailMessage.verifyButton')
    //     }
    //   }
    // })

    checkEmailVerified({
      variables: {
        account: 'donor@gmail.com'
      }
    })
  }

  const handleRecording = () => {
    if (!recording) {
      SpeechRecognition.startListening({ language: t('common.currentLanguage') })
      setRecording(true)
    }
    else {
      SpeechRecognition.stopListening()
      props.handleChangeSearch(transcript)
      setRecording(false)
    }
  }

  useEffect(() => {
    props.handleChangeSearch(transcript)
  }, [transcript])

  useEffect(() => {
    console.log('SEND-EMAIL-RESULT', sendEmailResult)
  }, [sendEmailResult])

  useEffect(() => {
    console.log('CHECK-EMAIL-VERIFIED-RESULT', checkEmailVerifiedResult)
  }, [checkEmailVerifiedResult])

  return (
    <>
      <Box className={classes.homeHeader}>
        <Box className={classes.boxLeft}>
          <Typography variant="h1">{t('hero.title')}</Typography>
        </Box>
        <Box className={classes.boxRight}>
          <Typography variant="body1">{t('hero.subtitle1')}</Typography>
          <Typography variant="body1">{t('hero.subtitle2')}</Typography>
          <Signup isHome />
        </Box>
      </Box>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={0}
        className={classes.mainGridControlsDesktop}
        md={12}
        xl={10}
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
            <Button
              className={classes.buttonIconDesktop}
              startIcon={<StarIcon />}
              onClick={handleSendEmail}
            >
              SEND EMAIL
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
              startAdornment: <SearchIcon className={classes.iconSeachBar} />,
              endAdornment: <IconButton
                className={clsx(classes.iconSeachBar, {
                  [classes.recordingIcon]: recording
                })}
                onClick={handleRecording}
              >
                <MicIcon />
              </IconButton>

            }}
            value={props.searchValue}
            onChange={(event) => props.handleChangeSearch(event.target.value)}
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
        md={12}
        xl={10}
      >
        <Grid item md={12}>
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('cardsSection.availableOffers')}
          </Typography>
          <ShowOffersDesktop
            offers={props.offers}
            loading={props.loadingOffers}
          />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('rolesTitle.plural.lifebanks')}
          </Typography>
          <ShowLifebanksDesktop
            banks={props.lifebanks}
            loading={props.loadingLifebanks}
          />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('rolesTitle.plural.sponsors')}
          </Typography>
          <ShowSponsorsDesktop
            sponsors={props.sponsors}
            loading={props.loadingSponsors}
          />
        </Grid>
        {currentUser && (
          <DonationsDashboard isDesktop currentUser={currentUser} />
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
  applyFilters: PropTypes.func,
  searchValue: PropTypes.string,
  handleChangeSearch: PropTypes.func
}

export default HomeDesktop
