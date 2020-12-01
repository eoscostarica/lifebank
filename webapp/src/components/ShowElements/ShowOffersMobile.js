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

import OfferView from '../../components/OfferView'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  list: {
    width: '100vw'
  },
  listItem: {
    width: '100%',
    backgroundColor: 'white'
  },
  secondaryIconList: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: 20,
    height: 20
  },
  listItemPrimaryText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.5,
    letterSpacing: '0.15px'
  },
  listItemSecondaryText: {
    color: 'color: rgba(0, 0, 0, 0.6)',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.43,
    letterSpacing: '0.25px'
  }
}))

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
            src={`//images.weserv.nl?url=${JSON.parse(props.offer.images)[0] || ''
              }&h=60&dpr=1`}
          >
            <LocalOfferIcon />
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
          <LocalOfferIcon className={classes.secondaryIconList} />
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
