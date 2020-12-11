import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

const useStyles = makeStyles({
  popup: {
    maxHeight: '109px',
    padding: '0px !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '130px'
  },
  popupHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  ul: {
    margin: 0
  },
  boldText: {
    fontSize: '8px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2,
    letterSpacing: '0.4px',
    textAlign: 'left',
    color: '#000000'
  },
  title: {
    margin: 0,
    fontSize: '10px',
    lineHeight: '1.6',
    letterSpacing: '1.5px',
    width: '93px',
    height: '16px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: 'black'
  },
  row: {
    height: '16px',
    verticalAlign: 'middle'
  },
  overflowText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  button: {
    borderRadius: '20px',
    backgroundColor: '#ba0d0d',
    width: '84%',
    marginTop: '4px',
    height: '20px',
    fontSize: '12px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff'
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

      JSON.parse(info.schedule).forEach((element) => {
        if (dd === element.day)
          if (
            hour >= parseInt(element.open, 10) &&
            hour < parseInt(element.close, 10)
          )
            setOpen(true)
      })
    }
  })

  var isMobile = {
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
      <span className={clsx(classes.title, classes.overflowText)}>
        {info.name}
      </span>
      <div className={clsx(classes.popupHeader, classes.row)}>
        <span
          style={{ marginRight: '5px' }}
          className={clsx(classes.overflowText, classes.boldText)}
        >
          {info.business_type || t('miscellaneous.donationCenter')}
        </span>
        <span
          style={{ color: open ? '#00b13c' : '#ba0d0d', marginLeft: '5px' }}
          className={clsx(classes.boldText)}
        >
          {t(`miscellaneous.${open ? 'openNow' : 'closeNow'}`)}
        </span>
      </div>

      {JSON.parse(info.telephones).length > 0 && (
        <div style={{ alignSelf: 'flex-start' }} className={classes.row}>
          <span className={classes.boldText}>
            Tel: &nbsp;
            <a href={`tel: ${info.telephones}`}>
              {JSON.parse(info.telephones)[0]}
            </a>
          </span>
        </div>
      )}
      {info.address && info.address !== '' && (
        <div
          style={{ alignSelf: 'flex-start', marginBottom: '3px' }}
          className={classes.row}
        >
          <span className={classes.boldText}>
            {t('signup.address')}: &nbsp;
            <a
              href={goto()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 'normal' }}
            >
              {info.address}
            </a>
          </span>
        </div>
      )}
      <Button
        variant="contained"
        color="secondary"
        href={`https://lifebank.io/info/${username}`}
        className={classes.button}
      >
        {t('cardsSection.moreInfo')}
      </Button>
    </div>
  )
}

MapPopup.propTypes = {
  id: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
}

export default MapPopup
