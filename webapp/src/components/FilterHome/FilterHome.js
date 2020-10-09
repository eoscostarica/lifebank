import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FilterListIcon from '@material-ui/icons/FilterList';

import { constants } from '../../config'
import { GET_OFFERS_QUERY, GET_LOCATIONS_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    right: 1,
    margin: '0',
    height: "5vh",
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  title: {
    height: "50px",
    [theme.breakpoints.down('md')]: {
      marginBottom: 30,
    }
  },
  iconBottomAppBar: {
    color: "#121212"
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15
  },
  infoText: {
    fontSize: 30,
    marginBottom: theme.spacing(4)
  },
}))

const { SPONSOR_TYPES } = constants
const sponsorsCategories = ['All'].concat(SPONSOR_TYPES)
const offerCategories = ['All', 'Discount', 'Gift', 'Benefit', 'Other']
const tokenPrices = ['All', '1', '2', '3', '4', '5']


const FilterHome = ({
  handlerApplyFilterOffer,
  openDialogFilter,
  setOpenDialogFilter,
}) => {

  const classes = useStyles()
  const theme = useTheme();
  const [maxWidth] = useState('md');
  const [cookies, setCookie] = useCookies(['valueSponsorCat', 'valueOfferCat', 'valueTokenPrice']);

  const [valueSponsorCat, setValueSponsorCat] = useState(cookies.valueSponsorCat)
  const [valueOfferCat, setValueOfferCat] = useState(cookies.valueOfferCat)
  const [valueTokenPrice, setValueTokenPrice] = useState(cookies.valueTokenPrice)

  const handleClickOpen = () => {
    setOpenDialogFilter(true);
  };

  const handleClose = () => {
    setOpenDialogFilter(false);
  };

  const handleChangeSponsorsCat = (event) => {
    setValueSponsorCat(event.target.value)

  }

  const handleChangeOfferCat = (event) => {
    setValueOfferCat(event.target.value)

  }

  const handleChangeTokenPrice = (event) => {
    setValueTokenPrice(event.target.value)

  }

  const handleSaveChanges = () => {
    getOffers()
    setCookie('valueSponsorCat', valueSponsorCat, { path: '/' })
    setCookie('valueOfferCat', valueOfferCat, { path: '/' })
    setCookie('valueTokenPrice', valueTokenPrice, { path: '/' })
    handleClose()
  }


  const { refetch: getAllOffers } = useQuery(
    GET_OFFERS_QUERY,
    {
      active: true
    },
    { skip: true }
  )

  const getOffers = async () => {
    const { data } = await getAllOffers({
      active: true
    })
    let dataTemp = data.offer

    /*
    if (searchInput !== '') {
      dataTemp = dataTemp.filter(
        (offer) =>
          offer.offer_name.toLowerCase().search(searchInput.toLowerCase()) > 0
      )
    }*/

    if (valueOfferCat !== 'All') {
      dataTemp = dataTemp.filter(
        (offer) =>
          offer.offer_type.toLowerCase() === valueOfferCat.toLowerCase()
      )
    }

    if (valueSponsorCat !== 'All') {
      dataTemp = dataTemp.filter(
        (offer) =>
          offer.user.location.info.bussines_type.toLowerCase() === valueSponsorCat.toLowerCase()
      )
    }

    if (valueTokenPrice !== 'All') {
      dataTemp = dataTemp.filter(
        (offer) => offer.cost_in_tokens === parseInt(valueTokenPrice)
      )
    }

    handlerApplyFilterOffer(dataTemp)
  }


  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <FilterListIcon className={classes.iconBottomAppBar} />
      </IconButton>
      <Dialog
        maxWidth={maxWidth}
        className={classes.dialog}
        open={openDialogFilter}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box className={classes.closeIcon}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <DialogTitle id="responsive-dialog-title" className={classes.title}>Filter offers, lifebanks or sponsors</DialogTitle>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
        >
          <Grid item xs={10}>
            <TextField
              id="standard-select-currency"
              select
              label="Sponsors categories"
              value={valueSponsorCat}
              onChange={handleChangeSponsorsCat}
              className={classes.inputStyle}
              variant="outlined"
            >
              {sponsorsCategories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="standard-select-currency"
              select
              label="Offers categories"
              value={valueOfferCat}
              onChange={handleChangeOfferCat}
              className={classes.inputStyle}
              variant="outlined"
            >
              {offerCategories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="standard-select-currency"
              select
              label="Token price"
              value={valueTokenPrice}
              onChange={handleChangeTokenPrice}
              className={classes.inputStyle}
              variant="outlined"
            >
              {tokenPrices.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="contained"
              color="primary"
              className={classes.inputStyle}
              onClick={handleSaveChanges}
            >
              Save changes
                </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

FilterHome.propTypes = {
  handlerApplyFilterOffer: PropTypes.func,
  openDialogFilter: PropTypes.bool,
}

FilterHome.defaultProps = {
  openDialogFilter: false,
}

export default FilterHome
