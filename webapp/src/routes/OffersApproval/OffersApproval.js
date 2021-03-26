import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import ShowOffersDesktop from '../../components/ShowElements/ShowOffersDesktop'
import {
  GET_ALL_OFFERS_QUERY,
  GET_INFO
} from '../../gql'
import { useUser } from '../../context/user.context'

const useStyles = makeStyles((theme) => ({

  titleMainSection: {
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal'
  },
  SubtitleSection: {
    fontSize: '24px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal'
  },
  mainGridDesktop: {
    paddingTop: 39,
    paddingLeft: 20,
    paddingRigth: 20
  },
  generalDescription: {
    marginTop: 10,
    paddingLeft: 5
  },
  description: {
    marginBottom: 5
  },
  showOffers: {
    paddingTop: 39,
    paddingLeft: 20,
    paddingRigth: 20,
    paddingBottom: 90
  }
}))

const OffersApproval = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [currentUser] = useUser()
  const [account, setAccount] = useState(currentUser.account)
  const [approvedOffers, setApprovedOffers] = useState([])
  const [rejectedOffers, setRejectedOffers] = useState([])
  const [categories, setCategories] = useState([])

  const getOffers = async () => {
    setLoadingOffers(true)
    await getAllOffers()
    await getInfo()
  }
  console.log("Cuenta..", account)
  const {
    loading: loadingDataOffer,
    data: allOffers,
    refetch: getAllOffers
  } = useQuery(GET_ALL_OFFERS_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  const {
    loading: loadingInfo,
    data: info,
    refetch: getInfo
  } = useQuery(GET_INFO, {
    variables: { account },
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (!loadingInfo) {
      let dataCategories = info.location[0].info.categories
      setCategories(dataCategories)
    }
  }, [info])

  useEffect(() => {
    if (!loadingDataOffer) {
      let dataOffers = allOffers.offer
      setOffers(dataOffers)
      setLoadingOffers(false)
    }
  }, [allOffers])

  useEffect(() => {
    getInfo()
    getOffers()
  }, [])

  useEffect(() => {
    let AOffers = []
    let ROffers = []


    offers.map((offer) => {
      if (!categories.includes(offer.offer_type))
        ROffers.push(offer)
      else
        AOffers.push(offer)
    })

    setApprovedOffers(AOffers)
    setRejectedOffers(ROffers)

  }, [offers])

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        spacing={0}
        className={classes.mainGridDesktop}
      >
        <Grid item md={12} >
          <Typography variant="h1" className={classes.titleMainSection}>
            {t('cardsSection.approvedOffers')}
          </Typography>
        </Grid>
        <Grid item md={12} className={classes.generalDescription}>
          <Typography className={classes.description} >
            {t('offerApproval.description')} </Typography>
          <Typography  >
            {t('offerApproval.description2')}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={0}
        className={classes.mainGridDesktop}
      >
        <Grid item md={12}>
          <Typography variant="h2" className={classes.SubtitleSection}>
            {t('cardsSection.approvedOffers')}
          </Typography>
        </Grid>
        <ShowOffersDesktop
          offers={approvedOffers}
          loading={loadingOffers}
        />
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={0}
        className={classes.showOffers}
        md={12}
        xl={10}
      >
        <Grid item md={12}>
          <Typography variant="h2" className={classes.SubtitleSection}>
            {t('cardsSection.rejectedOffers')}
          </Typography>

        </Grid>
        <ShowOffersDesktop
          offers={rejectedOffers}
          loading={loadingOffers}
        />

      </Grid>

    </>
  )
}

export default OffersApproval

