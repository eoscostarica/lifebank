import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useLazyQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../../context/user.context'
import { useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CloseIcon from '@material-ui/icons/Close'
import QRCode from 'qrcode.react'

import { PROFILE_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  fabButton: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'absolute',
    zIndex: 1,
    top: -30,
    right: 20,
    margin: '0',
    color: "#ffffff",
  },
  fabButtonDesktop: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'fixed',
    zIndex: 1,
    bottom: 20,
    right: 20,
    margin: '0',
    color: "#ffffff"
  },
  iconBottomAppBar: {
    color: "#121212"
  },
  iconFab: {
    color: "#ffffff",
    marginRight: 10
  },
  draweTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "0.15px",
    marginBottom: 7,
  },
  draweTitleDesktop: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.15px",
    marginBottom: 7,
  },
  dividerTitle: {
    marginBottom: 4,
  },
  boxBalance: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  balanceText: {
    color: "#121212",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.14,
    letterSpacing: "normal",
    margin: 0,
  },
  heart: {
    padding: 0,
    width: '110px',
    fontSize: 275,
    animation: '$heartbeat 1.4s linear infinite',
    [theme.breakpoints.up('md')]: {
      width: '140px',
    }
  },
  sectionTitle: {
    color: "#000000",
    fontFamily: "Roboto",
    fontSize: "10px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.6,
    letterSpacing: "0.5px",
    marginBottom: 0,
  },
  dividerSection: {
    marginBottom: 4,
    color: "#000000",
  },
  sectionText: {
    color: "#000000",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.43,
    letterSpacing: "0.25px",
    marginBottom: 10,
  },
  boxQR: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: 20,
    }
  },
  accountText: {
    color: "#000000",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "0.15",
    margin: 11,
  },
  inputText: {
    width: "85%",
  },
  camaraButtonIcon: {
    width: "10%",
    marginTop: 5,
    marginLeft: 10,
  },
  camaraIcon: {
    color: "#000000",
  },
  sendTokenButton: {
    backgroundColor: "#ba0d0d",
    borderRadius: 50,
    height: 40,
    width: 140,
    padding: 10,
    color: "#ffffff",
  },
  boxButtonSendToken: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  boxTexfield: {
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: '70%',
      margin: "auto",
      marginTop: 20,
    }
  },
  dialog: {
    padding: 20
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
    margin: '0',
    height: "5vh",
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
}));

const EmptyHeartSVG = ({ balance, isDesktop }) => {
  const classes = useStyles()
  let textColor

  if (isDesktop) {
    textColor = "#ffffff"
  } else {
    textColor = "#000000"
  }

  return (
    <svg viewBox="0 0 800 700" className={classes.heart}>
      <path
        fill="#B71C1C"
        d="M514.672,106.17c-45.701,0-88.395,22.526-114.661,59.024c-26.284-36.505-68.981-59.024-114.683-59.024C207.405,106.17,144,169.564,144,247.5c0,94.381,57.64,144.885,124.387,203.358c38.983,34.149,83.17,72.856,119.654,125.332l12.267,17.641l11.854-17.924c35.312-53.388,78.523-91.695,120.305-128.734C596.006,390.855,656,337.654,656,247.5C656,169.564,592.604,106.17,514.672,106.17z M513.143,425.371c-36.93,32.729-78.27,69.373-113.402,117.391c-35.717-46.873-76.089-82.242-112.148-113.834c-63.944-56.01-114.447-100.26-114.447-181.428c0-61.868,50.325-112.186,112.184-112.186c43.196,0,83.034,25.395,101.491,64.697l13.191,28.105l13.19-28.112c18.443-39.303,58.273-64.69,101.472-64.69c61.866,0,112.185,50.317,112.185,112.186C626.856,324.548,576.673,369.047,513.143,425.371z"
      />
      {isDesktop &&
        <g transform="translate(150, 200)">
          <path
            fill="#B71C1C"
            d="M 10,30 A 25,22 0,0,1 250,10 A 25,20 0,0,1 480,10 Q 550,80 240,360 Q 10,150 10,30 z"
          />
        </g>
      }
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="200"
        fontFamily="Roboto"
        textRendering="geometricPrecision"
        lengthAdjust="spacingAndGlyphs"
        fill={textColor}
      >
        {balance}
      </text>
    </svg>
  )
}

const DonationsDashboard = ({ isDesktop }) => {
  const [maxWidth] = useState('md');
  const [open, setOpen] = useState(false)
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });
  const [currentUser] = useUser()
  const history = useHistory()
  const [
    loadProfile,
    { data: { profile: { profile } = {} } = {}, client }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const tokens = profile?.balance.length
    ? profile.balance.join(',').split(' ')[0]
    : 0

  useEffect(() => {
    if (!currentUser) {
      client && client.resetStore()
      history.replace('/')

      return
    }

    loadProfile()
  }, [currentUser, history, client, loadProfile])

  const anchor = "bottom"

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {

      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [anchor]: open });
    }
  };

  const handleOpen = () => {
    setOpen(!open)
  }

  const DashboardContent = () => {
    return (
      <Box>
        {isDesktop &&
          <>
            <Box className={classes.closeIcon}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleOpen}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Typography className={classes.draweTitleDesktop}>Donate</Typography>
          </>
        }
        {!isDesktop &&
          <>
            <Typography className={classes.draweTitle}>Your Donations and Rewards</Typography>
            <Divider className={classes.dividerTitle} />
          </>
        }
        <Box className={classes.boxBalance}>
          <Typography className={classes.balanceText}>You own</Typography>
          <EmptyHeartSVG balance={parseInt(tokens)} isDesktop={isDesktop} />
          <Typography className={classes.balanceText}>Tokens</Typography>
        </Box>
        <Typography className={classes.sectionTitle}>Recieve Tokens</Typography>
        <Divider className={classes.dividerSection} />
        <Typography className={classes.sectionText}>To recieve tokens from a Lifebank you need to provide your user name or show the following QR.</Typography>
        <Box className={classes.boxQR}>
          <QRCode value={profile.account || 'n/a'} size={100} />
          <Typography className={classes.accountText}>{profile.account}</Typography>
        </Box>
        <Typography className={classes.sectionTitle}>Send Tokens</Typography>
        <Divider className={classes.dividerSection} />
        <Typography className={classes.sectionText}>To send tokens to a sponsor you need to enter their username or detect a QR with your camera.</Typography>
        <Box className={classes.boxTexfield}>
          <TextField className={classes.inputText} id="filled-basic" label="Enter sponsor username here." variant="filled" />
          <IconButton aria-label="delete" className={classes.camaraButtonIcon}>
            <CameraAltIcon className={classes.camaraIcon} />
          </IconButton>
        </Box>
        <Box className={classes.boxButtonSendToken}>
          <Button className={classes.sendTokenButton}>SEND TOKEN</Button>
        </Box>

      </Box>
    )
  }

  return (
    <>
      {!isDesktop &&
        <>
          <Fab color="secondary" variant="extended" className={classes.fabButton} onClick={toggleDrawer(anchor, true)} >
            < FavoriteIcon className={classes.iconFab} />
            Donate
          </Fab>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            PaperProps={{ elevation: 0, style: { borderTopLeftRadius: "20px", borderTopRightRadius: "20px", padding: "16px" } }}
          >
            <DashboardContent />
          </SwipeableDrawer>
        </>
      }
      {isDesktop &&
        <>
          <Fab color="secondary" variant="extended" className={classes.fabButtonDesktop} onClick={handleOpen}>
            < FavoriteIcon className={classes.iconFab} />
            Donate
          </Fab>
          <Dialog
            maxWidth={maxWidth}
            open={open}
            onClose={handleOpen}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Box className={classes.dialog}>
              <DashboardContent />
            </Box>
          </Dialog>
        </>

      }
    </>
  )
}

DonationsDashboard.propTypes = {
  isDesktop: PropTypes.bool,
}

export default DonationsDashboard
