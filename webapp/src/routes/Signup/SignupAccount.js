import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import { useTranslation } from 'react-i18next'

import { eosConfig } from '../../config'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxHeight: 400
  },
  boxInfo: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    }
  },
  divider: {
    width: '100%'
  }
}))

const SignupAccount = ({
  data: { transaction_id: transactionId, account } = {}
}) => {
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

      <Box className={classes.rowBox}>
        <Typography variant="h6">{t('signup.transactionId')}</Typography>
        <Typography variant="body1">
          <Link
            href={`${eosConfig.BLOCK_EXPLORER_URL}transaction/${transactionId}`}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            {(transactionId || '').length
              ? `${transactionId.substring(0, 9)}...`
              : ''}
          </Link>
        </Typography>
      </Box>
      <Divider className={classes.divider} />
    </Box>
  )
}

SignupAccount.propTypes = {
  data: PropTypes.object
}

SignupAccount.defaultProps = {}

export default SignupAccount
