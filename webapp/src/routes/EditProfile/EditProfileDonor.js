import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  labelBtn: {
    color: theme.palette.white
  },
  noCapitalize: {
    textTransform: 'none !important'
  },
  routerLink: {
    width: "100%",
    textDecoration: "none",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  saveBtn: {
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
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
  },
  cancelBtn: {
    borderRadius: '50px',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '1px',
    textAlign: 'center',
    padding: '12px',
    border: 'solid 1px rgba(0, 0, 0, 0.54)',
    backgroundColor: '#ffffff',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
  },
}))

const EditProfileDonor = ({ profile, onSubmit, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [user, setUser] = useState({
    name: profile.name || '',
    email: profile.email || ''
  })

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        {console.log(user)}
        <TextField
          id="email"
          label={t('signup.name')}
          fullWidth
          placeholder={t('signup.namePlaceholder')}
          defaultValue={user.name}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleSetField('name', event.target.value)}
          className={classes.textField}
        />
      </Box>
      <Typography variant="body1">{t('about.weDontRequest')}</Typography>
      <Box className={classes.btnWrapper}>
        <Link to="/profile" className={classes.routerLink}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.cancelBtn}
          >
            {t('common.cancel')}
          </Button>
        </Link>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onSubmit(user)}
          className={classes.saveBtn}
        >
          {t('common.save')}
        </Button>
        {loading && <CircularProgress />}
      </Box>

    </form>
  )
}

EditProfileDonor.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileDonor
