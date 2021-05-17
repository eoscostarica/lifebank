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
import Grid from '@material-ui/core/Grid'
import styles from './styles'

const useStyles = makeStyles(styles)

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
      <Grid container spacing={2} xs={12}>
        <Grid item xs={12}>
          <Typography className={classes.boldText} variant="h2">
            {t('editProfile.editDonorsInformation')}
          </Typography>
          <Typography className={classes.text} variant="body1">
            {t('about.weDontRequest')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            label={t('signup.name')}
            fullWidth
            placeholder={t('editProfile.namePlaceholder')}
            defaultValue={user.name === "undefined" ? '' : user.name}
            variant="filled"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => handleSetField('name', event.target.value)}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </form >
  )
}

EditProfileDonor.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default EditProfileDonor
