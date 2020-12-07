import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import FingerprintIcon from '@material-ui/icons/Fingerprint'

import {
  LOGIN_MUTATION,
  VALIDATE_EMAIL,
  GET_SECRET_BY_ACCOUNT,
} from '../../gql'
import { useUser } from '../../context/user.context'
import LoginWithFacebook from './LoginWithFacebook'
import LoginWithGoogle from './LoginWithGoogle'
import Signup from '../Signup/Signup'

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  dialog: {
    paddingTop: "48px",
    paddingLeft: "48px",
    paddingRight: "48px",
    [theme.breakpoints.down('md')]: {
      paddingLeft: "21px",
      paddingRight: "21px",
    }
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "34px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: 15
  },
  subTitle: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 30
  },
  inputStyle: {
    color: "rgba(0, 0, 0, 0.6)",
    width: '100%',
    marginBottom: 15
  },
  formCheckBox: {
    marginBottom: 20
  },
  centerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  registerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  btnLoginModal: {
    borderRadius: '4px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#121212',
    padding: '10px'
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(3),
    fontSize: 14,
    textTransform: 'capitalize'
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  registerBtnSideBar: {
    display: 'flex',
    alignItems: 'center',
  }
}))

const LoginModal = ({ isNavBar, isSideBar }) => {
  const { t } = useTranslation('translations')
  const [maxWidth] = useState('md')
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const [currentUser, { login }] = useUser()
  const [
    loginMutation,
    { loading, error, data: { login: loginResult } = {} }
  ] = useMutation(LOGIN_MUTATION, { fetchPolicy: 'no-cache' })

  const { refetch: checkEmail } = useQuery(VALIDATE_EMAIL, {
    variables: {
      email: user.email
    },
    skip: true
  })

  const { refetch: getHash } = useQuery(GET_SECRET_BY_ACCOUNT, {
    variables: {
      account: user.email
    },
    skip: true
  })

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const handleLogin = async () => {
    setErrorMessage(null)
    const bcrypt = require('bcryptjs')
    const { data } = await getHash({ account: user.account })

    if (data.user.length >= 1) {
      const hash = data.user[0].secret

      bcrypt.compare(user.secret, hash, function (err, res) {
        if (!err && res) {
          setErrorMessage(null)
          loginMutation({
            variables: {
              account: user.account,
              secret: hash
            }
          })
        } else {
          setErrorMessage(t('login.invalidAccountOrPassword'))
        }
      })
    } else {
      setErrorMessage(t('login.invalidAccountOrPassword'))
    }
  }

  const handleLoginWithAuth = async (status, email, secret) => {
    if (status) {
      const { data } = await checkEmail({ email })

      if (data.user.length === 1) {
        const bcrypt = require('bcryptjs')
        const { data } = await getHash({ account: email })
        const hash = data.user[0].secret

        bcrypt.compare(secret, hash, function (err, res) {
          if (!err && res) {
            setErrorMessage(null)
            loginMutation({
              variables: {
                account: email,
                secret: hash
              }
            })
          } else setErrorMessage(t('login.invalidAccountOrPassword'))

        })
      } else setErrorMessage(t('login.accountDoesntExist'))
    } else setErrorMessage(t('login.somethingHappenedWithAuth'))
  }

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message.replace('GraphQL error: ', ''))
    }
  }, [error])

  useEffect(() => {
    if (loginResult) {
      login(loginResult.token)
      setOpen(false)
    }

  }, [loginResult])

  useEffect(() => {
    if (currentUser) {
      setOpen(false)
    }

  }, [currentUser])

  function executeLogin(e) {
    if (e.key === 'Enter' && (user.account && user.secret && !loading)) {
        e.preventDefault()
        handleLogin()
    }
  }

  return (
    <>
      {isNavBar && !currentUser &&
        <Button className={classes.btnLoginModal} onClick={handleOpen}>
          {t('login.login')}
        </Button>
      }
      {isSideBar && !currentUser &&
        <Box
          className={classes.registerBtnSideBar}
          onClick={handleOpen}
        >
          <FingerprintIcon className={classes.iconOption} />
          <Link to="/">
            <Typography
              variant="body1"
              className={classes.labelOption}
            >
              {t('login.login')}
            </Typography>
          </Link>
        </Box>
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
          <Box>
            <Typography className={classes.title}>
              {t('login.letsStarted')}
            </Typography>
            <Typography className={classes.subTitle}>
              {t('login.subtitle')}
            </Typography>
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
          <form autoComplete="off">
            <Box>
              <TextField
                id="account"
                label={t('common.email')}
                variant="outlined"
                className={classes.inputStyle}
                onChange={(event) =>
                  handleSetField('account', event.target.value.toLowerCase().replace(/\s/g, ''))
                }
                onKeyPress={(event) =>
                  executeLogin(event)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="secret"
                label={t('signup.password')}
                type="password"
                variant="outlined"
                className={classes.inputStyle}
                onChange={(event) =>
                  handleSetField('secret', event.target.value)
                }
                onKeyPress={(event) =>
                  executeLogin(event)
                }
              />
            </Box>
            <FormControlLabel
              className={classes.formCheckBox}
              control={
                <Checkbox
                  name="checkLogin"
                />
              }
              label={t('login.loggedIn')}
            />
            <Box className={classes.centerBox}>
              <Button
                id="buttonLogin"
                className={classes.btnLogin}
                disabled={!user.account || !user.secret || loading}
                variant="contained"
                color="secondary"
                onClick={handleLogin}
              >
                {t('login.login')}
              </Button>
            </Box>
            <Box className={classes.centerBox}>
              {loading && <CircularProgress />}
            </Box>
            <Box className={classes.centerBox}>
              <LoginWithFacebook onSubmit={handleLoginWithAuth} />
            </Box>
            <Box className={classes.centerBox}>
              <LoginWithGoogle onSubmit={handleLoginWithAuth} />
            </Box>
          </form>
          <Box className={classes.registerBox}>
            <Signup isModal />
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

LoginModal.propTypes = {
  isNavBar: PropTypes.bool,
  isSideBar: PropTypes.bool,
}

LoginModal.defaultProps = {
  isNavBar: false,
  isSideBar: false
}

export default LoginModal
