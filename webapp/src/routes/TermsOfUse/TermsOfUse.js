import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useQuery } from '@apollo/react-hooks'
import Box from '@material-ui/core/Box'

import RicardianContract from '../../components/RicardianContract'
import { GET_ABI_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '95vh',
    overflow: 'scroll',
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
    }
  }
}))

const TermsOfUse = () => {
  const classes = useStyles()
  const { data: { get_abi: { abi } = {} } = {} } = useQuery(GET_ABI_QUERY, {
    variables: { contract: 'consent2life' }
  })

  return (
    <Box className={classes.wrapper}>
      <RicardianContract abi={abi} action="consent" />
    </Box>
  )
}

export default TermsOfUse
