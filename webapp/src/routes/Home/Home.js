import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../context/user.context'
import LocalBusinessStructuredData from '../../components/LocalBusinessStructuredData'
import MedicalClinicStructuredData from '../../components/MedicalClinicStructuredData'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { useTranslation } from 'react-i18next'

import HomeMobile from './HomeMobile'
import HomeDesktop from './HomeDesktop'
import { GET_OFFERS_QUERY, GET_VALID_SPONSORS_QUERY, GET_VALID_LIFEBANKS_QUERY } from '../../gql'
import ConsetComponent from '../../components/ConsetComponent/ConsentComponent'

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
  const [openAlert, setOpenAlert] = useState(false)
  const [messegaAlert, setMessegaAlert] = useState("")
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

  const handleOpenAlert = () => setOpenAlert(!openAlert)

  const typeError = async (errorMessege) => {
    setFetchError(true)
    if (errorMessege === 'GraphQL error: Could not verify JWT: JWTExpired') {
      if (allOffersError && allBanksError && allSponsorsError) {
        logout()
        handleOpenAlert()
        setMessegaAlert(t('errors.tokenExpiration'))
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
          (bank) =>
            bank.bussines_type.toLowerCase() ===
            valueSponsorCat.toLowerCase()
        )
      }

      if (searchValue !== '')
        dataTemp = dataTemp.filter((bank) =>
          bank.name.toLowerCase().includes(searchValue.toLowerCase())
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
      )}
      {!isDesktop && (
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
      )}
      <ConsetComponent />
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleOpenAlert}>
        <Alert onClose={handleOpenAlert} severity="error">
          {messegaAlert}
        </Alert>
      </Snackbar>
      {sponsors.length > 0 && (
        <>
          {sponsors.map((el, key) => (
            <LocalBusinessStructuredData
              key={key}
              name={el.name}
              openingHours={el.openingHours}
              address={el.address}
              logo={el.logo}
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
              address={element.address}
              logo={element.logo}
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

export default Home
