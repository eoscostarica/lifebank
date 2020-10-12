
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
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

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

const ShowLifebanks = ({ banks, loading }) => {
  const classes = useStyles()

  const LoadBanks = () => {
    return (
      <>
        {loading &&
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        }
        {!loading && banks.length <= 0 && (
          <ListItem className={classes.listItem} >
            <ListItemText
              primary={
                <Typography className={classes.listItemPrimaryText} noWrap variant="body2">No blood bank available</Typography>
              }
            />
          </ListItem>
        )}
        {!loading && banks.length > 0 && banks.map(bank => (
          <BankItem
            key={bank.id}
            id={bank.id}
            name={bank.name}
            description={bank.info.description}
          />
        ))}
      </>
    )
  }

  const BankItem = (props) => {
    return (
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar>
            <LocalHospitalIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className={classes.listItemPrimaryText} noWrap variant="body2">{props.name}</Typography>
          }
          secondary={
            <Typography className={classes.listItemSecondaryText} noWrap variant="body2">{props.description}</Typography>
          }
        />
      </ListItem>

    )
  }

  BankItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }

  return (
    <List className={classes.list} >
      <LoadBanks />
    </List>

  )
}

ShowLifebanks.propTypes = {
  lifebanks: PropTypes.array,
  loading: PropTypes.bool,
}

export default ShowLifebanks
