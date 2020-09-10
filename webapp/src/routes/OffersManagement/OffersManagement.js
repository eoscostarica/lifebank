import React, { useState, useEffect } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
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

import {
  GET_SPONSOR_OFFERS_QUERY,
  UPDATE_OFFER_AVAILABILITY_MUTATION,
  DELETE_OFFER_MUTATION
} from '../../gql'
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
  'Offer name',
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
  const [openSnackbar, setOpenSnackbar] = useState({
    show: false,
    message: '',
    severity: 'success'
  })

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

  const [
    updateOffer,
    { data: { update_offer: updateOfferResult } = {} }
  ] = useMutation(UPDATE_OFFER_AVAILABILITY_MUTATION)

  const [deleteOffer] = useMutation(DELETE_OFFER_MUTATION)

  const handleActionClick = async (action, active, offer_id) => {
    switch (action) {
      case 'delete':
        await deleteOffer({
          variables: {
            id: offer_id
          }
        })
        setOffers(offers.filter((offer) => offer.id !== offer_id))
        break
      case 'deactivate':
        await updateOffer({
          variables: {
            id: offer_id,
            active: !active
          }
        })
        break
      case 'activate':
        await updateOffer({
          variables: {
            id: offer_id,
            active: !active
          }
        })
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (updateOfferResult) {
      const newArr = [...offers]
      const indexToUpdate = offers.findIndex(
        (o) => o.id === updateOfferResult.returning[0].id
      )
      newArr[indexToUpdate].active = !newArr[indexToUpdate].active
      setOffers(newArr)

      setOpenSnackbar({
        show: true,
        message: 'Offer availability updated successfully',
        severity: 'success'
      })
    }
  }, [updateOfferResult])

  const Actions = (active, offer_id) => (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="actions-selection-label">Action</InputLabel>
      <Select
        onClick={(e) => handleActionClick(e.target.value, active, offer_id)}
        labelId="actions-selection"
        id="action-select"
      >
        <MenuItem value="edit">Edit</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value={(active ? 'deactivate' : 'activate') || true}>
          {active ? 'Deactivate' : 'Activate'}
        </MenuItem>
      </Select>
    </FormControl>
  )

  const handleOpenClick = (offer) => {
    setOpen(true)
    setClickedOffer(offer)
  }

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={11}>
        {offers && (
          <MUIDataTable
            title="All registered offers"
            data={offers.map((offer, key) => [
              offer.offer_name,
              offer.start_date
                ? m(offer.start_date).tz(timezone).format('DD-MM-YYYY')
                : 'No provided date',
              offer.end_date
                ? m(offer.end_date).tz(timezone).format('DD-MM-YYYY')
                : 'No provided date',
              offer.active ? 'Active' : 'Inactive',
              Actions(offer.active, offer.id),
              <IconButton
                key={key}
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
      <Snackbar
        open={openSnackbar.show}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </Grid>
  )
}

export default OffersManagement
