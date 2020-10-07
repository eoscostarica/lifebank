import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';



import { constants } from '../../config'
import { GET_OFFERS_QUERY } from '../../gql'

const { SPONSOR_TYPES } = constants
const sponsorsCategories = ['All'].concat(SPONSOR_TYPES)
const offerCategories = ['All', 'Discount', 'Gift', 'Benefit', 'Other']
const tokenPrices = ['All', '1', '2', '3', '4', '5']

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
  },
  list: {
    width: "100vw",
  },
  listItem: {
    width: "100%",
    backgroundColor: "white"
  }
  , secondaryIconList: {
    color: "rgba(0, 0, 0, 0.6)",
    width: 20,
    height: 20
  },
  listItemPrimaryText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "0.15px",
  },
  listItemSecondaryText: {
    color: "color: rgba(0, 0, 0, 0.6)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.43,
    letterSpacing: "0.25px",
  },


  modal: {
    position: 'absolute',
    width: 400,
    border: '0px',
    backgroundColor: '#FFF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: theme.spacing(4)
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

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
}

const Offers = () => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(true)
  const [offers, setOffers] = React.useState([])
  const [searchInput, setSpensearcInput] = React.useState('')
  const [valueSponsorCat, setValueSponsorCat] = React.useState('All')
  const [valueOfferCat, setValueOfferCat] = React.useState('All')
  const [valueTokenPrice, setValueTokenPrice] = React.useState('All')
  const [open, setOpen] = React.useState(false)
  const [modalStyle] = React.useState(getModalStyle)

  const handleChangeSearchInput = (event) => {
    setSpensearcInput(event.target.value)
  }

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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSaveChanges = () => {
    searchWithFilters()
    handleClose()
  }

  const searchWithFilters = () => {
    handleChangeLoadingTrue()
    getOffers()
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

    if (searchInput !== '') {
      dataTemp = dataTemp.filter(
        (offer) =>
          offer.offer_name.toLowerCase().search(searchInput.toLowerCase()) > 0
      )
    }

    if (valueOfferCat !== 'All') {
      dataTemp = dataTemp.filter(
        (offer) =>
          offer.offer_type.toLowerCase() === valueOfferCat.toLowerCase()
      )
    }

    if (valueSponsorCat !== 'All') {
      dataTemp = dataTemp.filter(
        (offer) =>
          offer.user.location.info.bussines_type.toLowerCase() ===
          valueSponsorCat.toLowerCase()
      )
    }

    if (valueTokenPrice !== 'All') {
      dataTemp = dataTemp.filter(
        (offer) => offer.cost_in_tokens === parseInt(valueTokenPrice)
      )
    }

    setOffers(dataTemp)
    handleChangeLoadingFalse()
  }

  useEffect(() => {
    getOffers()
  }, [getAllOffers])

  const FilterModal = () => {
    return (
      <>
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          onClick={handleOpen}
        >
          <MenuIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.modal}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={0}
            >
              <Grid item xs={12}>
                <Typography variant="h3" className={classes.modalTitle}>
                  Filters
                </Typography>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
          </div>
        </Modal>
      </>
    )
  }

  const truncateString = (str) => {
    const num = 150

    if (str.length <= num) {
      return str
    }

    return str.slice(0, num) + '...'
  }

  const LoadOffers = () => {
    return (
      <>
        {loading &&
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>

        }
        {!loading && offers.length <= 0 && (
          <ListItem className={classes.listItem} >
            <ListItemText
              primary={
                <Typography className={classes.listItemPrimaryText} noWrap variant="body2">No offers available</Typography>
              }
            />
          </ListItem>
        )}
        {!loading && offers.length > 0 && offers.map(offer => (
          <OfferItem
            key={offer.id}
            id={offer.id}
            title={offer.offer_name}
            description={offer.description}
            img={offer.images}
          />
        ))}
      </>
    )
  }

  const OfferItem = (props) => {
    //const LinkTo = "/offer/" + props.id

    return (
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar src={props.img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.listItemPrimaryText} noWrap variant="body2">{props.title}</Typography>
          }
          secondary={
            <Typography className={classes.listItemSecondaryText} noWrap variant="body2">{props.description}</Typography>
          }
        />
        <ListItemSecondaryAction>
          <LocalOfferIcon className={classes.secondaryIconList} />
        </ListItemSecondaryAction>
      </ListItem>

    )
  }

  OfferItem.propTypes = {
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }

  return (
    <List className={classes.list} >
      <LoadOffers />
    </List>

  )
}

export default Offers
