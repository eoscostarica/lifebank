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

import ShowOffersAproval from '../../components/ShowElements/ShowOffersAproval'
import {
  GET_ALL_OFFERS_QUERY,
  GET_INFO
} from '../../gql'
import { useUser } from '../../context/user.context'
import styles from './styles'

const useStyles = makeStyles(styles)

const OffersApproval = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [offers, setOffers] = useState([])
  const [currentUser] = useUser()
  const [account] = useState(currentUser.account)
  const [discountOffers, setDiscountOffers] = useState([])
  const [freeOffers, setFreetOffers] = useState([])
  const [badgeOffers, setBadgeOffers] = useState([])
  const [couponOffers, setCouponOffers] = useState([])
  const [benefitsOffers, setBenefitsOffers] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')


  const CategoryX = [
    { value: 'all', label: t('categories.all') },
    { value: 'discount', label: t('categories.discount') },
    { value: 'freeProduct', label: t('categories.freeProduct') },
    { value: 'coupon', label: t('categories.coupon') },
    { value: 'benefit', label: t('categories.benefit') },
    { value: 'badge', label: t('categories.badge') },
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
    try {
      if (!loadingInfo) {
        const dataCategories = info.location[0].info.categories
        setCategories(dataCategories)
      }
    } catch (error) { }

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
        <Grid item className={classes.generalDescription}>
          <Typography className={classes.description} >
            {t('offerApproval.description')} </Typography>
          <Typography className={classes.description} >
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
      {category === 'all' && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.showOffers}
        >
          <ShowOffersAproval
            offers={offers}
            loading={loadingOffers}
          />
        </Grid>
      )}
      {category === '' && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={0}
          className={classes.showOffers}
        >
          <ShowOffersAproval
            offers={offers}
            loading={loadingOffers}
          />
        </Grid>
      )}
      {categories && (
        <>
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
              <Grid item md={12} >
                <Typography variant="h2" className={classes.SubtitleSection}>
                  {t('categories.discount')}
                </Typography>
              </Grid>
              <ShowOffersAproval
                offers={discountOffers}
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
              <Grid item md={12} >
                <Typography variant="h2" className={classes.SubtitleSection}>
                  {t('categories.coupon')}
                </Typography>
              </Grid>
              <ShowOffersAproval
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
              <Grid item md={12} >
                <Typography variant="h2" className={classes.SubtitleSection}>
                  {t('categories.benefit')}
                </Typography>
              </Grid>
              <ShowOffersAproval
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
            >
              {categories.includes(category) && (
                <SnackbarContent className={classes.snackbar} message={t('offerApproval.message1')} />
              )}
              {!categories.includes(category) && (
                <SnackbarContent className={classes.snackbar} message={t('offerApproval.message2')} />
              )}
              <Grid item md={12} >
                <Typography variant="h2" className={classes.SubtitleSection}>
                  {t('categories.badge')}
                </Typography>
              </Grid>
              <ShowOffersAproval
                offers={badgeOffers}
                loading={loadingOffers}
              />
            </Grid >
          )}
          {
            category === 'freeProduct' && (
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
                <Grid item md={12} >
                  <Typography variant="h2" className={classes.SubtitleSection}>
                    {t('categories.freeProduct')}
                  </Typography>
                </Grid>
                <ShowOffersAproval
                  offers={freeOffers}
                  loading={loadingOffers}
                />
              </Grid >
            )
          }
        </>
      )}
    </>
  )
}

export default OffersApproval

