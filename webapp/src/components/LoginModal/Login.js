import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
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
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { LOGIN_MUTATION } from '../../gql'
import { useUser } from '../../context/user.context'

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
    marginBottom: theme.spacing(3)
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

const LoginModal = ({ overrideBoxClass, overrideLabelClass }) => {
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

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const handleLogin = () => {
    setErrorMessage(null)
    loginMutation({
      variables: {
        ...user
      }
    })
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
      <Box
        className={clsx(classes.loginBtn, overrideBoxClass)}
        onClick={handleOpen}
      >
        <FingerprintIcon />
        <Typography
          variant="body1"
          className={clsx(classes.labelOption, overrideLabelClass)}
        >
          {t('login')}
        </Typography>
      </Box>
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
                <Box className={classes.btnWrapper}>
                  <Button
                    disabled={!user.account || !user.secret || loading}
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  {loading && <CircularProgress />}
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
  overrideBoxClass: PropTypes.any,
  overrideLabelClass: PropTypes.any
}

export default LoginModal
