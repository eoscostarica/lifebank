import React from 'react'
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
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useTranslations } from 'react-i18next'

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
  offersGridContainer: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    paddingBottom: 5,
    paddingLeft: 5,
    '&::-webkit-scrollbar': {
      height: '0.5em'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,.05)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: '10px'
    }
  },
  cardRoot: {
    whiteSpace: 'normal',
    display: 'inline-block',
    position: 'relative',
    width: '265px',
    height: '145px',
    padding: 10,
    marginRight: theme.spacing(2)
  },
  cardHeader: {
    padding: 0,
    margin: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cardAvatar: {
    height: '40px',
    width: '40px'
  },
  cardTitleContainer: {
    width: '60%'
  },
  cardTitle: {
    marginLeft: 7,
    marginTop: 10,
    width: '100%',
    fontFamily: 'Roboto',
    fontsize: '16px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.15px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  cardIconOffer: {
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.6)',
    width: 20,
    height: 20,
    top: 20,
    right: 15
  },
  cardContent: {
    marginTop: 10,
    padding: 0
  },
  cardContentText: {
    fontFamily: 'Roboto',
    fontsize: '14px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  cardActions: {
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  cardActionButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    fontFamily: 'Roboto',
    fontsize: '14px',
    fontweight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1',
    textAlign: 'center',
    color: '#121212'
  }
}))

const ShowOffers = ({ offers, loading, isDesktop }) => {
  const { t } = useTranslations('translations')
  const classes = useStyles()

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
          offers.map((offer) => (
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
            <Typography
              className={classes.listItemPrimaryText}
              noWrap
              variant="body2"
            >
              {props.title}
            </Typography>
          }
          secondary={
            <Typography
              className={classes.listItemSecondaryText}
              noWrap
              variant="body2"
            >
              {props.description}
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
    img: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
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
          offers.map((offer) => (
            <OfferCard
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

  const truncateString = (str) => {
    const num = 55

    if (str.length <= num) return str

    return str.slice(0, num) + '...'
  }

  const OfferCard = (props) => {
    return (
      <Card className={classes.cardRoot}>
        <Box className={classes.cardHeader}>
          <Avatar className={classes.cardAvatar} src={props.img} />
          <Box className={classes.cardTitleContainer}>
            <Typography className={classes.cardTitle} noWrap>
              {props.title}
            </Typography>
          </Box>
          <LocalOfferIcon className={classes.cardIconOffer} />
        </Box>
        <CardContent className={classes.cardContent}>
          <Typography paragraph className={classes.cardContentText}>
            {truncateString(props.description)}
          </Typography>
        </CardContent>
        <Button color="primary" className={classes.cardActionButton}>
          {t('cardsSection.moreInfo')}
        </Button>
      </Card>
    )
  }

  OfferCard.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }

  return (
    <>
      {!isDesktop && (
        <List className={classes.list}>
          <LoadOffers />
        </List>
      )}
      {isDesktop && (
        <Box className={classes.offersGridContainer} spacing={2}>
          <LoadOfferDesktop />
        </Box>
      )}
    </>
  )
}

ShowOffers.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool,
  isDesktop: PropTypes.bool
}

export default ShowOffers
