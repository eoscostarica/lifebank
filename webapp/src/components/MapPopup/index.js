import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  popup: {
    width: '250px',
    padding: "10px"
  },
  title: {
    fontFamily: "Roboto",
    fontSize: '16px',
    lineHeight: '1.6',
    letterSpacing: '1px',
    width: '90%',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: "bold",
    color: 'black',
    maxWidth: "100%",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  typeText: {
    fontFamily: "Roboto",
    fontSize: '14px',
    fontWeight: "bold",
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.4px',
    textAlign: 'left',
    color: '#000000',
    position: "absolute",
    top: 0,
    left: 0,
    maxWidth: "60%",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  closeText: {
    fontFamily: "Roboto",
    fontSize: '14px',
    fontWeight: "bold",
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.4px',
    textAlign: 'right',
    color: '#BA0D0D',
    position: "absolute",
    top: 0,
    right: 0
  },
  openText: {
    fontFamily: "Roboto",
    fontSize: '14px',
    fontWeight: "bold",
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.4px',
    textAlign: 'right',
    color: '#00B13C',
    position: "absolute",
    top: 0,
    right: 0
  },
  boldText: {
    fontFamily: "Roboto",
    fontSize: '14px',
    fontWeight: "bold",
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.4px',
    textAlign: 'left',
    color: '#000000',
    position: "absolute",
    top: 0,
    left: 0,
    maxWidth: "100%",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  addressText: {
    fontSize: '12px',
    height: '21px',
    lineHeight: '1.31',
    letterSpacing: '0.4px',
    maxWidth: '185px',
    width: '185px',
    textAlign: 'left'
  },
  row: {
    position: "relative",
    width: "90%",
    height: "20px",
    marginBottom: "5px"
  },
  rowButtom: {
    position: "relative",
    width: "90%",
    height: "50px",
  },
  button: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    borderRadius: '20px',
    backgroundColor: '#ba0d0d',
    margin: '4px 0',
    height: '30px',
    fontSize: '14px',
    fontWeight: "bold",
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    marginTop: "20px",
  }
})

const MapPopup = ({ id, info, username }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [open, setOpen] = useState()
  const toDay = new Date()
  let dd = toDay.getDay()
  const hour = toDay.getHours()

  useEffect(() => {
    if (!open) {
      switch (dd) {
        case 0:
          dd = 'Sunday'
          break
        case 1:
          dd = 'Monday'
          break
        case 2:
          dd = 'Tuesday'
          break
        case 3:
          dd = 'Wednesday'
          break
        case 4:
          dd = 'Thursday'
          break
        case 5:
          dd = 'Friday'
          break
        default:
          dd = 'Saturday'
      }
      
      if(info.schedule) {
        JSON.parse(info.schedule).forEach((element) => {
          if (dd === element.day)
            if (
              hour >= parseInt(element.open, 10) &&
              hour < parseInt(element.close, 10)
            )
              setOpen(true)
        })
      }
    }
  }, [dd, hour])

  const isMobile = {
    platform: function () {
      return navigator.platform.match(
        /Android|Linux|iPhone|iPod|iPad|iPhone Simulator|iPod Simulator|iPad Simulator|Pike v7.6 release 92|Pike v7.8 release 517/i
      )
    }
  }

  const goto = () => {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i) && isMobile.platform())
      return `maps:0,0?q=${info.geolocation.latitude},${info.geolocation.longitude}`
    else if (
      navigator.userAgent.match(/Android|BlackBerry|Opera Mini/i) &&
      isMobile.platform()
    )
      return `geo:0,0?q=${info.geolocation.latitude},${info.geolocation.longitude}`
    else
      return `https://maps.google.com/maps?q=${info.geolocation.latitude},${info.geolocation.longitude}`
  }

  return (
    <div className={classes.popup} key={id}>
      <h1 className={classes.title}>
        {info.name}
      </h1>
      <div className={classes.row}>
        <h2 className={classes.typeText} >{info.business_type || t('miscellaneous.donationCenter')}</h2>
        {open &&
          <h2 className={classes.openText} >{t('miscellaneous.openNow')}</h2>
        }
        {!open &&
          <h2 className={classes.closeText} >{t('miscellaneous.closeNow')}</h2>
        }
      </div>
      {JSON.parse(info.telephones).length > 0 && (
        <div className={classes.row}>
          <h2 className={classes.boldText} >Tel:&nbsp; <a href={`tel: ${info.telephones}`}>{JSON.parse(info.telephones)[0]}</a></h2>
        </div>
      )}
      <div className={classes.row}>
        <h2 className={classes.boldText} >
          {t('signup.address')}:{' '}
          <a
            href={goto()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {info.address}
          </a>
        </h2>
      </div>
      <div className={classes.rowButtom} >
        <Button
          variant="contained"
          color="secondary"
          href={`https://lifebank.io/info/${username}`}
          className={classes.button}
        >
          {t('cardsSection.moreInfo')}
        </Button>
      </div>
    </div>
  )
}

MapPopup.propTypes = {
  id: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
}

export default MapPopup
