import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import MUIDataTable from 'mui-datatables'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import * as m from 'moment-timezone'
import moment from 'moment'

import { GET_SPONSOR_OFFERS_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1440px',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: 'white'
  },
  formControl: {
    width: '100%'
  }
}))

const columns = ['Offer type', 'Start date', 'End date', 'Actions', 'Details']

const OffersManagement = () => {
  const classes = useStyles()
  const [offers, setOffers] = useState(undefined)
  const timezone = moment.tz.guess()

  const { refetch: getSponsorOffers } = useQuery(GET_SPONSOR_OFFERS_QUERY, {
    variables: {
      sponsor_id: 17
    },
    skip: true
  })

  useEffect(() => {
    const getOffers = async () => {
      const { data } = await getSponsorOffers({
        sponsor_id: 17
      })

      data && setOffers(data.offer)
    }
    getOffers()
  }, [getSponsorOffers])

  const Actions = () => (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Action</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
      >
        <MenuItem value={10}>Edit</MenuItem>
        <MenuItem value={10}>Delete</MenuItem>
      </Select>
    </FormControl>
  )

  const DetailsBtn = () => (
    <IconButton aria-label="delete">
      <MoreHorizIcon />
    </IconButton>
  )

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={11}>
        {offers && (
          <MUIDataTable
            title="All registered offers"
            data={offers.map((offer) => [
              offer.offer_type,
              m(offer.start_date)
                .tz(timezone)
                .format('DD MMMM YYYY, h:mm:ss a z'),
              m(offer.end_date)
                .tz(timezone)
                .format('DD MMMM YYYY, h:mm:ss a z'),
              Actions,
              DetailsBtn
            ])}
            columns={columns}
          />
        )}
      </Grid>
      <Fab
        size="medium"
        className={classes.fab}
        color="secondary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Grid>
  )
}

export default OffersManagement
