import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useTranslation } from 'react-i18next'
import OfferView from '../../components/OfferView'
import styles from './styles'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import StarsIcon from '@material-ui/icons/Stars'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import StorefrontIcon from '@material-ui/icons/Storefront'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import FilterVintageIcon from '@material-ui/icons/FilterVintage'
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill'
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt'

const useStyles = makeStyles(styles)

const ShowOffers = ({ offers, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [openOfferView, setOpenOfferView] = useState(true)
  const [selectOffer, setSelectOffer] = useState()
  const handleOpenOfferView = (offer) => {
    setSelectOffer(offer)
    setOpenOfferView(true)
  }
  const handleCloseOfferView = (offer) => {
    setSelectOffer(null)
    setOpenOfferView(false)
  }
  const LoadOfferDesktop = () => {
    return (
      <>
        {loading && (
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        )}
        {!loading && offers.length <= 0 && (
          <Card className={classes.cardRoot}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {t('miscellaneous.noOffersAvailable')}
              </Typography>
            </Grid>
          </Card>
        )}
        {!loading &&
          offers.length > 0 &&
          offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
        {selectOffer && (
          <OfferView
            selectOffer={selectOffer}
            isDesktop
            openOfferView={openOfferView}
            handleCloseOfferView={handleCloseOfferView}
          />
        )}
      </>
    )
  }
  const truncateString = (str) => {
    const num = 55
    if (str.length <= num) return str
    return str.slice(0, num) + '...'
  }
  const OfferCard = (props) => {
    return (
      <Card className={classes.cardRoot}>
        <Box className={classes.cardHeader}>
          <Avatar
            className={classes.cardAvatar}
            src={
              props.offer.images[0] !== ''
                ? `//images.weserv.nl?url=${JSON.parse(props.offer.images)[0]
                }&h=60&dpr=1`
                : ''
            }
          >
          </Avatar>
          <Box className={classes.cardTitleContainer}>
            <Typography className={classes.cardTitle} noWrap>
              {props.offer.offer_name}
            </Typography>
          </Box>
          {props.offer.icon === 'LocalOfferIcon' && (
            <LocalOfferIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'CardGiftcardIcon' && (
            <CardGiftcardIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'StarsIcon' && (
            <StarsIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'WhatshotIcon' && (
            <WhatshotIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'AccessTimeIcon' && (
            <AccessTimeIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'StorefrontIcon' && (
            <StorefrontIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'TagFacesIcon' && (
            <TagFacesIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'ShoppingBasketIcon' && (
            <ShoppingBasketIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'RestaurantIcon' && (
            <RestaurantIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'FilterVintageIcon' && (
            <FilterVintageIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'OutdoorGrillIcon' && (
            <OutdoorGrillIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'OfflineBoltIcon' && (
            <OfflineBoltIcon className={classes.cardIconOffer} />
          )}
        </Box>
        <CardContent className={classes.cardContent}>
          <Typography paragraph className={classes.cardContentText}>
            {truncateString(props.offer.description)}
          </Typography>
        </CardContent>
        <Button
          color="primary"
          className={classes.cardActionButton}
          onClick={() => handleOpenOfferView(props.offer)}
        >
          {t('cardsSection.moreInfo')}
        </Button>

      </Card>
    )
  }
  OfferCard.propTypes = {
    offer: PropTypes.object
  }
  return (
    <Box className={classes.offersGridContainer} spacing={2}>
      <LoadOfferDesktop />
    </Box>
  )
}
ShowOffers.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool,
}
export default ShowOffers