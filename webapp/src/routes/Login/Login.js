import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { LOGIN_MUTATION } from '../../gql'
import { useUser } from '../../context/user.context'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  textFieldWrapper: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginRight: theme.spacing(2)
  },
  btnWrapper: {
    display: 'flex'
  }
}))

const Login = () => {
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const classes = useStyles()
  const history = useHistory()
  const [currentUser, { login }] = useUser()
  const [
    loginMutation,
    { loading, error, data: { login: loginResult } = {} }
  ] = useMutation(LOGIN_MUTATION)

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
  }, [loginResult])

  useEffect(() => {
    if (currentUser) {
      history.replace('/profile')
    }
  }, [currentUser])

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h1">Login</Typography>
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
            <div className={classes.textFieldWrapper}>
              <TextField
                id="account"
                label="Account"
                className={classes.textField}
                onChange={(event) =>
                  handleSetField('account', event.target.value)
                }
              />
              <TextField
                id="secret"
                label="Secret"
                type="password"
                className={classes.textField}
                onChange={(event) =>
                  handleSetField('secret', event.target.value)
                }
              />
            </div>
            <div className={classes.btnWrapper}>
              <Button
                disabled={!user.account || !user.secret || loading}
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Login
              </Button>
              {loading && <CircularProgress />}
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

Login.propTypes = {}

Login.defaultProps = {}

export default Login
