import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
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

const DonorSignup = ({ onSubmit, setField, user, loading }) => {
  const classes = useStyles()

  return (
    <form autoComplete="off">
      <div className={classes.textFieldWrapper}>
        <TextField
          id="fullname"
          label="Fullname"
          className={classes.textField}
          onChange={(event) => setField('fullname', event.target.value)}
        />
        <TextField
          id="secret"
          label="secret"
          type="password"
          className={classes.textField}
          onChange={(event) => setField('secret', event.target.value)}
        />
      </div>
      <div className={classes.btnWrapper}>
        <Button
          disabled={!user.fullname || !user.secret || loading}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Continue
        </Button>
        {loading && <CircularProgress />}
      </div>
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
