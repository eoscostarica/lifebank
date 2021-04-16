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
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const useStyles = makeStyles(styles)

const ShowLifebanksMobile = ({ banks, loading }) => {
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
          banks.map((bank) => <BankItem key={bank.userName} bank={bank} />)}
      </>
    )
  }

  const BankItem = (props) => (
    <LinkRouter
      style={{ textDecoration: 'none' }}
      to={{
        pathname: `info/${props.bank.userName.replaceAll(' ', '-')}`,
        state: { profile: props.bank, isLifebank: true }
      }}
    >
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar
            src={props.bank.logo !== '' ? `//images.weserv.nl?url=${props.bank.logo}` : ''}
          >
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
              {props.bank.description}
            </Typography>
          }
        />
      </ListItem>
    </LinkRouter>
  )

  BankItem.propTypes = {
    bank: PropTypes.object
  }

  return (
    <List className={classes.list}>
      <LoadBanks />
    </List>
  )
}

ShowLifebanksMobile.propTypes = {
  banks: PropTypes.array,
  loading: PropTypes.bool
}

export default ShowLifebanksMobile
