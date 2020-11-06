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

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxHeight: 400,
    overflow: 'scroll',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& img': {
      width: 80
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      margin: theme.spacing(1, 0, 2, 0)
    },
    '& div h1, & div h2': {
      textTransform: 'capitalize',
      margin: 0,
      fontSize: '2em'
    },
    '& p a': {
      wordBreak: 'break-all'
    }
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

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
      <div className={classes.wrapper}>
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
      <Box className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={loading}
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
