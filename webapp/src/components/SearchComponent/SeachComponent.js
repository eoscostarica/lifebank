import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Slide from '@material-ui/core/Slide'
import InputBase from '@material-ui/core/InputBase'
import MicIcon from '@material-ui/icons/Mic'
import { useTranslation } from 'react-i18next'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import ShowOffers from './../../routes/Home/ShowOffers'
import ShowLifebanks from './../../routes/Home/ShowLifebanks'
import ShowSponsors from './../../routes/Home/ShowSponsors'


const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: 'inherit'
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  appBar: {
    height: "60px",
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)'
  },
  contentBox: {
    height: "calc(100vh - 60px)",
  },
  backIcon: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  recordingIcon: {
    color: '#ba0d0d'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '20px',
    fontWeight: '500'
  },
  input: {
    width: "90%",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.15px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
  },
  titleMainSection: {
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal',
    marginTop: 20,
    marginLeft: 15
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SeachComponent = (props) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [recording, setRecording] = React.useState(false)
  const { transcript, resetTranscript } = useSpeechRecognition()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    props.handleChangeSearch("")
  }

  const handleStarRecording = () => {
    SpeechRecognition.startListening({ language: t('common.currentLanguage') })
    setRecording(true)
  }

  const handleEndRecording = () => {
    SpeechRecognition.stopListening()
    props.handleChangeSearch(transcript)
    setRecording(false)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <SearchIcon className={classes.iconBottomAppBar} />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.backIcon}
              onClick={handleClose}
              aria-label="close"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search"
              value={props.searchValue}
              onChange={(event) => props.handleChangeSearch(event.target.value)}
            />
            {!recording &&
              <IconButton
                className={classes.backIcon}
                onClick={handleStarRecording}
              >
                <MicIcon />
              </IconButton>
            }
            {recording &&
              <IconButton
                className={classes.recordingIcon}
                onClick={handleEndRecording}
              >
                <MicIcon />
              </IconButton>
            }
          </Toolbar>
        </AppBar>
        <Box className={classes.contentBox}>
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('cardsSection.availableOffers')}
          </Typography>
          <ShowOffers
            offers={props.offers}
            loading={props.loadingOffers}
            isDesktop={false}
          />
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('rolesTitle.plural.lifebanks')}
          </Typography>
          <ShowLifebanks
            banks={props.lifebanks}
            loading={props.loadingLifebanks}
            isDesktop={false}
          />
          <Typography variant="h2" className={classes.titleMainSection}>
            {t('rolesTitle.plural.sponsors')}
          </Typography>
          <ShowSponsors
            sponsors={props.sponsors}
            loading={props.loadingSponsors}
            isDesktop={false}
          />
        </Box>
      </Dialog>
    </>
  )
}

SeachComponent.propTypes = {
  offers: PropTypes.array,
  loadingOffers: PropTypes.bool,
  lifebanks: PropTypes.array,
  loadingLifebanks: PropTypes.bool,
  sponsors: PropTypes.array,
  loadingSponsors: PropTypes.bool,
  searchValue: PropTypes.string,
  handleChangeSearch: PropTypes.func
}

export default SeachComponent
