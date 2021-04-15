import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import SnackbarContent from '@material-ui/core/SnackbarContent'

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
    paddingRigth: 20,
    paddingBottom: 30
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
    paddingBottom: '15%'
  },
  boxSelect: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  formControl: {
    margin: theme.spacing(2),
    marginLeft: 25,
    minWidth: 180
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  snackbar: {
    marginRight: 100,
    backgroundColor: 'white',
    color: 'black'
  }
}))

const OffersApproval = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [currentUser] = useUser()
  const [account, setAccount] = useState(currentUser.account)
  const [discountOffers, setDiscountOffers] = useState([])
  const [freeOffers, setFreetOffers] = useState([])
  const [badgeOffers, setBadgeOffers] = useState([])
  const [couponOffers, setCouponOffers] = useState([])
  const [benefitsOffers, setBenefitsOffers] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')


  const CategoryX = [
    { value: 'discount', label: t('categories.discount') },
    { value: 'freeProduct', label: t('categories.freeProduct') },
    { value: 'coupon', label: t('categories.coupon') },
    { value: 'benefit', label: t('categories.benefit') },
    { value: 'badge', label: t('categories.badge') }
  ]

  const getOffers = async () => {
    setLoadingOffers(true)
    await getAllOffers()
    await getInfo()
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

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
      const dataCategories = info.location[0].info.categories
      setCategories(dataCategories)
    }
  }, [info])

  useEffect(() => {
    if (!loadingDataOffer) {
      const dataOffers = allOffers.offer
      setOffers(dataOffers)
      setLoadingOffers(false)
    }
  }, [allOffers])

  useEffect(() => {
    getInfo()
    getOffers()
  }, [])

  useEffect(() => {
    const discountOff = []
    const freeProductOff = []
    const couponOff = []
    const benefitOff = []
    const badgeOff = []

    offers.map((offer) => {
      switch (offer.offer_type) {
        case 'discount':
          discountOff.push(offer)
          break
        case 'benefit':
          benefitOff.push(offer)
          break
        case 'freeProduct':
          freeProductOff.push(offer)
          break
        case 'coupon':
          couponOff.push(offer)
          break
        case 'badge':
          badgeOff.push(offer)
          break
      }
    })

    setDiscountOffers(discountOff)
    setFreetOffers(freeProductOff)
    setBadgeOffers(badgeOff)
    setCouponOffers(couponOff)
    setBenefitsOffers(benefitOff)

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
      <Box className={classes.boxSelect}>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">{t('common.categories')}</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={category}
            onChange={handleChange}
            label="category"
          >
            {CategoryX.map((option) => {
              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
      {category === 'discount' && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.showOffers}
        >
          {categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message1')} />
          )}
          {!categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message2')} />
          )}
          <Grid item md={12} sm={6}>
            <Typography variant="h2" className={classes.SubtitleSection}>
              {t('categories.discount')}
            </Typography>
          </Grid>
          <ShowOffersDesktop
            offers={discountOffers}
            loading={loadingOffers}
          />
        </Grid>
      )}
      {category === 'freeProduct' && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.showOffers}
        >
          {categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message1')} />
          )}
          {!categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message2')} />
          )}
          <Grid item md={12} sm={6}>
            <Typography variant="h2" className={classes.SubtitleSection}>
              {t('categories.freeProduct')}
            </Typography>
          </Grid>
          <ShowOffersDesktop
            offers={freeOffers}
            loading={loadingOffers}
          />
        </Grid>
      )}
      {category === 'coupon' && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.showOffers}
        >
          {categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message1')} />
          )}
          {!categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message2')} />
          )}
          <Grid item md={12} sm={6}>
            <Typography variant="h2" className={classes.SubtitleSection}>
              {t('categories.coupon')}
            </Typography>
          </Grid>
          <ShowOffersDesktop
            offers={couponOffers}
            loading={loadingOffers}
          />
        </Grid>
      )}
      {category === 'benefit' && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.showOffers}
        >
          {categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message1')} />
          )}
          {!categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message2')} />
          )}
          <Grid item md={12} sm={6}>
            <Typography variant="h2" className={classes.SubtitleSection}>
              {t('categories.benefit')}
            </Typography>
          </Grid>
          <ShowOffersDesktop
            offers={benefitsOffers}
            loading={loadingOffers}
          />
        </Grid>
      )}
      {category === 'badge' && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.showOffers}
          md={12}
        >
          {categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message1')} />
          )}
          {!categories.includes(category) && (
            <SnackbarContent className={classes.snackbar} message={t('offerApproval.message2')} />
          )}
          <Grid item md={12} sm={6}>
            <Typography variant="h2" className={classes.SubtitleSection}>
              {t('categories.badge')}
            </Typography>
          </Grid>
          <ShowOffersDesktop
            offers={badgeOffers}
            loading={loadingOffers}
          />
        </Grid>
      )}
    </>
  )
}

export default OffersApproval

