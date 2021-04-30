import React, { memo, useEffect, useState, lazy, Suspense } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../context/user.context'
import CircularProgress from '@material-ui/core/CircularProgress'

import LocalBusinessStructuredData from '../../components/LocalBusinessStructuredData'
import MedicalClinicStructuredData from '../../components/MedicalClinicStructuredData'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { useTranslation } from 'react-i18next'

import {
  GET_OFFERS_QUERY,
  GET_VALID_SPONSORS_QUERY,
  GET_VALID_LIFEBANKS_QUERY
} from '../../gql'
import ConsetComponent from '../../components/ConsetComponent/ConsentComponent'

const HomeMobile = lazy(() => import('./HomeMobile'))
const HomeDesktop = lazy(() => import('./HomeDesktop'))

const Home = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })
  const { t } = useTranslation('translations')
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [loadingLifebanks, setLoadingLifebanks] = useState(true)
  const [lifebanks, setLifebanks] = useState([])
  const [loadingSponsors, setLoadingSponsors] = useState(true)
  const [sponsors, setSponsors] = useState([])
  const [fetchError, setFetchError] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [, { logout }] = useUser()
  const [valueSponsorCat, setValueSponsorCat] = useState('All')
  const [valueOfferCat, setValueOfferCat] = useState('All')
  const [valueTokenPrice, setValueTokenPrice] = useState('All')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const history = useHistory()

  const {
    loading: loadingDataOffer,
    error: allOffersError,
    data: allOffers,
    refetch: getAllOffers
  } = useQuery(GET_OFFERS_QUERY, {
    variables: { active: true },
    fetchPolicy: 'cache-and-network'
  })
  const {
    loading: loadingDataBanks,
    error: allBanksError,
    data: allBanks,
    refetch: getAllBanks
  } = useQuery(GET_VALID_LIFEBANKS_QUERY, { fetchPolicy: 'cache-and-network' })
  const {
    loading: loadingDataSpons,
    error: allSponsorsError,
    data: allSponsors,
    refetch: getAllSponsors
  } = useQuery(GET_VALID_SPONSORS_QUERY, { fetchPolicy: 'cache-and-network' })

  const handleClose = () => setOpenSnackbar({ ...openSnackbar, show: false })

  const typeError = async (errorMessege) => {
    setFetchError(true)
    if (errorMessege === 'GraphQL error: Could not verify JWT: JWTExpired') {
      if (allOffersError && allBanksError && allSponsorsError) {
        logout()
        setOpenSnackbar({
          show: true,
          message: t('errors.tokenExpiration'),
          severity: 'error'
        })
        await getOffers()
        await getSponsors()
        await getLifebanks()
      }
      setFetchError(false)
    } else history.push('/internal-error')
  }

  useEffect(() => {
    if (!fetchError) {
      if (allOffersError) typeError(allOffersError.message)
      else if (allBanksError) typeError(allBanksError.message)
      else if (allSponsorsError) typeError(allSponsorsError.message)
    }
  }, [allOffersError, allBanksError, allSponsorsError])

  const getOffers = async () => {
    setLoadingOffers(true)
    await getAllOffers({ active: true })
  }

  useEffect(() => {
    if (!loadingDataOffer) {
      let dataOffers = allOffers.offer

      if (valueOfferCat !== 'All') {
        dataOffers = dataOffers.filter(
          (offer) =>
            offer.offer_type.toLowerCase() === valueOfferCat.toLowerCase()
        )
      }

      if (valueSponsorCat !== 'All') {
        dataOffers = dataOffers.filter(
          (offer) =>
            offer.user.location.info.bussines_type.toLowerCase() ===
            valueSponsorCat.toLowerCase()
        )
      }

      if (valueTokenPrice !== 'All') {
        dataOffers = dataOffers.filter(
          (offer) => offer.cost_in_tokens === parseInt(valueTokenPrice)
        )
      }

      if (searchValue !== '') {
        dataOffers = dataOffers.filter((offer) =>
          offer.offer_name.toLowerCase().includes(searchValue.toLowerCase())
        )
      }

      setOffers(dataOffers)
      setLoadingOffers(false)
    }
  }, [allOffers])

  const getLifebanks = async () => {
    setLoadingLifebanks(true)
    await getAllBanks({})
  }

  useEffect(() => {
    if (!loadingDataBanks) {
      let dataTemp = allBanks.get_valid_lifebanks

      if (searchValue !== '')
        dataTemp = dataTemp.filter((banks) =>
          banks.name.toLowerCase().includes(searchValue.toLowerCase())
        )

      setLifebanks(dataTemp)
      setLoadingLifebanks(false)
    }
  }, [allBanks])

  const getSponsors = async () => {
    setLoadingSponsors(true)
    await getAllSponsors({})
  }

  useEffect(() => {
    if (!loadingDataSpons) {
      let dataTemp = allSponsors.get_valid_sponsors
      if (valueSponsorCat !== 'All') {
        dataTemp = dataTemp.filter(
          (sponsor) =>
            sponsor.businessType.toLowerCase() === valueSponsorCat.toLowerCase()
        )
      }

      if (searchValue !== '')
        dataTemp = dataTemp.filter((sponsor) =>
          sponsor.name.toLowerCase().includes(searchValue.toLowerCase())
        )

      setSponsors(dataTemp)

      setLoadingSponsors(false)
    }
  }, [allSponsors])

  const applyFilters = (p_sponsor_cat, p_offer_cat, p_tokenPrice) => {
    setValueSponsorCat(p_sponsor_cat)
    setValueOfferCat(p_offer_cat)
    setValueTokenPrice(p_tokenPrice)
  }

  useEffect(() => {
    getOffers()
    getSponsors()
    getLifebanks()
  }, [valueSponsorCat, valueOfferCat, valueTokenPrice, searchValue])

  return (
    <>
      {isDesktop && (
        <Suspense fallback={<CircularProgress />}>
          <HomeDesktop
            offers={offers}
            loadingOffers={loadingOffers}
            lifebanks={lifebanks}
            loadingLifebanks={loadingLifebanks}
            sponsors={sponsors}
            loadingSponsors={loadingSponsors}
            applyFilters={applyFilters}
            searchValue={searchValue}
            handleChangeSearch={setSearchValue}
          />
        </Suspense>
      )}
      {!isDesktop && (
        <Suspense fallback={<CircularProgress />}>
          <HomeMobile
            offers={offers}
            loadingOffers={loadingOffers}
            lifebanks={lifebanks}
            loadingLifebanks={loadingLifebanks}
            sponsors={sponsors}
            loadingSponsors={loadingSponsors}
            applyFilters={applyFilters}
            searchValue={searchValue}
            handleChangeSearch={setSearchValue}
          />
        </Suspense>
      )}
      <ConsetComponent />
      <Snackbar
        open={openSnackbar.show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
      {sponsors.length > 0 && (
        <>
          {sponsors.map((el, key) => (
            <LocalBusinessStructuredData
              key={key}
              name={el.name}
              openingHours={el.openingHours}
              username={el.username}
              address={el.address}
              logo={el.logo}
              photos={JSON.parse(el.photos)}
              email={el.email}
              location={el.location}
              telephone={el.telephone}
              socialMediaLinks={JSON.parse(el.social_media_links)}
            />
          ))}
        </>
      )}
      {lifebanks.length > 0 && (
        <>
          {lifebanks.map((element, key) => (
            <MedicalClinicStructuredData
              key={key}
              name={element.name}
              openingHours={element.openingHours}
              username={element.username}
              address={element.address}
              logo={element.logo}
              photos={JSON.parse(element.photos)}
              email={element.email}
              description={element.description}
              location={element.location}
              telephone={element.telephone}
            />
          ))}
        </>
      )}
    </>
  )
}

export default memo(Home)