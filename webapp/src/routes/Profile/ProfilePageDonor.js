import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import QRCode from 'qrcode.react'
import Link from '@material-ui/core/Link'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'

import { eosConfig } from '../../config'

const useStyles = makeStyles((theme) => ({
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      textTransform: 'capitalize'
    }
  },
  divider: {
    width: '100%'
  },
  editBtn: {
    marginTop: theme.spacing(2)
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2) * -1
  },
  secondaryText: {
    color: `${theme.palette.secondary.main} !important`
  }
}))

const ProfilePageDonor = ({ profile, onConsentChange, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.account')}</Typography>
        <Typography variant="body1">
          <Link
            href={`${eosConfig.BLOCK_EXPLORER_URL}account/${profile.account}`}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            {profile.account}
          </Link>
        </Typography>
      </Box>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.email')}</Typography>
        <Typography variant="body1">{profile.email || 'N/A'}</Typography>
      </Box>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('signup.name')}</Typography>
        <Typography variant="body1">{profile.name || 'N/A'}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('profile.role')}</Typography>
        <Typography variant="body1">{profile.role}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('miscellaneous.communities')}
        </Typography>
        <Typography variant="body1">
          {(profile.communities || []).join(', ') || 'N/A'}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('profile.consentStatus')}
        </Typography>
        <FormGroup row className={classes.formGroup}>
          {!loading && (
            <FormControlLabel
              control={
                <Switch
                  name="checkedB"
                  color="primary"
                  checked={profile.consent || false}
                  onChange={onConsentChange}
                />
              }
              label={profile.consent ? 'Granted' : 'Revoked'}
            />
          )}
          {loading && <CircularProgress size={16} />}
        </FormGroup>
      </Box>
      <Divider className={classes.divider} />
      <Box height={30} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('miscellaneous.tokens')}</Typography>
        <Link
          href={`${eosConfig.BLOCK_EXPLORER_URL}account/lifebankcoin?loadContract=true&tab=Tables&table=accounts&account=lifebankcoin&scope=${profile.account}&limit=100`}
          target="_blank"
          rel="noopener"
          color="secondary"
        >
          <Typography variant="body1" className={classes.secondaryText}>
            {(profile.balance || []).join(', ')}
          </Typography>
        </Link>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('miscellaneous.redeemed')}
        </Typography>
        <Typography variant="body1">0</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('miscellaneous.expired')}
        </Typography>
        <Typography variant="body1">0</Typography>
      </Box>
      <Divider className={classes.divider} />
      <QRCode value={profile.account || 'n/a'} size={200} />
      <LinkRouter to="/edit-profile" className={classes.editBtn}>
        <Button variant="contained" color="primary">
          {t('common.edit')}
        </Button>
      </LinkRouter>
    </>
  )
}

ProfilePageDonor.propTypes = {
  profile: PropTypes.object,
  onConsentChange: PropTypes.func,
  loading: PropTypes.bool
}

export default ProfilePageDonor
