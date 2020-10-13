import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CustomRouterLink from '../../components/CustomRouterLink'
import AppBar from '@material-ui/core/AppBar';
import { useUser } from '../../context/user.context'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close'
import FilterListIcon from '@material-ui/icons/FilterList';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MapModal from '../../components/MapModal'
import ShowOffers from './ShowOffers';
import ShowLifebanks from './ShowLifebanks';
import ShowSponsors from './ShowSponsors';
import mobileBgImage from '../../assets/the-world.png'
import bgImage from '../../assets/lifebank-hero-bg.png'

import { constants } from '../../config'
import { GET_OFFERS_QUERY, GET_LOCATIONS_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  homeHeader: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex',
    backgroundImage: `url(${mobileBgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.up('md')]: {
      height: 578,
      backgroundImage: `url(${bgImage})`,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  boxLeft: {
    width: '60%',
    paddingTop: theme.spacing(2),
    '& h1': {
      color: theme.palette.white,
      letterSpacing: '1px',
      marginLeft: theme.spacing(1)
    },
    '& h5': {
      color: theme.palette.secondary.main,
      letterSpacing: '0.25px',
      fontSize: 18,
      fontWeight: 500
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      paddingTop: theme.spacing(8),
      '& h1': {
        fontSize: 72,
        lineHeight: 0.68,
        textShadow: `0 2px 10px ${theme.palette.primary.mediumEmphasizedBlackText}`
      }
    }
  },
  boxRight: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: theme.spacing(5, 1, 0, 0),
    '& p': {
      color: theme.palette.white,
      textAlign: 'end',
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: '0.5px',
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      alignItems: 'center',
      padding: theme.spacing(8, 1, 0, 0),
      '& p': {
        lineHeight: 1.22,
        letterSpacing: '1px',
        fontSize: 32,
        textShadow: `0 2px 10px ${theme.palette.primary.mediumEmphasizedBlackText}`
      }
    }
  },
  registerBtn: {
    width: 180,
    height: 49,
    backgroundColor: "transparent",
    margin: theme.spacing(2, 0, 4, 0),
    borderRadius: " 2px",
    border: "solid 2px #ffffff"

  },
  appBarTab: {
    backgroundColor: "#ffffff",
    boxShadow: 'none',
  },
  tabs: {
    color: "#121212",
    backgroundColor: "ffffff"
  },
  tabPanel: {
    backgroundColor: "#ffffff",
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: "#ffffff",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    borderRadius: 50,
    height: 60,
    padding: 20,
    position: 'absolute',
    zIndex: 1,
    top: -30,
    right: 20,
    margin: '0',
    color: "#ffffff"
  },
  iconBottomAppBar: {
    color: "#121212"
  },
  iconFab: {
    color: "#ffffff",
    marginRight: 10
  },
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
  inputStyle: {
    width: '100%',
    marginBottom: 15
  },
  infoText: {
    fontSize: 30,
    marginBottom: theme.spacing(4)
  },
}));

const { SPONSOR_TYPES } = constants
const sponsorsCategories = ['All'].concat(SPONSOR_TYPES)
const offerCategories = ['All', 'Discount', 'Gift', 'Benefit', 'Other']
const tokenPrices = ['All', '1', '2', '3', '4', '5']

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          { children}
        </>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const classes = useStyles()
  const [currentUser] = useUser()
  const [value, setValue] = useState(0);
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })
  const [maxWidth] = useState('md');
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [offers, setOffers] = useState([]);
  const [loadingLifebanks, setLoadingLifebanks] = useState(true);
  const [lifebanks, setLifebanks] = useState([]);
  const [loadingSponsors, setLoadingSponsors] = useState(true);
  const [sponsors, setSponsors] = useState([]);
  const [openDialogFilter, setOpenDialogFilter] = useState(false)

  const [valueSponsorCat, setValueSponsorCat] = useState("All")
  const [valueOfferCat, setValueOfferCat] = useState("All")
  const [valueTokenPrice, setValueTokenPrice] = useState("All")

  const { refetch: getAllOffers } = useQuery(GET_OFFERS_QUERY, { active: true }, { skip: true })
  const { refetch: getAllBanks } = useQuery(GET_LOCATIONS_QUERY, {}, { skip: true })
  const { refetch: getAllSponsors } = useQuery(GET_LOCATIONS_QUERY, {}, { skip: true })

  const getOffers = async () => {
    setLoadingOffers(true)
    const { data } = await getAllOffers({
      active: true
    })
    let dataOffers = data.offer

    if (valueOfferCat !== 'All') {
      dataOffers = dataOffers.filter(
        (offer) =>
          offer.offer_type.toLowerCase() === valueOfferCat.toLowerCase()
      )
    }

    if (valueSponsorCat !== 'All') {
      dataOffers = dataOffers.filter(
        (offer) =>
          offer.user.location.info.bussines_type.toLowerCase() === valueSponsorCat.toLowerCase()
      )
    }

    if (valueTokenPrice !== 'All') {
      dataOffers = dataOffers.filter(
        (offer) => offer.cost_in_tokens === parseInt(valueTokenPrice)
      )
    }

    setOffers(dataOffers)
    setLoadingOffers(false)
  }

  const getLifebanks = async () => {
    setLoadingLifebanks(true)
    const { data } = await getAllBanks({})
    let dataTemp = data.location
    dataTemp = dataTemp.filter(bank => bank.type === "LIFE_BANK")


    setLifebanks(dataTemp)
    setLoadingLifebanks(false)
  }

  const getSponsors = async () => {
    setLoadingSponsors(true)
    const { data } = await getAllSponsors({})
    let dataTemp = data.location

    dataTemp = dataTemp.filter(bank => bank.type === "SPONSOR")

    if (valueSponsorCat !== 'All') {
      dataTemp = dataTemp.filter(bank => bank.info.bussines_type.toLowerCase() === valueSponsorCat.toLowerCase())
    }

    setSponsors(dataTemp)
    setLoadingSponsors(false)
  }

  useEffect(() => {
    getOffers()
  }, [getAllOffers])

  useEffect(() => {
    getLifebanks()
  }, [getAllBanks])

  useEffect(() => {
    getSponsors()
  }, [getAllSponsors])

  const handlerApplyFilters = (dataOffers, dataSponsors, p_sponsor_cat, p_offer_cat, p_tokenPrice) => {
    setOpenDialogFilter(false)
    getOffers()
    getSponsors()
  }

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };


  const FilterHome = () => {
    return (
      <>
        <IconButton onClick={() => setOpenDialogFilter(true)}>
          <FilterListIcon className={classes.iconBottomAppBar} />
        </IconButton>
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
                onClick={handlerApplyFilters}
              >
                Save changes
                  </Button>
            </Grid>
          </Grid>
        </Dialog>
      </>
    )
  }

  const HomeMobile = () => {
    return (
      <>
        <AppBar position="static" className={classes.appBarTab}>
          <Tabs className={classes.tabs} value={value} onChange={handleChangeTabs} aria-label="Home tabs" centered variant="fullWidth">
            <Tab label="OFFERS" {...a11yProps(0)} />
            <Tab label="BANKS" {...a11yProps(1)} />
            <Tab label="SPONSORS" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <Paper style={{ height: 'calc(100vh - 128px)', overflow: 'auto', border: "none" }}>
              <ShowOffers
                offers={offers}
                loading={loadingOffers}
              />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper style={{ height: 'calc(100vh - 128px)', overflow: 'auto', border: "none" }}>
              <ShowLifebanks
                banks={lifebanks}
                loading={loadingLifebanks}
              />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper style={{ height: 'calc(100vh - 128px)', overflow: 'auto', border: "none" }}>
              <ShowSponsors
                sponsors={sponsors}
                loading={loadingSponsors}
              />
            </Paper>
          </TabPanel>
        </AppBar>
        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar>
            <IconButton  >
              <SearchIcon className={classes.iconBottomAppBar} />
            </IconButton>
            <MapModal />
            <FilterHome />
            <IconButton disabled>
              <StarIcon className={classes.iconBottomAppBar} />
            </IconButton>
            {currentUser && currentUser.role === "donor" &&
              (<Fab color="secondary" variant="extended" className={classes.fabButton}>
                <FavoriteIcon className={classes.iconFab} />
            Donate
              </Fab>)
            }
          </Toolbar>
        </AppBar>
      </>
    )
  }

  const HomeDesktop = () => {
    return (
      <>
        <Box className={classes.homeHeader}>
          <Box className={classes.boxLeft}>
            <Typography variant="h1">Start Saving Lives</Typography>
          </Box>
          <Box className={classes.boxRight}>
            <Typography variant="body1">Give blood banks a lifeline.</Typography>
            <Typography variant="body1">Register to donate life.</Typography>
            <Button
              className={classes.registerBtn}
              variant="contained"
              color="primary"
              component={CustomRouterLink}
              to={`/${currentUser ? 'donations' : 'signup'}`}
            >
              {currentUser ? 'Donations' : 'Register'}
            </Button>
          </Box>
        </Box>
        <Box style={{ height: 2500, backgroundColor: "blue" }}>

        </Box>
      </>
    )
  }

  return (
    <>
      {isDesktop && <HomeDesktop />}
      {!isDesktop && <HomeMobile />}
    </>
  )
}

export default Home
