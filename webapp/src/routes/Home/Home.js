import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar';
import { useUser } from '../../context/user.context'
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
import FilterHome from '../../components/FilterHome'
import ShowOffers from './ShowOffers';
import Banks from '../Banks';
import Sponsors from '../Sponsors';
import mobileBgImage from '../../assets/the-world.png'
import bgImage from '../../assets/lifebank-hero-bg.png'

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
  }
}));

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

  const [loadingOffers, setLoadingOffers] = useState(true);
  const [offers, setOffers] = useState([]);
  const [loadingLifebanks, setLoadingLifebanks] = useState(true);
  const [lifebanks, setLifebanks] = useState([]);
  const [loadingSponsors, setLoadingSponsors] = useState(true);
  const [sponsors, setSponsors] = useState([]);
  const [openDialogFilter, setOpenDialogFilter] = useState(false)

  const { refetch: getAllOffers } = useQuery(GET_OFFERS_QUERY, { active: true }, { skip: true })
  const { refetch: getAllBanks } = useQuery(GET_LOCATIONS_QUERY, {}, { skip: true })
  const { refetch: getAllSponsors } = useQuery(GET_LOCATIONS_QUERY, {}, { skip: true })

  const getOffers = async () => {
    const { data } = await getAllOffers({ active: true })
    const dataTemp = data.offer

    setOffers(dataTemp)
    setLoadingOffers(false)
  }

  const getLifebanks = async () => {
    const { data } = await getAllBanks({})
    let dataTemp = data.location
    dataTemp = dataTemp.filter(bank => bank.type === "LIFE_BANK")

    setLifebanks(dataTemp)
    setLoadingLifebanks(false)
  }

  const getSponsors = async () => {
    const { data } = await getAllSponsors({})
    let dataTemp = data.location
    dataTemp = dataTemp.filter(bank => bank.type === "SPONSOR")

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

  const handlerApplyFilterOffer = (data) => {
    setOffers(data)
  }

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

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
              <Banks />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper style={{ height: 'calc(100vh - 128px)', overflow: 'auto', border: "none" }}>
              <Sponsors />
            </Paper>
          </TabPanel>
        </AppBar>
        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar>
            <IconButton  >
              <SearchIcon className={classes.iconBottomAppBar} />
            </IconButton>
            <MapModal />
            <FilterHome
              handlerApplyFilterOffer={handlerApplyFilterOffer}
              openDialogFilter={openDialogFilter}
              setOpenDialogFilter={setOpenDialogFilter}
            />
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

        </Box>
        <FilterHome />
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
