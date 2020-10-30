import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useQuery } from '@apollo/react-hooks'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import RicardianContract from '../../components/RicardianContract'
import { GET_CONTRACTS_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  tabsWrapper: {
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down('sm')]: {
      '& button': {
        width: '33.3vw'
      }
    }
  },
  wrapper: {
    minHeight:'100vh',
    height: '95vh',
    padding: theme.spacing(2, 1, 0, 1),
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
    '& h1, & h2': {
      textTransform: 'capitalize',
      margin: 0
    },
    '& p a': {
      wordBreak: 'break-all'
    }
  }
}))

const TermsOfUse = () => {
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
        className={classes.tabsWrapper}
      >
        <Tab label="lifebankcoin" />
        <Tab label="lifebankcode" />
        <Tab label="consent2life" />
      </Tabs>
      {tab === 0 && lifebankcoin && (
        <Box className={classes.wrapper}>
          <RicardianContract
            name={lifebankcoin.name}
            hash={lifebankcoin.hash}
            abi={lifebankcoin.abi}
          />
        </Box>
      )}
      {tab === 1 && lifebankcode && (
        <Box className={classes.wrapper}>
          <RicardianContract
            name={lifebankcode.name}
            hash={lifebankcode.hash}
            abi={lifebankcode.abi}
          />
        </Box>
      )}
      {tab === 2 && consent2life && (
        <Box className={classes.wrapper}>
          <RicardianContract
            name={consent2life.name}
            hash={consent2life.hash}
            abi={consent2life.abi}
          />
        </Box>
      )}
    </>
  )
}

export default TermsOfUse
