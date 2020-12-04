import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import StorefrontIcon from '@material-ui/icons/Storefront'
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
  }
}))

const ShowSponsorsMobile = ({ sponsors, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  const LoadSponsors = () => {
    return (
      <>
        {loading && (
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        )}
        {!loading && sponsors.length <= 0 && (
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <Typography
                  className={classes.listItemPrimaryText}
                  noWrap
                  variant="body2"
                >
                  {t('miscellaneous.noSponsorsAvailable')}
                </Typography>
              }
            />
          </ListItem>
        )}
        {!loading &&
          sponsors.length > 0 &&
          sponsors.map((sponsor) => (
            <SponsorItem key={sponsor.userName} sponsor={sponsor} />
          ))}
      </>
    )
  }

  const SponsorItem = (props) => (
    <LinkRouter
      style={{ textDecoration: 'none' }}
      to={{
        pathname: `info/${props.sponsor.userName.replaceAll(' ', '-')}`,
        state: { profile: props.sponsor }
      }}
    >
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar
            src={props.sponsor.logo !== '' ? `//images.weserv.nl?url=${props.sponsor.logo}` : ''}
          >
            <StorefrontIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              className={classes.listItemPrimaryText}
              noWrap
              variant="body2"
            >
              {props.sponsor.name}
            </Typography>
          }
          secondary={
            <Typography
              className={classes.listItemSecondaryText}
              noWrap
              variant="body2"
            >
              {props.sponsor.businessType}
            </Typography>
          }
        />
      </ListItem>
    </LinkRouter>
  )

  SponsorItem.propTypes = {
    sponsor: PropTypes.object
  }

  return (
    <List className={classes.list}>
      <LoadSponsors />
    </List>

  )
}

ShowSponsorsMobile.propTypes = {
  sponsors: PropTypes.array,
  loading: PropTypes.bool,
}

export default ShowSponsorsMobile