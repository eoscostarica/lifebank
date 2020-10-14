
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'


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
  sponsorsGridContainer: {
    width: "100%",
    marginTop: 15,
    marginBottom: 15
  },
  cardRoot: {
    position: "relative",
    width: "100%",
    height: "100%",
    padding: 10,
    height: "145px",
  },
  cardHeader: {
    padding: 0,
    margin: 0,
    width: "100%",
    display: "flex",
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardAvatar: {
    height: "40px",
    width: "40px",
  },
  cardTitleContainer: {
    width: "60%"
  },
  cardTitle: {
    marginLeft: 7,
    marginTop: 10,
    width: "100%",
    fontFamily: "Roboto",
    fontsize: "16px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "0.15px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.87)",
  },
  cardIconOffer: {
    position: "absolute",
    color: "rgba(0, 0, 0, 0.6)",
    width: 20,
    height: 20,
    top: 20,
    right: 15
  },
  cardContent: {
    marginTop: 10,
    padding: 0,
  },
  cardContentText: {
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "0.25px",
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.6)",
  },
  cardActions: {
    padding: 0,
    width: "100%",
    display: "flex",
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  cardActionButton: {
    position: "absolute",
    bottom: 10,
    right: 15,
    fontFamily: "Roboto",
    fontsize: "14px",
    fontweight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.14",
    letterSpacing: "1",
    textAlign: "center",
    color: "#121212",
  }
}))

const ShowSponsors = ({ sponsors, loading, isDesktop }) => {
  const classes = useStyles()

  const LoadSponsors = () => {
    return (
      <>
        {loading &&
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        }
        {!loading && sponsors.length <= 0 && (
          <ListItem className={classes.listItem} >
            <ListItemText
              primary={
                <Typography className={classes.listItemPrimaryText} noWrap variant="body2">No sponsors available</Typography>
              }
            />
          </ListItem>
        )}
        {!loading && sponsors.length > 0 && sponsors.map(sponsor => (
          <SponsorItem
            key={sponsor.id}
            id={sponsor.id}
            name={sponsor.name}
            bussines_type={sponsor.info.bussines_type}
          />
        ))}
      </>
    )
  }

  const SponsorItem = (props) => {

    return (
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar>
            <StorefrontIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.listItemPrimaryText} noWrap variant="body2">{props.name}</Typography>
          }
          secondary={
            <Typography className={classes.listItemSecondaryText} noWrap variant="body2">{props.bussines_type}</Typography>
          }
        />
      </ListItem>

    )
  }

  SponsorItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    bussines_type: PropTypes.string,
  }


  const LoadSponsorsDesktop = () => {
    return (
      <>
        {loading &&
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        }
        {!loading && sponsors.length <= 0 && (
          <Grid item xs={2}>
            <Card className={classes.cardRoot}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ height: "100%" }}
              >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  No sponsors available
              </Typography>
              </Grid>
            </Card>
          </Grid>
        )}
        {!loading && sponsors.length > 0 && sponsors.map(sponsor => (
          <Grid item md={3} lg={2}>
            <SponsorCard
              key={sponsor.id}
              id={sponsor.id}
              name={sponsor.name}
              description={sponsor.info.benefit_description}
            />
          </Grid>
        ))}
      </>
    )
  }

  const truncateString = (str) => {
    const num = 55

    if (str.length <= num) {
      return str
    }

    return str.slice(0, num) + '...'
  }


  const SponsorCard = (props) => {

    return (
      <Card className={classes.cardRoot}>
        <Box className={classes.cardHeader}>
          <Avatar className={classes.cardAvatar} src={props.img} >
            <StorefrontIcon />
          </Avatar>
          <Box className={classes.cardTitleContainer}>
            <Typography className={classes.cardTitle} noWrap>
              {props.name}
            </Typography>
          </Box>
        </Box>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardContentText} >{truncateString(props.description)}
          </Typography>
        </CardContent>
        <Button color="primary" className={classes.cardActionButton}>
          more info
        </Button>
      </Card>
    )
  }

  SponsorCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }


  return (

    <>
      {!isDesktop &&
        <List className={classes.list} >
          <LoadSponsors />
        </List>
      }
      {isDesktop &&
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.sponsorsGridContainer}
          spacing={2}
        >
          <LoadSponsorsDesktop />
        </Grid>
      }
    </>

  )
}

ShowSponsors.propTypes = {
  sponsors: PropTypes.array,
  loading: PropTypes.bool,
  isDesktop: PropTypes.bool,
}

export default ShowSponsors
