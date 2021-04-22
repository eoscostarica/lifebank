import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'

import { GET_CONTRACTS_QUERY } from '../../gql'
import RicardianContract from '../../components/RicardianContract'
import styles from './styles'

const useStyles = makeStyles(styles)

const SignupConsent = ({ onSubmit, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { data: { lifebankcoin, lifebankcode, consent2life } = {} } = useQuery(
    GET_CONTRACTS_QUERY
  )

  return (
    <>
      <Tabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        aria-label="simple tabs example"
      >
        <Tab label="lifebankcoin" />
        <Tab label="lifebankcode" />
        <Tab label="consent2life" />
      </Tabs>
      <div className={classes.wrapperConsent}>
        {tab === 0 && lifebankcoin && (
          <Box>
            <RicardianContract
              name={lifebankcoin.name}
              hash={lifebankcoin.hash}
              abi={lifebankcoin.abi}
            />
          </Box>
        )}
        {tab === 1 && lifebankcode && (
          <Box>
            <RicardianContract
              name={lifebankcode.name}
              hash={lifebankcode.hash}
              abi={lifebankcode.abi}
            />
          </Box>
        )}
        {tab === 2 && consent2life && (
          <Box>
            <RicardianContract
              name={consent2life.name}
              hash={consent2life.hash}
              abi={consent2life.abi}
            />
          </Box>
        )}
      </div>
      <Box className={classes.btnWrapperConsent}>
        <Button
          variant="contained"
          color="secondary"
          onClick={onSubmit}
          disabled={loading}
          className={classes.btnAccept}
        >
          {t('signup.iAccept')}
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </>
  )
}

SignupConsent.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

SignupConsent.defaultProps = {}

export default SignupConsent
