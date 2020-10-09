import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
  },
  list: {
    width: "100vw",
  },
  listItem: {
    width: "100%",
    backgroundColor: "white"
  }
  , secondaryIconList: {
    color: "rgba(0, 0, 0, 0.6)",
    width: 20,
    height: 20
  },
  listItemPrimaryText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "0.15px",
  },
  listItemSecondaryText: {
    color: "color: rgba(0, 0, 0, 0.6)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.43,
    letterSpacing: "0.25px",
  },


  modal: {
    position: 'absolute',
    width: 400,
    border: '0px',
    backgroundColor: '#FFF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: theme.spacing(4)
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15
  },
  infoText: {
    fontSize: 30,
    marginBottom: theme.spacing(4)
  },
}))


const ShowOffers = ({ offers, loading }) => {
  const classes = useStyles()

  const LoadOffers = () => {
    return (
      <>
        {loading &&
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>

        }
        {!loading && offers.length <= 0 && (
          <ListItem className={classes.listItem} >
            <ListItemText
              primary={
                <Typography className={classes.listItemPrimaryText} noWrap variant="body2">No offers available</Typography>
              }
            />
          </ListItem>
        )}
        {!loading && offers.length > 0 && offers.map(offer => (
          <OfferItem
            key={offer.id}
            id={offer.id}
            title={offer.offer_name}
            description={offer.description}
            img={offer.images}
          />
        ))}
      </>
    )
  }

  const OfferItem = (props) => {

    return (
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar src={props.img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.listItemPrimaryText} noWrap variant="body2">{props.title}</Typography>
          }
          secondary={
            <Typography className={classes.listItemSecondaryText} noWrap variant="body2">{props.description}</Typography>
          }
        />
        <ListItemSecondaryAction>
          <LocalOfferIcon className={classes.secondaryIconList} />
        </ListItemSecondaryAction>
      </ListItem>

    )
  }

  OfferItem.propTypes = {
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }

  return (
    <List className={classes.list} >
      <LoadOffers />
    </List>

  )
}

ShowOffers.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool,
}

export default ShowOffers
