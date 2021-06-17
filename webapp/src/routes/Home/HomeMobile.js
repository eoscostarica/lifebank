import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import { useUser } from '../../context/user.context'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import { useTranslation } from 'react-i18next'

import ShowOffersMobile from '../../components/ShowElements/ShowOffersMobile'
import ShowLifebanksMobile from '../../components/ShowElements/ShowLifebanksMobile'
import ShowSponsorsMobile from '../../components/ShowElements/ShowSponsorsMobile'
import DonationsDashboard from '../../components/DonationsDashboard'
import SearchComponent from '../../components/SearchComponent'
import MapModal from '../../components/MapModal'
import FilterHome from '../../components/FilterHome'
import styles from './styles'

const useStyles = makeStyles(styles)
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
            <ShowOffersMobile
              offers={props.offers}
              loading={props.loadingOffers}
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
            <ShowLifebanksMobile
              banks={props.lifebanks}
              loading={props.loadingLifebanks}
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
            <ShowSponsorsMobile
              sponsors={props.sponsors}
              loading={props.loadingSponsors}
            />
          </Paper>
        </TabPanel>
      </AppBar>
      <AppBar position="fixed" className={classes.bottomAppBar}>
        <Toolbar>
          <SearchComponent
            offers={props.offers}
            loadingOffers={props.loadingOffers}
            lifebanks={props.lifebanks}
            loadingLifebanks={props.loadingLifebanks}
            sponsors={props.sponsors}
            loadingSponsors={props.loadingSponsors}
            searchValue={props.searchValue}
            handleChangeSearch={props.handleChangeSearch}
          />
          <MapModal isDesktop={false} />
          <FilterHome isDesktop={false} applyFilters={props.applyFilters} />
          {currentUser && (
            <DonationsDashboard isDesktop={false} currentUser={currentUser} />
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
  applyFilters: PropTypes.func,
  searchValue: PropTypes.string,
  handleChangeSearch: PropTypes.func
}

export default memo(HomeMobile)