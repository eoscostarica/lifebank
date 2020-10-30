import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import { useUser } from '../../context/user.context'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import StarIcon from '@material-ui/icons/Star'
import { useTranslation } from 'react-i18next'

import DonationsDashboard from '../../components/DonationsDashboard'
import MapModal from '../../components/MapModal'
import ShowOffers from './ShowOffers'
import ShowLifebanks from './ShowLifebanks'
import ShowSponsors from './ShowSponsors'
import FilterHome from '../../components/FilterHome'

const useStyles = makeStyles((theme) => ({
  appBarTab: {
    backgroundColor: '#ffffff',
    boxShadow: 'none'
  },
  tabs: {
    color: '#121212',
    backgroundColor: 'ffffff'
  },
  tabPanel: {
    backgroundColor: '#ffffff'
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#ffffff'
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
    color: '#ffffff'
  },
  iconBottomAppBar: {
    color: '#121212'
  },
  iconFab: {
    color: '#ffffff',
    marginRight: 10
  },
  title: {
    height: '50px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  }
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const HomeMobile = (props) => {
  const { t } = useTranslation('translations')
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const [currentUser] = useUser()

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <AppBar position="static" className={classes.appBarTab}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChangeTabs}
          aria-label="Home tabs"
          centered
          variant="fullWidth"
        >
          <Tab label={t('miscellaneous.offers')} {...a11yProps(0)} />
          <Tab label={t('miscellaneous.banks')} {...a11yProps(1)} />
          <Tab label={t('miscellaneous.sponsors')} {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} className={classes.tabPanel}>
          <Paper
            style={{
              height: 'calc(100vh - 128px)',
              overflow: 'auto',
              border: 'none'
            }}
          >
            <ShowOffers
              offers={props.offers}
              loading={props.loadingOffers}
              isDesktop={false}
            />
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper
            style={{
              height: 'calc(100vh - 128px)',
              overflow: 'auto',
              border: 'none'
            }}
          >
            <ShowLifebanks
              banks={props.lifebanks}
              loading={props.loadingLifebanks}
              isDesktop={false}
            />
          </Paper>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Paper
            style={{
              height: 'calc(100vh - 128px)',
              overflow: 'auto',
              border: 'none'
            }}
          >
            <ShowSponsors
              sponsors={props.sponsors}
              loading={props.loadingSponsors}
              isDesktop={false}
            />
          </Paper>
        </TabPanel>
      </AppBar>
      <AppBar position="fixed" className={classes.bottomAppBar}>
        <Toolbar>
          <IconButton>
            <SearchIcon className={classes.iconBottomAppBar} />
          </IconButton>
          <MapModal isDesktop={false} />
          <FilterHome isDesktop={false} applyFilters={props.applyFilters} />
          <IconButton disabled>
            <StarIcon className={classes.iconBottomAppBar} />
          </IconButton>
          {currentUser && (
            <DonationsDashboard isDesktop={false} role={currentUser.role} />
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

HomeMobile.propTypes = {
  offers: PropTypes.array,
  loadingOffers: PropTypes.bool,
  lifebanks: PropTypes.array,
  loadingLifebanks: PropTypes.bool,
  sponsors: PropTypes.array,
  loadingSponsors: PropTypes.bool,
  applyFilters: PropTypes.func
}

export default HomeMobile
