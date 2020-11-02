import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useTranslation } from 'react-i18next'

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
  lifebanksGridContainer: {
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

const ShowLifebanks = ({ banks, loading, isDesktop }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  const LoadBanks = () => {
    return (
      <>
        {loading && (
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        )}
        {!loading && banks.length <= 0 && (
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <Typography
                  className={classes.listItemPrimaryText}
                  noWrap
                  variant="body2"
                >
                  {t('miscellaneous.noBloodBank')}
                </Typography>
              }
            />
          </ListItem>
        )}
        {!loading &&
          banks.length > 0 &&
          banks.map((bank) => (
            <BankItem key={bank.id} bank={bank} />
          ))}
      </>
    )
  }

  const BankItem = (props) => (
    <LinkRouter
      style={{ textDecoration: 'none' }}
      to={{
        pathname: `info/${props.bank.user.username.replaceAll(' ', '-')}`,
        state: { profile: props.bank }
      }}
    >
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar src={props.bank.info.logo_url || ""}>
            <LocalHospitalIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              className={classes.listItemPrimaryText}
              noWrap
              variant="body2"
            >
              {props.bank.name}
            </Typography>
          }
          secondary={
            <Typography
              className={classes.listItemSecondaryText}
              noWrap
              variant="body2"
            >
              {props.bank.info.about}
            </Typography>
          }
        />
      </ListItem>
    </LinkRouter>
  )

  BankItem.propTypes = {
    bank: PropTypes.object,
  }

  const LoadBanksDesktop = () => {
    return (
      <>
        {loading && (
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        )}
        {!loading && banks.length <= 0 && (
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
                {t('miscellaneous.noBloodBank')}
              </Typography>
            </Grid>
          </Card>
        )}
        {!loading &&
          banks.length > 0 &&
          banks.map((bank) => (
            <BankCard key={bank.id} bank={bank} />
          ))}
      </>
    )
  }

  const truncateString = (str) => {
    const num = 55

    if (str.length <= num) return str

    return str.slice(0, num) + '...'
  }

  const BankCard = (props) => (
    <Card className={classes.cardRoot}>
      <Box className={classes.cardHeader}>
        <Avatar className={classes.cardAvatar} src={props.bank.info.logo_url || ""}>
          <LocalHospitalIcon />
        </Avatar>
        <Box className={classes.cardTitleContainer}>
          <Typography className={classes.cardTitle} noWrap>
            {props.bank.info.name}
          </Typography>
        </Box>
      </Box>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardContentText}>
          {truncateString(props.bank.info.about)}
        </Typography>
      </CardContent>
      <LinkRouter
        style={{ textDecoration: 'none' }}
        to={{
          pathname: `info/${props.bank.user.username.replaceAll(' ', '-')}`,
          state: { profile: props.bank }
        }}
      >
        <Button color="primary" className={classes.cardActionButton}>
          {t('cardsSection.moreInfo')}
        </Button>
      </LinkRouter>
    </Card>
  )

  BankCard.propTypes = {
    bank: PropTypes.object,
  }

  return (
    <>
      {!isDesktop && (
        <List className={classes.list}>
          <LoadBanks />
        </List>
      )}
      {isDesktop && (
        <Box className={classes.lifebanksGridContainer}>
          <LoadBanksDesktop />
        </Box>
      )}
    </>
  )
}

ShowLifebanks.propTypes = {
  banks: PropTypes.array,
  loading: PropTypes.bool,
  isDesktop: PropTypes.bool
}

export default ShowLifebanks
