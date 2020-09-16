import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import MUIDataTable from 'mui-datatables'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import * as m from 'moment-timezone'
import moment from 'moment'

import {
  GET_SPONSOR_OFFERS_QUERY,
  UPDATE_OFFER_AVAILABILITY_MUTATION,
  DELETE_OFFER_MUTATION,
  PROFILE_ID_QUERY
} from '../../gql'

import OfferDetails from './OfferDetails'
import GenericOfferFormComponent from './GenericOfferFormComponent'

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
  const [profileIDLoaded, setProfileIDLoaded] = useState(false)
  const [offersLoaded, setOffersLoaded] = useState(false)
  const timezone = moment.tz.guess()
  const [open, setOpen] = useState(false)
  const [offerToEdit, setOfferToEdit] = useState()
  const [openGenericFormAddVariant, setOpenGenericFormAddVariant] = useState(
    false
  )
  const [openGenericFormEditVariant, setOpenGenericFormEditVariant] = useState(
    false
  )
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

  const [
    loadProfileID,
    { data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_ID_QUERY, { fetchPolicy: 'network-only' })

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
      case 'edit':
        setOpenGenericFormEditVariant(true)
        setOfferToEdit(offers.find((o) => o.id === offer_id))
        break
      default:
        break
    }
  }

  const Actions = (active, offer_id) => (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="actions-selection-label">Action</InputLabel>
      <Select
        value=""
        onClick={(e) => handleActionClick(e.target.value, active, offer_id)}
        labelId="actions-selection"
        id="action-select"
      >
        <MenuItem value="edit">Edit</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value={active ? 'deactivate' : 'activate'}>
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
    if (reason === 'clickaway') return

    setOpenSnackbar({ ...openSnackbar, show: false })
  }

  const getGenericOfferComponent = (editing, data) => {
    return (
      <GenericOfferFormComponent
        open={editing ? openGenericFormEditVariant : openGenericFormAddVariant}
        setOpen={
          editing ? setOpenGenericFormEditVariant : setOpenGenericFormAddVariant
        }
        sponsor_id={profile.id}
        isEditing={editing}
        data={data}
      />
    )
  }

  useEffect(() => {
    const getOffers = async () => {
      const { data } = await getSponsorOffers({
        sponsor_id: 17
      })

      data && setOffers(data.offer)
      setOffersLoaded(true)
    }

    if (profileIDLoaded) getOffers()
  }, [getSponsorOffers, profileIDLoaded])

  useEffect(() => {
    loadProfileID()
  }, [loadProfileID])

  useEffect(() => {
    if (profile) setProfileIDLoaded(true)
  }, [profile])

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

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={11}>
        {!offersLoaded ? (
          <Box
            display="flex"
            justifyContent="center"
            height="100vh"
            alignItems="center"
          >
            <Typography variant="h3">Loading...</Typography>
          </Box>
        ) : (
          <>
            {offers && offers.length > 0 ? (
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
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                height="100vh"
                alignItems="center"
              >
                <Typography variant="h3">
                  You have no added offers...
                </Typography>
              </Box>
            )}
          </>
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
        onClick={() => setOpenGenericFormAddVariant(true)}
      >
        <AddIcon />
      </Fab>
      {openGenericFormAddVariant && profileIDLoaded
        ? getGenericOfferComponent(false, undefined)
        : null}
      {offerToEdit ? getGenericOfferComponent(true, offerToEdit) : null}
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
