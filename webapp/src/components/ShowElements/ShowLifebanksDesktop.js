import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const useStyles = makeStyles(styles)

const ShowLifebanks = ({ banks, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

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
          banks.map((bank) => <BankCard key={bank.userName} bank={bank} />)}
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
        <Avatar
          className={classes.cardAvatar}
          src={props.bank.logo !== '' ? `//images.weserv.nl?url=${props.bank.logo}` : ''}
        >
          <LocalHospitalIcon />
        </Avatar>
        <Box className={classes.cardTitleContainer}>
          <Typography className={classes.cardTitle} noWrap>
            {props.bank.name}
          </Typography>
        </Box>
      </Box>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardContentText}>
          {truncateString(props.bank.description)}
        </Typography>
      </CardContent>
      <LinkRouter
        style={{ textDecoration: 'none' }}
        to={{
          pathname: `info/${props.bank.userName.replaceAll(' ', '-')}`,
          state: { profile: props.bank, isLifebank: true }
        }}
      >
        <Button color="primary" className={classes.cardActionButton}>
          {t('cardsSection.moreInfo')}
        </Button>
      </LinkRouter>
    </Card>
  )

  BankCard.propTypes = {
    bank: PropTypes.object
  }

  return (
    <Box className={classes.lifebanksGridContainer}>
      <LoadBanksDesktop />
    </Box>
  )
}

ShowLifebanks.propTypes = {
  banks: PropTypes.array,
  loading: PropTypes.bool
}

export default ShowLifebanks
