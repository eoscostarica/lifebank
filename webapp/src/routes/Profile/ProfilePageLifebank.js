import CarouselComponent from '../../components/Carousel'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Link as LinkRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import { useQuery } from '@apollo/react-hooks'
import '@brainhubeu/react-carousel/lib/style.css'

import 'date-fns'
import { useTranslation } from 'react-i18next'

import Schedule from '../../components/Schedule'
import MapShowOneLocation from '../../components/MapShowOneLocation'
import { GET_USERNAME } from '../../gql'

const { eosConfig } = require('../../config')


const useStyles = makeStyles((theme) => ({
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText,
      textTransform: 'capitalize'
    }
  },
  carouselComponent: {
    justifyContent: 'center',
    justifySelf: 'center'
  },
  divider: {
    width: '100%'
  },
  editBtn: {
    margin: theme.spacing(2, 0)
  },
  secondaryText: {
    color: `${theme.palette.secondary.main} !important`
  },
  carouselDiv: {
    width: '100%',
    objectFit: 'cover'
  },
  img: {
    width: '65px',
    objectFit: 'cover',
    height: '65px',
    borderRadius: '50%',
    marginBottom: '30px'
  },
  divProgressProfile: {
    width: '100%',
    marginBottom: '40px'
  },
  telephonesStyle: {
    width: '100%',
    marginBottom: '6px',
    color: theme.palette.secondary.onSecondaryMediumEmphasizedText
  }
}))

const ProfilePageLifebank = ({ profile }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [userName, setuserName] = useState()
  const [pendingFields, setPendingFields] = useState()

  const { refetch: getData } = useQuery(GET_USERNAME, {
    variables: {
      account: '12letterlife'
    },
    skip: true
  })

  useEffect(() => {
    const getUsername = async () => {
      const { data } = await getData({
        account: '12letterlife'
      })

      if (data) setuserName(data.user[0].username)
    }

    if (!userName) getUsername()
  })

  const checkAvailableFields = () => {
    let pendingFieldsObject = {}

    if (!profile.email)
      pendingFieldsObject = { ...pendingFieldsObject, email: false }

    if (!profile.name)
      pendingFieldsObject = { ...pendingFieldsObject, name: false }

    if (!profile.phone_number)
      pendingFieldsObject = { ...pendingFieldsObject, phone_number: false }

    if (!profile.photos)
      pendingFieldsObject = { ...pendingFieldsObject, photos: false }

    if (!profile.logo_url)
      pendingFieldsObject = { ...pendingFieldsObject, logo_url: false }

    if (!profile.schedule)
      pendingFieldsObject = { ...pendingFieldsObject, schedule: false }

    if (!profile.location)
      pendingFieldsObject = { ...pendingFieldsObject, location: false }

    if (!profile.address)
      pendingFieldsObject = { ...pendingFieldsObject, address: false }

    if (!profile.description)
      pendingFieldsObject = { ...pendingFieldsObject, description: false }

    if (!profile.blood_urgency_level)
      pendingFieldsObject = { ...pendingFieldsObject, blood_urgency_level: false }

    if (Object.keys(pendingFieldsObject).length > 0)
      setPendingFields(pendingFieldsObject)
  }

  useEffect(() => {
    if (profile) {
      //if (profile.photos) profile.photos = JSON.parse(profile.photos)
      //if (profile.telephones)
      //profile.telephones = JSON.parse(profile.telephones)
      checkAvailableFields()
    }
  }, [profile])
  console.log("profile", JSON.parse(profile.telephones))
  return (
    <>
      <div className={classes.divProgressProfile}>
        {pendingFields && (
          <Grid style={{ maxWidth: 500, margin: 'auto' }} item>
            <Alert
              action={
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <LinkRouter
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: '/edit-profile',
                      state: { isCompleting: true, userName: userName }
                    }}
                  >
                    <Button
                      color="secondary"
                      className={classes.noCapitalize}
                      classes={{
                        root: classes.editBtn
                      }}
                    >
                      Update
                    </Button>
                  </LinkRouter>
                </Box>
              }
              className={classes.alert}
              severity="info"
            >
              <Typography>Your profile is not complete </Typography>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    className={classes.customizedLinearProgress}
                    value={
                      ((10 - Object.keys(pendingFields).length) * 100) / 10
                    }
                  />
                </Box>
                <Box minWidth={35}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`${Math.round(
                    ((10 - Object.keys(pendingFields).length) * 100) / 10
                  )}%`}</Typography>
                </Box>
              </Box>
            </Alert>
          </Grid>
        )}
      </div>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Logo</Typography>
        <img className={classes.img} src={profile.logo_url} alt={'logo image'} />
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">URL site</Typography>

        <a variant="body1" href={'https://lifebank.io/info/' + userName}> {'lifebank.io/info/' + userName}</a>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.account')}</Typography>
        <Typography variant="body1">
          <Link
            href={`${eosConfig.BLOCK_EXPLORER_URL}account/${profile.account}`}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            {profile.account}
          </Link>
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('profile.organization')}</Typography>
        <Typography variant="body1">{profile.name}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('profile.role')}</Typography>
        <Typography variant="body1">{profile.role}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.email')}</Typography>
        <Typography variant="body1">{profile.email}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('signup.address')}</Typography>
        <Typography variant="body1">{profile.address}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.telephone')}</Typography>
      </Box>
      <Box style={{ textAlign: 'right', width: '100%', paddingRight: '1%' }}>
        {JSON.parse(profile.telephones).length > 0 && JSON.parse(profile.telephones).map((phoneNumber, index) => (
          <Typography className={classes.telephonesStyle} key={index} variant="body1">{phoneNumber}</Typography>
        ))}
      </Box>

      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('profile.consent')}</Typography>
        <Typography variant="body1">{`${profile.consent}`}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('profile.communityAsset')}
        </Typography>
        <Typography variant="body1" className={classes.secondaryText}>
          {profile.community_asset}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('profile.hasImmunityTest')}
        </Typography>
        <Typography variant="body1">{`${Boolean(
          profile.has_inmmunity_test
        )}`}</Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.bloodUrgency')}</Typography>
        <Typography variant="body1" className={classes.secondaryText}>
          {profile.blood_urgency_level}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('common.schedule')}</Typography>
        <Typography variant="body1" />
      </Box>
      <Schedule
        data={JSON.parse(profile.schedule)}
        showSchedule
        showButton={false}
      />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">
          {t('profile.benefitDescription')}
        </Typography>
        <Typography variant="body1" />
      </Box>
      <TextField
        id="benefitDescription"
        variant="outlined"
        disabled
        defaultValue={profile.description}
        InputLabelProps={{
          shrink: true
        }}
        multiline
        fullWidth
        rows={3}
      />
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">Images</Typography>
        <Typography variant="body1" />
      </Box>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        className={classes.carouselComponent}
      >
        <CarouselComponent images={JSON.parse(profile.photos)} />
      </Grid>
      <Box className={classes.rowBox}>
        <Typography variant="subtitle1">{t('profile.location')}</Typography>
        <Typography variant="body1" />
      </Box>
      <MapShowOneLocation
        markerLocation={JSON.parse(profile.location)}
        accountProp={profile.account}
        width="100%"
        height={400}
        py={2}
      />
      <Divider className={classes.divider} />
      <LinkRouter to={{ pathname: '/edit-profile', state: { isCompleting: false, userName: userName } }} className={classes.editBtn}>
        <Button variant="contained" color="primary">
          {t('common.edit')}
        </Button>
      </LinkRouter>
    </>
  )
}

ProfilePageLifebank.propTypes = {
  profile: PropTypes.object
}

export default ProfilePageLifebank
