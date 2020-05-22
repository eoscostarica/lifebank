import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0,2)
  },
  textFieldWrapper: {
    height: 190,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textField: {},
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const DonorSignup = ({ onSubmit, setField, user, loading }) => {
  const classes = useStyles()

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <TextField
          id="fullname"
          label="Name"
          fullWidth
          variant="outlined"
          placeholder="Your Full Name"
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('fullname', event.target.value)}
        />
        <TextField
          id="secret"
          label="Secret"
          type="password"
          fullWidth
          placeholder="Your Secret"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
          onChange={(event) => setField('secret', event.target.value)}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Button
          disabled={!user.fullname || !user.secret || loading}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Create Account
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </form>
  )
}

DonorSignup.propTypes = {
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool
}

DonorSignup.defaultProps = {}

export default DonorSignup
