import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import {
  LOGIN_MUTATION,
  VALIDATE_EMAIL,
  GET_SECRET_BY_ACCOUNT
} from '../../gql'
import { useUser } from '../../context/user.context'
import LoginWithFacebook from './LoginWithFacebook'
import LoginWithGoogle from './LoginWithGoogle'

const rows = [
  {
    account: 'lifebankcare',
    secrect: 'plasma2020',
    role: 'LIFE_BANK'
  },
  {
    account: 'spotavernjan',
    secrect: 'plasma2020',
    role: 'SPONSOR'
  },
  {
    account: 'spohudsonmkt',
    secrect: 'plasma2020',
    role: 'SPONSOR'
  },
  {
    account: 'spowashonjan',
    secrect: 'plasma2020',
    role: 'SPONSOR'
  },
  {
    account: 'donadri12345',
    secrect: 'plasma2020',
    role: 'DONOR'
  }
]

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '80%',
    width: 350,
    outlineWidth: 0
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  textFieldWrapper: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    justifyContent: 'space-evenly'
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  btnWrapper: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  btnLogin: {
    borderRadius: "4px",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24)",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.14,
    letterSpacing: "1px",
    color: "#121212",
    padding: "10px"
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center'
  },
  labelOption: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(3),
    fontSize: 14
  },
  bodyWrapper: {
    height: '90%',
    overflow: 'scroll',
    padding: theme.spacing(0, 2)
  }
}))

const LoginModal = () => {
  const { t } = useTranslation('translations')
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const classes = useStyles()
  const history = useHistory()
  const [currentUser, { login }] = useUser()
  const [
    loginMutation,
    { loading, error, data: { login: loginResult } = {} }
  ] = useMutation(LOGIN_MUTATION, { fetchPolicy: 'no-cache' })
  const [open, setOpen] = useState(false)

  const { refetch: checkEmail } = useQuery(VALIDATE_EMAIL, {
    variables: {
      email: user.email
    },
    skip: true
  })

  const { refetch: getHash } = useQuery(GET_SECRET_BY_ACCOUNT, {
    variables: {
      email: user.email
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
    const { data } = await getHash({ email: user.account })

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
          setErrorMessage('Invalid account or secret')
        }
      })
    } else {
      setErrorMessage("This account doesn't exist, please sign up")
    }
  }

  const handleLoginWithAuth = async (status, email, secret) => {
    if (status) {
      const { data } = await checkEmail({ email: email })

      if (data.user.length === 1) {
        const bcrypt = require('bcryptjs')
        const { data } = await getHash({ email: email })
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
          }
        })
      } else {
        setErrorMessage("This account doesn't exist, please sign up")
      }
    } else {
      setErrorMessage('Something happened with the authentication')
    }
  }

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message.replace('GraphQL error: ', ''))
    }
  }, [error])

  useEffect(() => {
    if (loginResult) {
      login(loginResult.token)
    }
  }, [loginResult, login])

  useEffect(() => {
    if (currentUser) {
      history.replace('/profile')
    }
  }, [currentUser, history])

  return (
    <>
      <Button className={classes.btnLogin} onClick={handleOpen}>LOGIN</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
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
            <Box className={classes.bodyWrapper}>
              <Typography variant="h3">Sign In</Typography>
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
                <Box className={classes.textFieldWrapper}>
                  <TextField
                    id="account"
                    label="Email"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={(event) =>
                      handleSetField('account', event.target.value)
                    }
                  />
                  <TextField
                    id="secret"
                    label="Password"
                    type="password"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={(event) =>
                      handleSetField('secret', event.target.value)
                    }
                  />
                </Box>
                <Box>
                  <Button
                    className={classes.btnWrapper}
                    disabled={!user.account || !user.secret || loading}
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  {loading && <CircularProgress />}
                  <LoginWithFacebook onSubmit={handleLoginWithAuth} />
                  <LoginWithGoogle onSubmit={handleLoginWithAuth} />
                </Box>
              </form>
              <Typography variant="h3">Demo Credentials</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Account</TableCell>
                      <TableCell>Secrect</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow key={`row-${i}`}>
                        <TableCell component="th" scope="row">
                          {row.account}
                        </TableCell>
                        <TableCell>{row.secrect}</TableCell>
                        <TableCell>{row.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  )
}

LoginModal.propTypes = {
}

export default LoginModal
