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
import OfferDetails from './OfferDetails'
import AddOffer from './AddOffer'

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
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: 'white'
  },
  formControl: {
    width: '100%'
  }
}))

const columns = [
  'Offer type',
  'Start date',
  'End date',
  'Status',
  'Actions',
  'Details'
]

const OffersManagement = () => {
  const classes = useStyles()
  const [offers, setOffers] = useState(undefined)
  const timezone = moment.tz.guess()
  const [open, setOpen] = useState(false)
  const [openAddOffer, setOpenAddOffer] = useState(false)
  const [clickedOffer, setClickedOffer] = useState()

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
  console.log(offers)

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

  const handleOpenClick = (offer) => {
    setOpen(true)
    setClickedOffer(offer)
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={11}>
        {offers && (
          <MUIDataTable
            title="All registered offers"
            data={offers.map((offer) => [
              offer.offer_type,
              offer.start_date
                ? m(offer.start_date).tz(timezone).format('DD-MM-YYYY')
                : 'No provided date',
              offer.end_date
                ? m(offer.end_date).tz(timezone).format('DD-MM-YYYY')
                : 'No provided date',
              offer.active,
              Actions,
              <IconButton
                onClick={() => handleOpenClick(offer)}
                aria-label="delete"
              >
                <MoreHorizIcon />
              </IconButton>
            ])}
            columns={columns}
            options={{
              filter: true,
              print: false,
              selectableRowsHideCheckboxes: true,
              selectableRowsHeader: false,
              download: false
            }}
          />
        )}
        {open ? (
          <OfferDetails offer={clickedOffer} open={open} setOpen={setOpen} />
        ) : null}
      </Grid>
      <Fab
        size="medium"
        className={classes.fab}
        color="secondary"
        aria-label="add"
        onClick={() => setOpenAddOffer(true)}
      >
        <AddIcon />
      </Fab>
      {openAddOffer ? (
        <AddOffer open={openAddOffer} setOpen={setOpenAddOffer} />
      ) : null}
    </Grid>
  )
}

export default OffersManagement
