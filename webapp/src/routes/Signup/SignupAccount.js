import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxHeight: 400
  }
}))

const SignupAccount = ({
  data: { transaction_id: transactionId, account } = {}
}) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h4" className={classes.marginTop}>
        Account
      </Typography>
      <Typography variant="body1">
        <Link
          href={`https://jungle.bloks.io/account/${account}`}
          target="_blank"
          rel="noopener"
          color="secondary"
        >
          {account}
        </Link>
      </Typography>
      <Typography variant="h4" className={classes.marginTop}>
        Transaction Id
      </Typography>
      <Typography variant="body1">
        <Link
          href={`https://jungle.bloks.io/transaction/${transactionId}`}
          target="_blank"
          rel="noopener"
          color="secondary"
        >
          {transactionId}
        </Link>
      </Typography>
    </>
  )
}

SignupAccount.propTypes = {
  data: PropTypes.object
}

SignupAccount.defaultProps = {}

export default SignupAccount
