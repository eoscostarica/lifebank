
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import StorefrontIcon from '@material-ui/icons/Storefront';

import { GET_LOCATIONS_QUERY } from '../../gql'

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
}))



const Sponsors = () => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(true);
  const [sponsors, setSponsors] = React.useState([]);


  const { refetch: getAllSponsors } = useQuery(GET_LOCATIONS_QUERY, {}, { skip: true })

  const getSponsors = async () => {
    const { data } = await getAllSponsors({})
    let dataTemp = data.location
    dataTemp = dataTemp.filter(bank => bank.type === "SPONSOR")
    setSponsors(dataTemp)
    setLoading(false)
  }

  useEffect(() => {
    getSponsors()
  }, [getAllSponsors])


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
    //const LinkTo = "/offer/" + props.id

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

  return (
    <List className={classes.list} >
      <LoadSponsors />
    </List>

  )
}

export default Sponsors