import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { useLazyQuery } from '@apollo/react-hooks'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import TokenTransfer from '../../components/TokenTransfer'
import MapModal from '../../components/MapModal'
import ClaimReward from '../../components/ClaimReward'
import { useUser } from '../../context/user.context'

import { PROFILE_QUERY } from '../../gql'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: theme.spacing(6),
    alignItems: 'center',
    '& button': {
      marginBottom: theme.spacing(2)
    }
  },
  svgRoot: { width: 'auto', fontSize: 275 },
  infoLabel: {
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: '0.15px',
    textAlign: 'center',
    color: theme.palette.primary.mediumEmphasizedBlackText
  },
  title: {
    fontSize: 48
  },
  heart: {
    width: 'auto',
    fontSize: 275,
    animation: '$heartbeat 1.4s linear infinite'
  },
  '@keyframes heartbeat': {
    '0%': { transform: 'scale(1)' },
    '2%': { transform: 'scale(1)' },
    '4%': { transform: 'scale(1.08)' },
    '8%': { transform: 'scale(1.1)' },
    '20%': { transform: 'scale(0.96)' },
    '24%': { transform: 'scale(1.1)' },
    '32%': { transform: 'scale(1.08)' },
    '40%': { transform: 'scale(1)' }
  }
}))

const EmptyHeartSVG = ({ balance }) => {
  const classes = useStyles()

  return (
    <svg viewBox="0 0 800 700" className={classes.heart}>
      <path
        fill="#B71C1C"
        d="M514.672,106.17c-45.701,0-88.395,22.526-114.661,59.024c-26.284-36.505-68.981-59.024-114.683-59.024C207.405,106.17,144,169.564,144,247.5c0,94.381,57.64,144.885,124.387,203.358c38.983,34.149,83.17,72.856,119.654,125.332l12.267,17.641l11.854-17.924c35.312-53.388,78.523-91.695,120.305-128.734C596.006,390.855,656,337.654,656,247.5C656,169.564,592.604,106.17,514.672,106.17z M513.143,425.371c-36.93,32.729-78.27,69.373-113.402,117.391c-35.717-46.873-76.089-82.242-112.148-113.834c-63.944-56.01-114.447-100.26-114.447-181.428c0-61.868,50.325-112.186,112.184-112.186c43.196,0,83.034,25.395,101.491,64.697l13.191,28.105l13.19-28.112c18.443-39.303,58.273-64.69,101.472-64.69c61.866,0,112.185,50.317,112.185,112.186C626.856,324.548,576.673,369.047,513.143,425.371z"
      />
      {balance && (
        <>
          <g transform="translate(150, 200)">
            <path
              fill="#B71C1C"
              d="M 10,30 A 25,22 0,0,1 250,10 A 25,20 0,0,1 480,10 Q 550,80 240,360 Q 10,150 10,30 z"
            />
          </g>
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="200"
            fontFamily="Roboto"
            textRendering="geometricPrecision"
            lengthAdjust="spacingAndGlyphs"
            fill="#fff"
          >
            {balance}
          </text>
        </>
      )}
    </svg>
  )
}

const DonationPage = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [currentUser] = useUser()
  const history = useHistory()
  const [
    loadProfile,
    { data: { profile: { profile } = {} } = {}, client }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const tokens = profile?.balance.length
    ? profile.balance.join(',').split(' ')[0]
    : 0

  useEffect(() => {
    if (!currentUser) {
      client && client.resetStore()
      history.replace('/')

      return
    }

    loadProfile()
  }, [currentUser, history, client, loadProfile])

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        {t('donations.yourDonations')}
      </Typography>
      <EmptyHeartSVG balance={parseInt(tokens)} />
      <Typography variant="body1" className={classes.infoLabel}>
        {parseInt(tokens)
          ? t('donations.findAsponsor')
          : t('donations.youHavenotDonated')}
      </Typography>
      <Box className={classes.wrapper}>
        <MapModal useButton />
        <ClaimReward useButton profile={profile} />
        <TokenTransfer useButton />
      </Box>
    </Box>
  )
}

EmptyHeartSVG.propTypes = {
  balance: PropTypes.any
}

export default DonationPage
