import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import CloseIcon from '@material-ui/icons/Close'
import FilterListIcon from '@material-ui/icons/FilterList'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { useTranslation } from 'react-i18next'

import { constants } from '../../config'

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    right: 1,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: theme.palette.secondary.main
    }
  },
  title: {
    height: '50px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15
  },
  buttonMapDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  buttonIconDesktop: {
    padding: 20,
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))

const { SPONSOR_TYPES } = constants
const sponsorsCategories = ['All'].concat(SPONSOR_TYPES)
const tokenPrices = ['All', '1', '2', '3', '4', '5']

const FilterHome = ({ isDesktop, applyFilters }) => {
  const { t } = useTranslation('translations')
  const offerCategories = [
    t('miscellaneous.all'),
    t('offersManagement.discount'),
    t('offersManagement.gift'),
    t('offersManagement.benefit'),
    t('offersManagement.other')
  ]
  const classes = useStyles()
  const [maxWidth] = useState('md')
  const [openDialogFilter, setOpenDialogFilter] = useState(false)
  const [valueSponsorCat, setValueSponsorCat] = useState('All')
  const [valueOfferCat, setValueOfferCat] = useState('All')
  const [valueTokenPrice, setValueTokenPrice] = useState('All')

  const handleApplyFilters = () => {
    setOpenDialogFilter(false)
    applyFilters(valueSponsorCat, valueOfferCat, valueTokenPrice)
  }

  return (
    <>
      {isDesktop && (
        <Button
          onClick={() => setOpenDialogFilter(true)}
          className={classes.buttonIconDesktop}
          startIcon={<FilterListIcon />}
        >
          {t('contentToolbar.filters')}
        </Button>
      )}
      {!isDesktop && (
        <IconButton onClick={() => setOpenDialogFilter(true)}>
          <FilterListIcon className={classes.iconBottomAppBar} />
        </IconButton>
      )}
      <Dialog
        maxWidth={maxWidth}
        className={classes.dialog}
        open={openDialogFilter}
        onClose={() => setOpenDialogFilter(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <Box className={classes.closeIcon}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpenDialogFilter(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          Filter offers, lifebanks or sponsors
        </DialogTitle>
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
              onChange={(event) => setValueSponsorCat(event.target.value)}
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
              onChange={(event) => setValueOfferCat(event.target.value)}
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
              onChange={(event) => setValueTokenPrice(event.target.value)}
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
              onClick={handleApplyFilters}
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
  isDesktop: PropTypes.bool,
  applyFilters: PropTypes.func
}

export default FilterHome
