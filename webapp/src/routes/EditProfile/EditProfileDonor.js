import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  boxBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    '& a': {
      textDecoration: 'none'
    }
  },
  labelBtn: {
    color: theme.palette.white
  },
  noCapitalize: {
    textTransform: 'none !important'
  }
}))

const EditProfileDonor = ({ profile, onSubmit, loading }) => {
  const classes = useStyles()
  const [user, setUser] = useState({
    email: profile.email || ''
  })

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        <TextField
          id="email"
          label="Name"
          fullWidth
          placeholder="Your Name"
          defaultValue={user.email}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('name', event.target.value)}
          className={classes.textField}
        />
        <TextField
          id="email"
          label="Email"
          fullWidth
          placeholder="Your Email"
          defaultValue={user.email}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('email', event.target.value)}
          className={classes.textField}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Box className={classes.boxBtn}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit(user)}
          >
            Save
          </Button>
          <Link to="/profile" className={classes.labelBtn}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.labelBtn}
            >
              cancel
            </Button>
          </Link>
        </Box>
        {loading && <CircularProgress />}
      </Box>
      <Typography variant="body1">
        We don't request or store any personal information on the blockchain.
        You may optionally add a full name and email address once you have
        completed registration.
      </Typography>
    </form>
  )
}

EditProfileDonor.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileDonor
