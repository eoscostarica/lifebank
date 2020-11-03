import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
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
import { Grid } from '@material-ui/core'

const rows = [
  {
    email: 'lifebank@lifebank.io',
    secrect: 'plasma2020'
  },
  {
    email: 'donor@lifebank.io',
    secrect: 'plasma2020'
  },
  {
    email: 'sponsor@lifebank.io',
    secrect: 'plasma2020'
  }
]

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    right: 1,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  grid: {
    marginTop: 20,
    marginBottom: 20
  },
  btnWrapper: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  title: {
    marginBottom: 30
  },
  demo: {
    marginTop: 20,
    marginBottom: 15
  },
  btnLogin: {
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
  inputStyle: {
    width: '100%',
    marginBottom: 15
  }
}))

const LoginModal = () => {
  const { t } = useTranslation('translations')
  const [maxWidth] = useState('md')
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
      setErrorMessage(t('invalidAccountOrPassword'))
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
          }
        })
      } else {
        setErrorMessage(t('login.accountDoesntExist'))
      }
    } else {
      setErrorMessage(t('login.somethingHappenedWithAuth'))
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
      <Button className={classes.btnLogin} onClick={handleOpen}>
        {t('login.login')}
      </Button>
      <Dialog
        maxWidth={maxWidth}
        className={classes.dialog}
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
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.grid}
        >
          <Grid item xs={10}>
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
            <Typography variant="h3" className={classes.title}>
              Sign In
            </Typography>
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
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) =>
                    handleSetField('account', event.target.value)
                  }
                />
                <TextField
                  id="secret"
                  label={t('signup.password')}
                  type="password"
                  variant="outlined"
                  className={classes.inputStyle}
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
                  {t('login.login')}
                </Button>
                {loading && <CircularProgress />}
                <LoginWithFacebook onSubmit={handleLoginWithAuth} />
                <LoginWithGoogle onSubmit={handleLoginWithAuth} />
              </Box>
            </form>
            <Typography variant="h3" className={classes.demo}>
              {t('login.demoCredentials')}
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('common.email')}</TableCell>
                    <TableCell>{t('signup.password')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={`row-${i}`}>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>{row.secrect}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default LoginModal
