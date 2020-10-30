import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from '../../context/user.context'
import { useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import QRCode from 'qrcode.react'
import QrReader from 'react-qr-scanner'
import { useTranslation } from 'react-i18next'

import { PROFILE_QUERY, TRANSFER_MUTATION } from '../../gql'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
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
    color: '#ffffff'
  },
  fabButtonOffer: {
    position: "absolute",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
    paddingTop: 10,
    bottom: 15,
    right: 20,
    borderRadius: "48px",
    backgroundColor: "#ba0d0d",
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.5",
    textAlign: "center",
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
    color: '#ffffff'
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  iconFab: {
    color: '#ffffff',
    marginRight: 10
  },
  draweTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.5,
    letterSpacing: '0.15px',
    marginBottom: 7
  },
  draweTitleDesktop: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    marginBottom: 7
  },
  dividerTitle: {
    marginBottom: 4
  },
  boxBalance: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  balanceText: {
    color: '#121212',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: 'normal',
    margin: 0
  },
  heart: {
    padding: 0,
    width: '110px',
    fontSize: 275,
    animation: '$heartbeat 1.4s linear infinite',
    [theme.breakpoints.up('md')]: {
      width: '140px'
    }
  },
  sectionTitle: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: '10px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.6,
    letterSpacing: '0.5px',
    marginBottom: 0
  },
  dividerSection: {
    marginBottom: 4,
    color: '#000000'
  },
  sectionText: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: '0.25px',
    marginBottom: 10
  },
  boxQR: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: 20
    }
  },
  accountText: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.5,
    letterSpacing: '0.15',
    margin: 11
  },
  inputText: {
    width: '85%'
  },
  camaraButtonIcon: {
    width: '10%',
    marginTop: 5,
    marginLeft: 10
  },
  camaraIcon: {
    color: '#000000'
  },
  sendTokenButton: {
    backgroundColor: '#ba0d0d',
    borderRadius: 50,
    height: 40,
    width: 140,
    padding: 10,
    color: '#ffffff'
  },
  boxButtonSendToken: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  boxTexfield: {
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: '70%',
      margin: 'auto',
      marginTop: 20
    }
  },
  dialog: {
    padding: 20
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    right: 10,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  switchCamaraButton: {
    backgroundColor: "#ba0d0d",
  },
  switchCamaraIcon: {
    color: '#ffffff'
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
}))

const EmptyHeartSVG = ({ balance }) => {
  const classes = useStyles()
  const textColor = balance ? '#ffffff' : '#000000'

  return (
    <svg viewBox="0 0 800 700" className={classes.heart}>
      <path
        fill="#B71C1C"
        d="M514.672,106.17c-45.701,0-88.395,22.526-114.661,59.024c-26.284-36.505-68.981-59.024-114.683-59.024C207.405,106.17,144,169.564,144,247.5c0,94.381,57.64,144.885,124.387,203.358c38.983,34.149,83.17,72.856,119.654,125.332l12.267,17.641l11.854-17.924c35.312-53.388,78.523-91.695,120.305-128.734C596.006,390.855,656,337.654,656,247.5C656,169.564,592.604,106.17,514.672,106.17z M513.143,425.371c-36.93,32.729-78.27,69.373-113.402,117.391c-35.717-46.873-76.089-82.242-112.148-113.834c-63.944-56.01-114.447-100.26-114.447-181.428c0-61.868,50.325-112.186,112.184-112.186c43.196,0,83.034,25.395,101.491,64.697l13.191,28.105l13.19-28.112c18.443-39.303,58.273-64.69,101.472-64.69c61.866,0,112.185,50.317,112.185,112.186C626.856,324.548,576.673,369.047,513.143,425.371z"
      />
      {balance && (
        <g transform="translate(150, 200)">
          <path
            fill="#B71C1C"
            d="M 10,30 A 25,22 0,0,1 250,10 A 25,20 0,0,1 480,10 Q 550,80 240,360 Q 10,150 10,30 z"
          />
        </g>
      )}
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

EmptyHeartSVG.propTypes = {
  balance: PropTypes.number,
}

const DonationsDashboard = ({ isDesktop, role, isOffer }) => {
  const { t } = useTranslation('translations')
  const [maxWidth] = useState('md')
  const [maxWidthQr] = useState('xs')
  const [open, setOpen] = useState(false)
  const [payload, setPayload] = useState({ quantity: 1, memo: "Token transfer" })
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [openModalQR, setOpenModalQR] = useState(false)
  const [cameraSelection] = useState("rear")
  const [tokens, setTokens] = useState(0)
  const [account, setAccount] = useState("account")
  const classes = useStyles()
  const [state, setState] = useState({
    bottom: false
  })
  const [currentUser] = useUser()
  const history = useHistory()
  const [
    loadProfile,
    { data: { profile: { profile } = {} } = {}, client }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const [
    transfer,
    { loading, error, data: { transfer: transferResult } = {} }
  ] = useMutation(TRANSFER_MUTATION)

  useEffect(() => {
    if (!error)
      return

    setErrorMessage(error.message.replace('GraphQL error: ', ''))
  }, [error])

  useEffect(() => {
    if (!transferResult)
      return

    setPayload({ quantity: 1 })
    setSuccess(true)
  }, [transferResult])

  const handleSetField = (field, value) => setPayload({ ...payload, [field]: value })

  useEffect(() => {
    if (!currentUser) {
      client && client.resetStore()
      history.replace('/')

      return
    }

    if (state.bottom === true || open === true)
      loadProfile()

  }, [currentUser, history, client, loadProfile, state, open, transferResult])

  useEffect(() => {
    setTokens(role === "donor" && profile?.balance.length ? profile.balance.join(',').split(' ')[0] : 0)
    setAccount(profile ? profile.account : "account")
  }, [profile])

  const anchor = 'bottom'

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      )
        return

      setState({ ...state, [anchor]: open })
    }
  }

  const handleOpen = () => setOpen(!open)

  const handleOpenModalQr = () => setOpenModalQR(!openModalQR)

  const succesefulScan = (value) => {
    if (value) {
      setOpenModalQR(false)
      handleSetField('to', value || payload.to)
    }
  }

  const hanndlerTransferTokens = () => {
    setErrorMessage(null)

    if (role === "donor") {
      setPayload({ ...payload, "memo": t("donations.memoDonor") })
    } else {
      setPayload({ ...payload, "memo": t("donations.memoLifebank") })
    }

    transfer({
      variables: {
        ...payload
      }
    })
  }

  const DashboardContent = () => {
    return (
      <>
        {isDesktop && (
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
            {role === "donor" &&
              <Typography className={classes.draweTitleDesktop}>
                {t('donations.donate')}
              </Typography>
            }
            {role === "lifebank" &&
              <Typography className={classes.draweTitleDesktop}>
                {t('donations.transferTokens')}
              </Typography>
            }
            {role === "sponsor" &&
              <Typography className={classes.draweTitleDesktop}>
                {t('donations.claimReward')}
              </Typography>
            }
          </>
        )}
        {!isDesktop && (
          <>
            {role === "donor" &&
              <Typography className={classes.draweTitle}>
                {t('donations.yourDonationsAndRewards')}
              </Typography>
            }
            {role === "lifebank" &&
              <Typography className={classes.draweTitle}>
                {t('donations.transferTokens')}
              </Typography>
            }
            {role === "sponsor" &&
              <Typography className={classes.draweTitle}>
                {t('donations.claimReward')}
              </Typography>
            }
            <Divider className={classes.dividerTitle} />
          </>
        )}
        {role === "donor" &&
          <Box className={classes.boxBalance}>
            <Typography className={classes.balanceText}>
              {t('donations.youOwn')}
            </Typography>
            <EmptyHeartSVG balance={parseInt(tokens)} isDesktop={isDesktop} />
            <Typography className={classes.balanceText}>
              {t('miscellaneous.tokens')}
            </Typography>
          </Box>
        }
        { (role === "donor" || role === "sponsor") &&
          <Box>
            {role === "donor" &&
              <Box>
                <Typography className={classes.sectionTitle}>
                  {t('donations.receiveTokens')}
                </Typography>
                <Divider className={classes.dividerSection} />
                <Typography className={classes.sectionText}>
                  {t('donations.toReceiveTokens')}
                </Typography>
              </Box>
            }
            {role === "sponsor" &&
              <Typography className={classes.sectionText}>
                {t('donations.toReceiveTokensDonor')}
              </Typography>
            }
            <Box className={classes.boxQR}>
              <QRCode value={account} size={100} />
              <Typography className={classes.accountText}>
                {account}
              </Typography>
            </Box>
          </Box>
        }
        { (role === "donor" || role === "lifebank") &&
          <Box>
            {role === "donor" &&
              <Box>
                <Typography className={classes.sectionTitle}>
                  {t('donations.sendTokens')}
                </Typography>
                <Divider className={classes.dividerSection} />
                <Typography className={classes.sectionText}>
                  {t('donations.toSendTo')}
                </Typography>
              </Box>
            }
            {role === "lifebank" &&
              <Typography className={classes.sectionText}>
                {t('donations.toSendToDonor')}
              </Typography>
            }
            <Box className={classes.boxTexfield}>
              <form autoComplete="off">
                <TextField
                  autoFocus
                  className={classes.inputText}
                  id="filled-basic"
                  label={t('donations.enterSponsorUsername')}
                  variant="filled"
                  value={payload.to || ''}
                  onChange={(event) =>
                    handleSetField('to', event.target.value)
                  }
                />
                <QrReaderModal />
              </form>
            </Box>
            {errorMessage && (
              <Alert
                className={classes.alert}
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setErrorMessage(null)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {errorMessage}
              </Alert>
            )}
            {success && transferResult && (
              <Alert
                className={classes.alert}
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setSuccess(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {t('donations.succesful')}
              </Alert>
            )}
            <Box className={classes.boxButtonSendToken}>
              <Button className={classes.sendTokenButton} variant="contained" color="secondary"
                onClick={hanndlerTransferTokens}
                disabled={
                  !payload.to ||
                  !payload.quantity ||
                  !payload.memo ||
                  loading
                }
              >
                {t('donations.sendToken')}
              </Button>
            </Box>
          </Box>
        }
      </>
    )
  }

  const QrReaderModal = () => {
    return (
      <>
        <IconButton aria-label="delete" className={classes.camaraButtonIcon} onClick={handleOpenModalQr}>
          <CameraAltIcon className={classes.camaraIcon} />
        </IconButton>
        <Dialog
          maxWidth={maxWidthQr}
          open={openModalQR}
          onClose={handleOpenModalQr}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Box className={classes.dialog}>
            <Box className={classes.closeIcon}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleOpenModalQr}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Typography className={classes.draweTitleDesktop}>
              {t('donations.scanQR')}
            </Typography>
            {cameraSelection &&
              <QrReader
                delay={100}
                onError={() => { }}
                onScan={(value) => { succesefulScan(value) }}
                facingMode={cameraSelection}
                style={{
                  height: "auto",
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  backgroundColor: '#ffffff',
                }}
              />
            }
          </Box>
        </Dialog>
      </>
    )
  }

  return (
    <>
      {!isDesktop && (
        <>
          { role === "donor" && !isOffer &&
            <Fab
              color="secondary"
              variant="extended"
              className={classes.fabButton}
              onClick={toggleDrawer(anchor, true)}
            >
              <FavoriteIcon className={classes.iconFab} />
              {t('donations.donate')}
            </Fab>
          }
          { role === "lifebank" && !isOffer &&
            <Fab
              color="secondary"
              variant="extended"
              className={classes.fabButton}
              onClick={toggleDrawer(anchor, true)}
            >
              <FavoriteIcon className={classes.iconFab} />
              {t('donations.transferTokens')}
            </Fab>
          }
          { role === "sponsor" && !isOffer &&
            <Fab
              color="secondary"
              variant="extended"
              className={classes.fabButton}
              onClick={toggleDrawer(anchor, true)}
            >
              <ShoppingCartIcon className={classes.iconFab} />
              {t('donations.claimReward')}
            </Fab>
          }
          {isOffer &&
            <Button className={classes.fabButtonOffer} onClick={toggleDrawer(anchor, true)} >
              {t('tokenTransfer.redeem')}
            </Button>
          }
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            PaperProps={{
              elevation: 0,
              style: {
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                padding: '16px'
              }
            }}
          >
            <DashboardContent />
          </SwipeableDrawer>
        </>
      )}
      {isDesktop &&
        <>
          {
            role === "donor" && !isOffer &&
            <Fab
              color="secondary"
              variant="extended"
              className={classes.fabButtonDesktop}
              onClick={handleOpen}
            >
              <FavoriteIcon className={classes.iconFab} />
              {t('donations.donate')}
            </Fab>
          }
          {
            role === "lifebank" && !isOffer &&
            <Fab
              color="secondary"
              variant="extended"
              className={classes.fabButtonDesktop}
              onClick={handleOpen}
            >
              <FavoriteIcon className={classes.iconFab} />
              {t('donations.transferTokens')}
            </Fab>
          }
          {
            role === "sponsor" && !isOffer &&
            <Fab
              color="secondary"
              variant="extended"
              className={classes.fabButtonDesktop}
              onClick={handleOpen}
            >
              <ShoppingCartIcon className={classes.iconFab} />
              {t('donations.claimReward')}
            </Fab>
          }
          {isOffer &&
            <Button variant="contained" color="secondary" className={classes.fabButtonOffer} onClick={handleOpen}>
              {t('tokenTransfer.redeem')}
            </Button>
          }
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

DonationsDashboard.defaultProps = {
  isOffer: false,
}

DonationsDashboard.propTypes = {
  isDesktop: PropTypes.bool,
  isOffer: PropTypes.bool,
  role: PropTypes.string,
}

export default DonationsDashboard
