import React, { useState, useEffect, forwardRef } from 'react'
import { useMutation, useLazyQuery, useSubscription } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import QRCode from 'qrcode.react'
import QrReader from 'react-qr-scanner'
import { useTranslation } from 'react-i18next'
import Snackbar from '@material-ui/core/Snackbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos'
import Drawer from '@material-ui/core/Drawer'

import { PROFILE_QUERY, TRANSFER_MUTATION, TOKEN_SUBSCRIPTION } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

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

const DonationsDashboard = ({ isDesktop, currentUser, isOffer }) => {
  const { t } = useTranslation('translations')
  const [maxWidth] = useState('md')
  const [maxWidthQr] = useState('xs')
  const [open, setOpen] = useState(false)
  const [accountTo, setAccountTo] = useState()
  const [openModalQR, setOpenModalQR] = useState(false)
  const [scanValue, setScanValue] = useState()
  const [tokens, setTokens] = useState(0)
  const [role] = useState(currentUser.role)
  const [account] = useState(currentUser.account)
  const classes = useStyles()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [state, setState] = useState({
    bottom: false
  })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(370))
  const history = useHistory()
  const [
    loadProfile,
    { error: errroLoadProfile, data: { profile: { profile } = {} } = {}, client }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const [
    transfer,
    { loading, error, data: { transfer: transferResult } = {} }
  ] = useMutation(TRANSFER_MUTATION)

  const { data: tokenUser = {} } = useSubscription(
    TOKEN_SUBSCRIPTION, { variables: { account } }
  )

  const handleSnackbarClose = () => {
    setOpenSnackbar({ ...openSnackbar, show: false })
    setAccountTo()
  }

  useEffect(() => {
    if (!error)
      return

    setOpenSnackbar({
      show: true,
      message: t('donations.donationsError'),
      severity: 'error'
    })
  }, [error])

  useEffect(() => {
    if (errroLoadProfile) {
      handleOpen()
      setOpenSnackbar({
        show: true,
        message: t('donations.donationsProfileError'),
        severity: 'error'
      })
    }

  }, [errroLoadProfile])

  useEffect(() => {
    if (!transferResult)
      return

    setOpenSnackbar({
      show: true,
      message: t('donations.succesful'),
      severity: 'success'
    })
  }, [transferResult])

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
    if (tokenUser.user) {
      setTokens(parseInt(tokenUser.user[0].token))
    } else {
      setTokens(role === "donor" && profile?.balance.length ? profile.balance.join(',').split(' ')[0] : 0)
    }
  }, [profile, tokenUser])

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

  const hanndlerTransferTokens = (account) => {
    setAccountTo(account)
  }

  useEffect(() => {
    if (accountTo) {
      let tempMemo
      if (role === "donor") tempMemo = t("donations.memoDonor")
      else tempMemo = t("donations.memoLifebank")

      const payload = { to: accountTo.toLowerCase().replace(/\s/g, ''), memo: tempMemo, quantity: 1 }
      transfer({
        variables: {
          ...payload
        }
      })
    }
  }, [accountTo])


  const DashboardContent = () => {
    const [accountInput, setAccountInput] = useState("")

    const handleChangeAccountInput = (event) => {
      setAccountInput(event.target.value)
    }
    useEffect(() => {
      if (scanValue) setAccountInput(scanValue)

    }, [scanValue])

    return (
      <Box className={classes.dashboardContent}>
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
            <Box className={classes.closeIcon}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={toggleDrawer(anchor, false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
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
                  className={classes.inputText}
                  id="paylod-account"
                  label={role === "lifebank" ? t('donations.enterDonorUsername') : t('donations.enterSponsorUsername')}
                  variant="filled"
                  value={accountInput}
                  onChange={handleChangeAccountInput}
                />
                <QrReaderModal setAccountInput={setAccountInput} />
              </form>
            </Box>
            <Box className={classes.boxButtonSendToken}>
              {loading &&
                <>
                  <CircularProgress />
                  <br />
                  <br />
                </>
              }
              <Button className={classes.sendTokenButton} variant="contained" color="secondary"
                onClick={() => {
                  hanndlerTransferTokens(accountInput)
                }}
                disabled={
                  !accountInput ||
                  loading
                }
              >
                {t('donations.sendToken')}
              </Button>
            </Box>
          </Box>
        }
      </Box>
    )
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const QrReaderModal = () => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [cameraSelection, setCameraSelction] = useState("rear")
    const succesefulScan = (value) => {
      if (value) {
        setOpenModalQR(false)
        setScanValue(value)
      }
    }

    useEffect(() => {
      if (openModalQR) {
        setScanValue("")
      }
    }, [openModalQR])

    const handleChangeCamera = () => {
      if (cameraSelection === "rear") setCameraSelction("front")
      else setCameraSelction("rear")
    }

    return (
      <>
        <IconButton aria-label="delete" className={classes.camaraButtonIcon} onClick={handleOpenModalQr}>
          <CameraAltIcon className={classes.camaraIcon} />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
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
          TransitionComponent={Transition}
        >
          {fullScreen &&
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  className={classes.backIcon}
                  onClick={handleOpenModalQr}
                  aria-label="close"
                >
                  <KeyboardBackspaceIcon />
                </IconButton>
                <Typography variant="h6" className={classes.titleScanQR}>
                  {t('donations.scanQR')}
                </Typography>
                <IconButton
                  className={classes.switchCamaraIcon}
                  onClick={handleChangeCamera}
                  aria-label="close"
                >
                  <FlipCameraIosIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          }
          {!fullScreen &&
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
              <Typography className={classes.titleScanQR}>
                {t('donations.scanQR')}
              </Typography>
            </Box>
          }
          {cameraSelection &&
            <QrReader
              delay={100}
              onError={() => { }}
              onScan={(value) => { succesefulScan(value) }}
              facingMode={cameraSelection}
              style={{
                height: "auto",
                width: "100%",
                backgroundColor: '#ffffff',
              }}
            />
          }
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
              {!isSmallScreen &&
                t('donations.donate')
              }
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
              {!isSmallScreen &&
                t('donations.transferTokens')
              }
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
              {!isSmallScreen &&
                t('donations.claimReward')
              }
            </Fab>
          }
          {isOffer &&
            <Button className={classes.fabButtonOffer} onClick={toggleDrawer(anchor, true)} >
              {t('tokenTransfer.redeem')}
            </Button>
          }
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              elevation: 0,
              style: {
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                padding: '16px',
              }
            }}
          >
            <DashboardContent />
          </Drawer >
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
      <Snackbar open={openSnackbar.show} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

DonationsDashboard.defaultProps = {
  isOffer: false,
}

DonationsDashboard.propTypes = {
  isDesktop: PropTypes.bool,
  isOffer: PropTypes.bool,
  currentUser: PropTypes.object,
}

export default DonationsDashboard