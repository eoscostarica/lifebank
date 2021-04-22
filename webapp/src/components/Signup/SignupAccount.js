import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import { useTranslation } from 'react-i18next'

import { eosConfig } from '../../config'
import styles from './styles'

const useStyles = makeStyles(styles)

const SignupAccount = ({ account }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.boxInfo}>
      <Box className={classes.rowBox}>
        <Typography variant="h6">{t('common.account')}</Typography>
        <Typography variant="body1">
          <Link
            href={`${eosConfig.BLOCK_EXPLORER_URL}account/${account}`}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            {account}
          </Link>
        </Typography>
      </Box>
      <Divider className={classes.divider} />
    </Box>
  )
}

SignupAccount.propTypes = {
  account: PropTypes.string
}

SignupAccount.defaultProps = {}

export default SignupAccount
