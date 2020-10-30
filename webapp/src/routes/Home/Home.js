import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import HomeMobile from './HomeMobile'
import HomeDesktop from './HomeDesktop'

import { GET_OFFERS_QUERY, GET_LOCATIONS_QUERY } from '../../gql'

const Home = () => {

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [loadingLifebanks, setLoadingLifebanks] = useState(true)
  const [lifebanks, setLifebanks] = useState([])
  const [loadingSponsors, setLoadingSponsors] = useState(true)
  const [sponsors, setSponsors] = useState([])

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

  const applyFilters = (p_sponsor_cat, p_offer_cat, p_tokenPrice) => {
    setValueSponsorCat(p_sponsor_cat)
    setValueOfferCat(p_offer_cat)
    setValueTokenPrice(p_tokenPrice)
  }

  useEffect(() => {
    getOffers()
    getSponsors()
    getLifebanks()
  }, [valueSponsorCat, valueOfferCat, valueTokenPrice])

  return (
    <>
      {isDesktop &&
        <HomeDesktop
          offers={offers}
          loadingOffers={loadingOffers}
          lifebanks={lifebanks}
          loadingLifebanks={loadingLifebanks}
          sponsors={sponsors}
          loadingSponsors={loadingSponsors}
          applyFilters={applyFilters}
        />
      }
      {!isDesktop &&
        <HomeMobile
          offers={offers}
          loadingOffers={loadingOffers}
          lifebanks={lifebanks}
          loadingLifebanks={loadingLifebanks}
          sponsors={sponsors}
          loadingSponsors={loadingSponsors}
          applyFilters={applyFilters}
        />}
    </>
  )
}

export default Home
