import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  popup: {},
  ul: {
    margin: 0
  },
  title: {
    margin: '6px',
    fontSize: '16px',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.6,
    letterSpacing: '1.5px',
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  link: {
    textDecoration: 'none'
  },
  subTitule: {
    width: '100%',
    height: '16px',
    fontSize: '14px',
    fontStretch: 'normal',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 2,
    letterSpacing: '0.4px',
    color: '#000000'
  },
  bodytext:{
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.4px',
    textAlign: 'left',
    color: '#000000'
  },
  openingHourseText: {
    width: '35%',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.4px',
    textAlign: 'right',
    float: 'left'
    },
    closeColor: {
      color: '#ba0d0d'
    },
    openColor: {
      color: '#00b13c'
    },
    mediumDiv:{
      height: "100%",
      width: '65%',
      float: 'left'
    },
    button: {
      marginTop: '6%',
      marginLeft: '15%',
      marginRight: '15%',
      borderRadius: '50px',
      backgroundColor: '#ba0d0d',
      width: "70%",
      height: '25px',
      fontSize: '14px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.14,
      letterSpacing: '1px',
      color: '#ffffff'
    },
}))

// TODO: Improve styles and add a Link using the id to navigate to the detail screen of the SPONSOR | LIFE_BANK.
function MapPopup({ id, info, username }) {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const open = useState(true)
  const history = useHistory()

  var isMobile = {
    platform: function () {
      return navigator.platform.match(
        /Android|Linux|iPhone|iPod|iPad|iPhone Simulator|iPod Simulator|iPad Simulator|Pike v7.6 release 92|Pike v7.8 release 517/i
      )
    }
  }

  const goto = () => {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i) && isMobile.platform()) {
      return `maps:0,0?q=${info.geolocation.latitude},${info.geolocation.longitude}`
    } else if (
      navigator.userAgent.match(/Android|BlackBerry|Opera Mini/i) &&
      isMobile.platform()
    ) {
      return `geo:0,0?q=${info.geolocation.latitude},${info.geolocation.longitude}`
    } else {
      return `https://maps.google.com/maps?q=${info.geolocation.latitude},${info.geolocation.longitude}`
    }
  }

  const moreInfo = () =>{
    history.push('/internal-error')
  }

  return (
    <Box key={id}>
      <Typography className={classes.title}>{info.name} </Typography>
      <div style={{width:'100%', marginBottom: '22px'}}>
        <div className={classes.mediumDiv}>
          <Typography className={classes.subTitule}> {info.business_type || t('miscellaneous.donationCenter')} </Typography>
        </div>
        
          <Typography className={clsx(classes.openingHourseText,classes.openColor)}> Open now </Typography>
        
      </div>
      <div className={classes.bodytext}>
      <Typography className={classes.bodytext}>
        {'Tel: '}
        <a
          href={`tel: ${info.telephones}`}
          className={classes.link}
        >
          {JSON.parse(info.telephones)[0]}
        </a>
      </Typography>
      </div>
      <div className={classes.bodytext}>
        <Typography className={classes.bodytext}>
        {`${t('signup.address')}: `}
          <a
            className={classes.link}
            href={goto()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {info.address}
          </a>
        </Typography>
      </div>
        <Button
          variant="contained"
          color="secondary"
          href={`https://lifebank.io/info/${username}`}
          className={classes.button}
        >
          {t('cardsSection.moreInfo')}
        </Button>
    </Box>
  )
}

MapPopup.propTypes = {
  id: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired
}

export default MapPopup
