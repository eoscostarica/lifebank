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
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MUIDataTable from 'mui-datatables'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as m from 'moment-timezone'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import {
  GET_SPONSOR_OFFERS_QUERY,
  UPDATE_OFFER_AVAILABILITY_MUTATION,
  DELETE_OFFER_MUTATION,
  PROFILE_ID_QUERY
} from '../../gql'

import OfferDetails from './OfferDetails'
import GenericOfferFormComponent from './GenericOfferFormComponent'
import styles from './styles'

const useStyles = makeStyles(styles)

const OffersManagement = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [offers, setOffers] = useState(undefined)
  const [profileIDLoaded, setProfileIDLoaded] = useState(false)
  const [offersLoaded, setOffersLoaded] = useState(false)
  const timezone = moment.tz.guess()
  const [open, setOpen] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [offerIDToDelete, setOfferIDToDelete] = useState()
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

  const checkAvailableFields = () => {
    let pendingFieldsObject = {}
    if (!profile.address)
      pendingFieldsObject = { ...pendingFieldsObject, address: false }

    if (!profile.about)
      pendingFieldsObject = { ...pendingFieldsObject, about: false }

    if (!profile.logo_url)
      pendingFieldsObject = { ...pendingFieldsObject, logo_url: false }

    if (!profile.name)
      pendingFieldsObject = { ...pendingFieldsObject, name: false }

    if (!profile.telephones)
      pendingFieldsObject = { ...pendingFieldsObject, telephones: false }

    if (!profile.photos)
      pendingFieldsObject = { ...pendingFieldsObject, photos: false }

    if (!profile.social_media_links)
      pendingFieldsObject = {
        ...pendingFieldsObject,
        social_media_links: false
      }

    if (!profile.website)
      pendingFieldsObject = { ...pendingFieldsObject, website: false }

    if (!profile.schedule)
      pendingFieldsObject = { ...pendingFieldsObject, schedule: false }

    if (!profile.location)
      pendingFieldsObject = { ...pendingFieldsObject, location: false }

    if (Object.keys(pendingFieldsObject).length > 0) {
      setOpenGenericFormAddVariant(false)
      setOpenSnackbar({
        show: true,
        message: t("offersManagement.info"),
        severity: 'warning'
      })
    } else {
      setOpenGenericFormAddVariant(true)
    }
  }
  const [
    loadProfileID,
    { data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_ID_QUERY, { fetchPolicy: 'network-only' })

  const [
    updateOffer,
    { data: { update_offer: updateOfferResult } = {} }
  ] = useMutation(UPDATE_OFFER_AVAILABILITY_MUTATION)

  const [deleteOffer] = useMutation(DELETE_OFFER_MUTATION)

  const deleteOfferRequest = async () => {
    setOpenDeleteDialog(false)
    await deleteOffer({
      variables: {
        id: offerIDToDelete
      }
    })
    setOffers(offers.filter((offer) => offer.id !== offerIDToDelete))
  }

  const handleActionClick = async (action, active, offer_id) => {
    switch (action) {
      case 'delete':
        setOfferIDToDelete(offer_id)
        setOpenDeleteDialog(true)
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
      <InputLabel id="actions-selection-label">
        {t('offersManagement.action')}
      </InputLabel>
      <Select
        value=""
        onClick={(e) => handleActionClick(e.target.value, active, offer_id)}
        labelId="actions-selection"
        id="action-select"
      >
        <MenuItem value="edit">{t('common.edit')}</MenuItem>
        <MenuItem value="delete">{t('common.delete')}</MenuItem>
        <MenuItem value={active ? 'deactivate' : 'activate'}>
          {active
            ? t('offersManagement.deactivate')
            : t('offersManagement.activate')}
        </MenuItem>
      </Select>
    </FormControl>
  )

  const handleOpenClick = (offer) => {
    setOpen(true)
    setClickedOffer(offer)
  }
  const handleCallback = () => {
    setOpenSnackbar({
      show: true,
      message: t('offersManagement.offerCreation'),
      severity: 'success'
    })
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
        setOffers={setOffers}
        sponsor_id={profile.id}
        isEditing={editing}
        data={data}
        offerNotification={handleCallback}
      />
    )
  }

  useEffect(() => {
    const getOffers = async () => {
      const { data } = await getSponsorOffers({
        sponsor_id: profile.id
      })

      data && setOffers(data.offer)
      setOffersLoaded(true)
    }

    if (profileIDLoaded) getOffers()
  })

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
        message: t('offersManagement.offerAvailabilityUpdatedMessage'),
        severity: 'success'
      })
    }
  }, [updateOfferResult])

  return (
    <Box className={classes.root}>
      {!offersLoaded &&
        <Box className={classes.content}>
          <CircularProgress />
          <Typography className={classes.title} >{t('common.loading')}...</Typography>
        </Box>
      }
      {offersLoaded &&
        <>
          {offers && offers.length > 0 &&
            <Box className={classes.tableContent} >
              <Typography className={classes.title} >{t('offersManagement.offersManagement')}</Typography>
              <MUIDataTable
                title={t('offersManagement.tableTitle')}
                data={offers.map((offer, key) => [
                  offer.offer_name,
                  offer.active
                    ? t('offersManagement.active')
                    : t('offersManagement.inactive'),
                  offer.start_date
                    ? m(offer.start_date).tz(timezone).format('DD-MM-YYYY')
                    : t('offersManagement.noProvidedDate'),
                  offer.end_date
                    ? m(offer.end_date).tz(timezone).format('DD-MM-YYYY')
                    : t('offersManagement.noProvidedDate'),

                  Actions(offer.active, offer.id),
                  <IconButton
                    key={key}
                    onClick={() => handleOpenClick(offer)}
                    aria-label="delete"
                  >
                    <MoreHorizIcon />
                  </IconButton>
                ])}
                columns={[
                  {
                    name: t('offersManagement.offerName'),
                    options: {
                      filter: true,
                    }
                  },
                  {
                    name: t('offersManagement.status'),
                    options: {
                      filter: true,
                    }
                  },
                  {
                    name: t('offersManagement.startDate'),
                    options: {
                      filter: true,
                    }
                  },
                  {
                    name: t('offersManagement.endDate'),
                    options: {
                      filter: true,
                    }
                  },
                  {
                    name: t('offersManagement.actions'),
                    options: {
                      filter: false,
                    }
                  },
                  {
                    name: t('offersManagement.details'),
                    options: {
                      filter: false,
                    }
                  }
                ]}
                options={{
                  print: false,
                  selectableRowsHideCheckboxes: true,
                  selectableRowsHeader: false,
                  download: false,
                }}
              />

            </Box>
          }
          {offers.length === 0 &&
            <Box className={classes.content}>
              <Typography className={classes.title}>
                {t('offersManagement.youHaveNoAddedOffers')}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btnAction}
                onClick={checkAvailableFields}
              >
                {t('offersManagement.addOffer')}
              </Button>
            </Box>
          }
        </>
      }
      {open &&
        <OfferDetails offer={clickedOffer} open={open} setOpen={setOpen} />
      }
      <Fab
        size="medium"
        className={classes.fab}
        color="secondary"
        aria-label="add"
        onClick={checkAvailableFields}
      >
        <AddIcon />
      </Fab>
      {openGenericFormAddVariant && profileIDLoaded &&
        getGenericOfferComponent(false, undefined)
      }
      {offerToEdit &&
        getGenericOfferComponent(true, offerToEdit)
      }
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title">
        <DialogTitle id="delete-dialog-title">
          {t('offersManagement.deleteOfferConfirmation')}
        </DialogTitle>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setOpenDeleteDialog(false)}
            color="primary"
          >
            {t('common.cancel')}
          </Button>
          <Button onClick={deleteOfferRequest} color="primary" autoFocus>
            {t('offersManagement.yesDeleteIt')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar.show}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default OffersManagement
