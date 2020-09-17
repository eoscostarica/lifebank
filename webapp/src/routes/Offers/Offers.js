
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OpacityIcon from '@material-ui/icons/Opacity';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { constants } from '../../config'
import { GET_OFFERS_QUERY } from '../../gql'


const { SPONSOR_TYPES, OFFER_TYPES } = constants
const sponsorsCategories = ["All"].concat(SPONSOR_TYPES)
const offerCategories = ["All", "Discount", "Gift", "Benefit", "Other"]
const tokenPrices = ["All", "1", "2", "3", "4", "5"];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    padding: theme.spacing(6, 1, 0, 1),
    alignItems: 'center',
    backgroundColor: "white",
    margin: "auto",
    "@media only screen and (max-width: 900px)": {
      width: "100%",
    },
  },
  title: {
    fontSize: 48,
    marginBottom: theme.spacing(4)
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    border: "none",
    marginBottom: 8
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    border: "none"
  },
  iconButton: {
    padding: 10,
  },
  searchContainer: {
    width: "30%",
    margin: "auto",
    marginTop: 10,

    "@media only screen and (max-width: 900px)": {
      width: "100%",
    },
  },
  cardContainer: {
    width: "70%",
    margin: "auto",
    marginTop: 30,
    "@media only screen and (max-width: 900px)": {
      width: "100%",
    },
  },
  card: {
    width: "100%",
  },
  link: {
    textDecoration: 'none'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  tokenPriceBox: {
    display: 'flex',
    color: "#F20833"
  },
  tokenPrice: {
    paddingTop: 3,
    paddingLeft: 5
  },
  modal: {
    position: 'absolute',
    width: 400,
    border: "0px",
    backgroundColor: "#FFF",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: theme.spacing(4)
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15
  },
  infoText: {
    fontSize: 30,
    marginBottom: theme.spacing(4)
  }

}))

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const Offers = () => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(true);
  const [offers, setOffers] = React.useState([]);
  const [searchInput, setSpensearcInput] = React.useState("");
  const [valueSponsorCat, setValueSponsorCat] = React.useState("All");
  const [valueOfferCat, setValueOfferCat] = React.useState("All");
  const [valueTokenPrice, setValueTokenPrice] = React.useState("All");
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = () => {
    searchWithFilters()
    handleClose()
  }

  const searchWithFilters = () => {
    handleChangeLoadingTrue()
    getOffers()
  }

  const { refetch: getAllOffers } = useQuery(GET_OFFERS_QUERY, {
    active: true,
  }, { skip: true })

  const getOffers = async () => {
    const { data } = await getAllOffers({
      active: true,
    })
    let dataTemp = data.offer

    if (searchInput != "") {
      dataTemp = dataTemp.filter(offer => offer.offer_name.toLowerCase().search(searchInput.toLowerCase()) > 0)
    }

    if (valueOfferCat != "All") {
      dataTemp = dataTemp.filter(offer => offer.offer_type.toLowerCase() === valueOfferCat.toLowerCase())
    }

    if (valueSponsorCat != "All") {
      dataTemp = dataTemp.filter(offer => offer.user.location.info.bussines_type.toLowerCase() === valueSponsorCat.toLowerCase())
    }

    /*
    if (valueTokenPrice != "All") {
      dataTemp = dataTemp.filter(offer => offer.price.toLowerCase() === valueTokenPrice.toLowerCase())
    }*/

    setOffers(dataTemp)
    handleChangeLoadingFalse()
  }

  useEffect(() => {
    getOffers()
  }, [getAllOffers])

  const FilterModal = () => {

    return (
      <>
        <IconButton className={classes.iconButton} aria-label="menu" onClick={handleOpen}>
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
                <Typography variant="h3" className={classes.modalTitle}>Filters</Typography>
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
              <Grid item xs={12}><Button variant="contained" color="primary" className={classes.inputStyle} onClick={handleSaveChanges}>Save changes</Button></Grid>
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
      <React.Fragment>
        {loading && <CircularProgress />}
        {!loading && offers.length <= 0 && (
          <Typography variant="h3" className={classes.infoText}>No offer available</Typography>
        )}
        {!loading && offers.length > 0 && offers.map(offer => (
          <OfferCard
            key={offer.id}
            title={offer.offer_name}
            sponsorName={offer.user.name}
            description={offer.description}
            tokenPrice={offer.tokenPrice}
            img={offer.images}
          />
        ))}
      </React.Fragment>
    )
  }

  const OfferCard = (props) => {
    return (
      <Grid container item xs={12} md={3}>
        <Card className={classes.card}>
          <Link className={classes.link} to="/offer/s">
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={props.img}
                title="Offer Image"
              />
              <CardHeader
                title={props.title}
                subheader={props.sponsorName}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{truncateString(props.description)}</Typography>
              </CardContent>
              <CardContent>
                <Box className={classes.tokenPriceBox}>
                  <FavoriteIcon />
                  <Typography className={classes.tokenPrice} variant="body2" color="textSecondary" component="p">{props.tokenPrice}</Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      </Grid>
    )
  }

  return (
    <>
      <Box className={classes.wrapper}>
        <Typography variant="h1" className={classes.title}>Available Offers</Typography>
        <Grid
          className={classes.searchContainer}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid container item xs={12} md={12}>
            <Paper component="form" className={classes.searchBar}>
              <FilterModal />
              <InputBase
                className={classes.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search offers' }}
                value={searchInput}
                onChange={handleChangeSearchInput}
              />
              <IconButton className={classes.iconButton} aria-label="search" onClick={searchWithFilters}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.cardContainer}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <LoadOffers />
        </Grid>
      </Box>
    </>
  )
}

const test = [
  {
    id: "1",
    title: "10% off on reservations",
    sponsorName: "Hotel Caribe",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    tokenPrice: "2",
    img: "https://images.sunwingtravelgroup.com/repo_min/sunwingca/custom/promotions/sliders/default/mobile-en.jpg",
  },
  {
    id: "2",
    title: "10% off on general maintenance",
    sponsorName: "bike store",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    tokenPrice: "1",
    img: "https://www.bicycleretailer.com/sites/default/files/images/article/gallery/02_Giant_Lewisburg_Interior.JPG",
  },
  {
    id: "3",
    title: "15% off on vision test",
    sponsorName: "Vision center",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    tokenPrice: "3",
    img: "https://mujerejecutiva.com.mx/wp-content/uploads/2020/02/ceguera.jpg"
  },
  {
    id: "4",
    title: "5% off on aquatic activities",
    sponsorName: "Hotel Caribe",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    tokenPrice: "2",
    img: "https://images.ctfassets.net/h82kzjd39wa1/1rkQGVMAfRTtg46DdtzbrE/a0f478daaf87e869e31297faeaa1baa0/AllInclusive_Mobile.jpg",
  }
]

export default Offers