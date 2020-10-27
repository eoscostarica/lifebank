import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Divider } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import LanguageIcon from '@material-ui/icons/Language'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import EventBusyIcon from '@material-ui/icons/EventBusy'
import { useTranslation } from 'react-i18next'

import { GET_OFFER_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(6, 1, 0, 1),
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 'auto',
    '@media only screen and (max-width: 900px)': {
      width: '100%'
    }
  },
  mainCointainer: {
    width: '60%',
    margin: 'auto',
    marginTop: 10,
    '@media only screen and (max-width: 900px)': {
      width: '100%'
    }
  },
  title: {
    fontSize: 48,
    marginBottom: theme.spacing(1)
  },
  subTitle: {
    fontSize: 25
  },
  priceTitle: {
    fontSize: 20,
    marginBottom: theme.spacing(1)
  },
  imgBanner: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    marginBottom: 10,
    '@media only screen and (max-width: 900px)': {
      height: '200px',
      marginBottom: 0
    }
  },
  priceContainer: {
    padding: 10
  },
  text: {
    fontSize: 15,
    textAlign: 'justify',
    marginBottom: 10
  },
  icon: {
    marginTop: 5,
    marginRight: 5,
    fontSize: 20
  },
  iconBox: {
    display: 'flex',
    marginTop: 3
  },
  infoText: {
    marginTop: 3,
    fontSize: 15,
    textAlign: 'left'
  },
  redeemButton: {
    width: '100%',
    backgroundColor: '#F20833'
  }
}))

const OfferPage = () => {
  const { t } = useTranslation('translations')
  const [offer, setOffer] = useState({
    id: '',
    images: '',
    limited: true,
    offer_name: '',
    offer_type: '',
    online_only: true,
    quantity: 0,
    sponsor_id: 0,
    start_date: '2020-12-12',
    end_date: '2020-12-12',
    description: '',
    cost_in_tokens: 1,
    active: true,
    user: {
      account: 'sponsortest1'
    }
  })
  const [loading, setLoading] = useState(true)
  const [isOffer, setIsOffer] = useState(false)
  const classes = useStyles()
  const { id } = useParams()

  const handleChangeLoadingFalse = (event) => {
    setLoading(false)
  }

  const handleChangeIsOfferTrue = (event) => {
    setIsOffer(true)
  }

  const { refetch: getOneOffers } = useQuery(
    GET_OFFER_QUERY,
    {
      active: true,
      id: 0
    },
    { skip: true }
  )

  const getOffer = async () => {
    const { data } = await getOneOffers({
      active: true,
      id: id
    })

    handleChangeLoadingFalse()

    if (data.offer.length > 0) {
      setOffer(data.offer[0])
      handleChangeIsOfferTrue()
    }
  }

  const replaceBoolean = (bool) => {
    if (bool) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  useEffect(() => {
    getOffer()
  }, [getOneOffers])

  return (
    <>
      <Box className={classes.wrapper}>
        {loading && <CircularProgress />}
        {!loading && !isOffer && (
          <Typography variant="h3" className={classes.title}>
            {t('miscellaneous.noOfferAvailable')}
          </Typography>
        )}
        {!loading && isOffer && (
          <Grid
            className={classes.mainCointainer}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} md={8}>
              <Typography variant="h1" className={classes.title}>
                {offer.offer_name}
              </Typography>
              <Typography variant="h2" className={classes.subTitle}>
                {offer.user.name}
              </Typography>
              <Typography variant="h2" className={classes.priceTitle}>
                {t('miscellaneous.price')}: {offer.cost_in_tokens}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.redeemButton}
              >
                {t('tokenTransfer.redeem')}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={8}>
              <p className={classes.text}>{offer.description}</p>
            </Grid>
            <Grid item xs={12} md={4} ml={20}>
              <Box className={classes.iconBox}>
                <LocalOfferIcon className={classes.icon} />
                <Typography variant="body1" className={classes.infoText}>
                  <b>{t('offersManagement.offerType')}: </b> {offer.offer_type}
                </Typography>
              </Box>
              <Box className={classes.iconBox}>
                <TimelapseIcon className={classes.icon} />
                <Typography variant="body1" className={classes.infoText}>
                  <b>{t('miscellaneous.limitedOffer')}: </b>{' '}
                  {replaceBoolean(offer.limited)}
                </Typography>
              </Box>
              <Box className={classes.iconBox}>
                <ShoppingBasketIcon className={classes.icon} />
                <Typography variant="body1" className={classes.infoText}>
                  <b>{t('miscellaneous.stock')}: </b> {offer.quantity}{' '}
                </Typography>
              </Box>
              <Box className={classes.iconBox}>
                <LanguageIcon className={classes.icon} />
                <Typography variant="body1" className={classes.infoText}>
                  <b>{t('offersManagemenet.onlineOnly')}: </b>{' '}
                  {replaceBoolean(offer.online_only)}{' '}
                </Typography>
              </Box>
              <Box className={classes.iconBox}>
                <EventAvailableIcon className={classes.icon} />
                <Typography variant="body1" className={classes.infoText}>
                  <b>{t('offersManagement.startDate')}: </b> {offer.start_date}
                </Typography>
              </Box>
              <Box className={classes.iconBox}>
                <EventBusyIcon className={classes.icon} />
                <Typography variant="body1" className={classes.infoText}>
                  <b>{t('offersManagement.endDate')}: </b> {offer.end_date}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <img className={classes.imgBanner} src={offer.images} />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  )
}

export default OfferPage
