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
import Divider from '@material-ui/core/Divider'
import OfferView from '../../components/OfferView'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
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
    width: '100%',
    height: '100%',
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  cardRoot: {
    whiteSpace: 'normal',
    display: 'inline-block',
    position: 'relative',
    width: '265px',
    height: '145px',
    padding: 10,
    marginBottom: 15,
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
    color: 'rgba(0, 0, 0, 0.6)',
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
  },
  categories: {
    position: 'absolute',
  }
}))
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
          <LocalOfferIcon className={classes.cardIconOffer} />
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