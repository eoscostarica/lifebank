import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useTranslation } from 'react-i18next'
import styles from './styles'

const useStyles = makeStyles(styles)

const ShowSponsors = ({ sponsors, loading }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  const LoadSponsorsDesktop = () => {
    return (
      <>
        {loading && (
          <Box className={classes.wrapper}>
            <CircularProgress />
          </Box>
        )}
        {!loading && sponsors.length <= 0 && (
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
                {t('miscellaneous.noSponsorsAvailable')}
              </Typography>
            </Grid>
          </Card>
        )}
        {!loading &&
          sponsors.length > 0 &&
          sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.userName} sponsor={sponsor} />
          ))}
      </>
    )
  }

  const truncateString = (str) => {
    const num = 55

    if (str.length <= num) return str

    return str.slice(0, num) + '...'
  }

  const SponsorCard = (props) => (
    <Card className={classes.cardRoot}>
      <Box className={classes.cardHeader}>
        <Avatar
          className={classes.cardAvatar}
          src={props.sponsor.logo !== '' ? `//images.weserv.nl?url=${props.sponsor.logo}` : ''}
        >
          <StorefrontIcon />
        </Avatar>
        <Box className={classes.cardTitleContainer}>
          <Typography className={classes.cardTitle} noWrap>
            {props.sponsor.name}
          </Typography>
        </Box>
      </Box>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardContentText}>
          {truncateString(props.sponsor.description)}
        </Typography>
      </CardContent>
      <LinkRouter
        style={{ textDecoration: 'none' }}
        to={{
          pathname: `info/${props.sponsor.userName.replaceAll(' ', '-')}`,
          state: { profile: props.sponsor }
        }}
      >
        <Button color="primary" className={classes.cardActionButton}>
          {t('cardsSection.visitPage')}
        </Button>
      </LinkRouter>
    </Card>
  )

  SponsorCard.propTypes = {
    sponsor: PropTypes.object
  }

  return (
    <Box className={classes.sponsorsGridContainer}>
      <LoadSponsorsDesktop />
    </Box>
  )
}

ShowSponsors.propTypes = {
  sponsors: PropTypes.array,
  loading: PropTypes.bool,
}

export default ShowSponsors
