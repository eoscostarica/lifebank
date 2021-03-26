import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import ShowOffersDesktop from '../../components/ShowElements/ShowOffersDesktop'
import { GET_ALL_OFFERS_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({

  contentBodyDesktop: {
    width: '100%',
    backgroundColor: '#000000',
    paddingTop: '50px',
    paddingLeft: '20%',
    paddingRight: '20%',
    height: 'auto'
  },
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
    paddingRigth: 20,
    backgroundColor: '#ffffff'
  },
  generalDescription: {
    marginTop: 10,
    paddingLeft: 5
  },
  description: {
    marginBottom: 5
  }
}))

const OffersApproval = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [approvedOffers, setApprovedOffers] = useState([])
  const [rejectedOffers, setRejectedOffers] = useState([])
  const lista = ["freeProduct", "coupon", "benefit", "badge"]
  const getOffers = async () => {
    setLoadingOffers(true)
    await getAllOffers()
  }

  const {
    loading: loadingDataOffer,
    data: allOffers,
    refetch: getAllOffers
  } = useQuery(GET_ALL_OFFERS_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (!loadingDataOffer) {
      let dataOffers = allOffers.offer
      setOffers(dataOffers)
      setLoadingOffers(false)
    }
  }, [allOffers])

  useEffect(() => {

    getOffers()
  }, [])

  useEffect(() => {
    let AOffers = []
    let ROffers = []

    offers.map((offer) => {
      console.log(offer.offer_type, lista)
      if (!lista.includes(offer.offer_type))
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
        md={12}
        xl={10}
      >
        <Grid item md={12}>
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
        md={12}
        xl={10}
      >
        <Grid item md={12}>
          <Typography variant="h2" className={classes.SubtitleSection}>
            {t('cardsSection.approvedOffers')}
          </Typography>
        </Grid>
        <ShowOffersDesktop
          className={classes.offerContainer}
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
        className={classes.mainGridDesktop}
        md={12}
        xl={10}
      >
        <Grid item md={12}>
          <Typography variant="h2" className={classes.SubtitleSection}>
            {t('cardsSection.rejectedOffers')}
          </Typography>

        </Grid>
        <ShowOffersDesktop
          className={classes.offerContainer}
          offers={rejectedOffers}
          loading={loadingOffers}
        />
      </Grid>
    </>
  )
}

export default OffersApproval

