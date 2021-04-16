import React, { forwardRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import * as m from 'moment-timezone'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import CarouselComponent from '../../components/Carousel'
import styles from './styles'

const useStyles = makeStyles(styles)

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const OfferDetails = ({ offer, open, setOpen }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const timezone = moment.tz.guess()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  return (
    <Dialog
      fullScreen={!isDesktop}
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <Box className={classes.contentIcon}>
        <Box className={classes.closeIcon}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box>
          <Typography className={classes.title}>
            {t('offersManagement.offerDetails')}
          </Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.rowBox}>
          <Typography variant="subtitle1">{t('common.description')}</Typography>
          <Typography >{offer.description}</Typography>
        </Box>
        <Divider className={classes.divider} />
        {offer.start_date &&
          <>
            <Box className={classes.rowBox}>
              <Typography variant="subtitle1">{t('offersManagement.startDate')}</Typography>
              <Typography >{m(offer.start_date)
                .tz(timezone)
                .format('DD MMMM YYYY, h:mm:ss a z')}</Typography>
            </Box>
            <Divider className={classes.divider} />
          </>
        }
        {offer.end_date &&
          <>
            <Box className={classes.rowBox}>
              <Typography variant="subtitle1">{t('offersManagement.endDate')}</Typography>
              <Typography >{m(offer.end_date)
                .tz(timezone)
                .format('DD MMMM YYYY, h:mm:ss a z')}</Typography>
            </Box>
            <Divider className={classes.divider} />
          </>
        }
        <Box className={classes.rowBox}>
          <Typography variant="subtitle1">{t('offersManagement.offerType')}</Typography>
          <Typography >{t(`categories.${offer.offer_type}`)}</Typography>
        </Box>
        <Divider className={classes.divider} />
        {offer.cost_in_tokens &&
          <>
            <Box className={classes.rowBox}>
              <Typography variant="subtitle1">{t('offersManagement.costInTokens')}</Typography>
              <Typography >{offer.cost_in_tokens}</Typography>
            </Box>
            <Divider className={classes.divider} />
          </>
        }
        {offer.quantity &&
          <>
            <Box className={classes.rowBox}>
              <Typography variant="subtitle1">{t('offersManagement.quantity')}</Typography>
              <Typography >{offer.quantity}</Typography>
            </Box>
            <Divider className={classes.divider} />
          </>
        }
        <Box className={classes.rowBox}>
          <Typography variant="subtitle1">{t('miscellaneous.location')}</Typography>
          <Typography >{offer.online_only
            ? t('offersManagement.onlineOnly')
            : t('offersManagement.physicalLocation')}</Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.rowBox}>
          <Typography variant="subtitle1">{t('profile.images')}</Typography>
        </Box>
        <Box className={classes.carouselContainer}>
          <CarouselComponent
            images={
              typeof offer.images === 'string'
                ? JSON.parse(offer.images)
                : offer.images
            }
          />
        </Box>
      </Box>
    </Dialog>
  )
}

OfferDetails.propTypes = {
  offer: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func
}

export default OfferDetails
