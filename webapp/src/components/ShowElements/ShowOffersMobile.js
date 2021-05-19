import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import { useTranslation } from 'react-i18next'
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

import OfferView from '../../components/OfferView'
import styles from './styles'

const useStyles = makeStyles(styles)

const ShowOffersMobile = ({ offers, loading }) => {
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

  const LoadOffers = () => {
    return (
      <>
        {loading && (
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        )}
        {!loading && offers.length <= 0 && (
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <Typography
                  className={classes.listItemPrimaryText}
                  noWrap
                  variant="body2"
                >
                  {t('miscellaneous.noOffersAvailable')}
                </Typography>
              }
            />
          </ListItem>
        )}
        {!loading &&
          offers.length > 0 &&
          offers.map((offer) => <OfferItem key={offer.id} offer={offer} />)}
        {selectOffer && (
          <OfferView
            selectOffer={selectOffer}
            isDesktop={false}
            openOfferView={openOfferView}
            handleCloseOfferView={handleCloseOfferView}
          />
        )}
      </>
    )
  }

  const OfferItem = (props) => {
    return (
      <ListItem
        className={classes.listItem}
        button
        onClick={() => handleOpenOfferView(props.offer)}
      >
        <ListItemAvatar>
          <Avatar
            src={
              props.offer.images[0] !== ''
                ? `//images.weserv.nl?url=${JSON.parse(props.offer.images)[0]
                }&h=60&dpr=1`
                : ''
            }
          >
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              className={classes.listItemPrimaryText}
              noWrap
              variant="body2"
            >
              {props.offer.offer_name}
            </Typography>
          }
          secondary={
            <Typography
              className={classes.listItemSecondaryText}
              noWrap
              variant="body2"
            >
              {props.offer.description}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          {props.offer.icon === 'LocalOfferIcon' && (
            <LocalOfferIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'CardGiftcardIcon' && (
            <CardGiftcardIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'StarsIcon' && (
            <StarsIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'WhatshotIcon' && (
            <WhatshotIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'AccessTimeIcon' && (
            <AccessTimeIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'StorefrontIcon' && (
            <StorefrontIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'TagFacesIcon' && (
            <TagFacesIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'ShoppingBasketIcon' && (
            <ShoppingBasketIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'RestaurantIcon' && (
            <RestaurantIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'FilterVintageIcon' && (
            <FilterVintageIcon className={classes.secondaryIconList} />
          )}
          {props.offer.icon === 'OutdoorGrillIcon' && (
            <OutdoorGrillIcon className={classes.cardIconOffer} />
          )}
          {props.offer.icon === 'OfflineBoltIcon' && (
            <OfflineBoltIcon className={classes.cardIconOffer} />
          )}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  OfferItem.propTypes = {
    offer: PropTypes.object
  }

  return (
    <List className={classes.list}>
      <LoadOffers />
    </List>

  )
}

ShowOffersMobile.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool
}

export default ShowOffersMobile
