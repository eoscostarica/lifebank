import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FilterListIcon from '@material-ui/icons/FilterList';

import { constants } from '../../config'

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

const FilterHome = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [maxWidth] = React.useState('md');
  const [loading, setLoading] = React.useState(true)
  const [valueSponsorCat, setValueSponsorCat] = React.useState('All')
  const [valueOfferCat, setValueOfferCat] = React.useState('All')
  const [valueTokenPrice, setValueTokenPrice] = React.useState('All')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeLoadingFalse = (event) => {
    setLoading(false)
  }

  const handleChangeLoadingTrue = (event) => {
    setLoading(true)
  }

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
    //searchWithFilters()
    //handleClose()
  }

  const searchWithFilters = () => {
    //handleChangeLoadingTrue()
    //getOffers()
  }


  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <FilterListIcon className={classes.iconBottomAppBar} />
      </IconButton>
      <Dialog
        //fullScreen={fullScreen}
        maxWidth={maxWidth}
        className={classes.dialog}
        open={open}
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
}

FilterHome.defaultProps = {
  useButton: false
}

export default FilterHome
