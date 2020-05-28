import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import SvgIcon from '@material-ui/core/SvgIcon'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: theme.spacing(6),
    alignItems: 'center'
  },
  svgRoot: {
    width: 'auto',
    fontSize: 172,
    margin: theme.spacing(3)
  },
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
  labelBtn: {
    color: theme.palette.white
  },
  claimBtn: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(2)
  }
}))

const EmptyHeartSVG = () => {
  const classes = useStyles()

  return (
    <SvgIcon viewBox="0 0 206 206" classes={{ root: classes.svgRoot }}>
      <defs>
        <path
          id="prefix__a"
          d="M124.625.248C109.69.248 95.355 7.2 86 18.188 76.644 7.2 62.31.247 47.375.247 20.938.248.167 21.02.167 47.456c0 32.445 29.183 58.882 73.387 99.052L86 157.752l12.446-11.33c44.204-40.084 73.387-66.52 73.387-98.966 0-26.436-20.771-47.208-47.208-47.208zm-37.767 133.47l-.858.86-.858-.86C44.285 96.726 17.333 72.263 17.333 47.457c0-17.166 12.875-30.041 30.042-30.041 13.218 0 26.093 8.497 30.642 20.256h16.051c4.464-11.759 17.339-20.256 30.557-20.256 17.167 0 30.042 12.875 30.042 30.041 0 24.806-26.952 49.269-67.809 86.263z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(17 24)">
        <mask id="prefix__b" fill="#fff">
          <use href="#prefix__a" />
        </mask>
        <g mask="url(#prefix__b)">
          <path
            fill="#B71C1C"
            d="M0 0H206V206H0z"
            transform="translate(-17 -24)"
          />
        </g>
      </g>
    </SvgIcon>
  )
}

const DonationPage = () => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        Your Donations
      </Typography>
      <EmptyHeartSVG />
      <Typography variant="body1" className={classes.infoLabel}>
        You have not donated yet.
      </Typography>

      <Box className={classes.wrapper}>
        <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
          Find Location
        </Button>
        <Button
          className={classes.claimBtn}
          classes={{ label: classes.labelBtn }}
          variant="contained"
          startIcon={<FavoriteIcon />}
        >
          Claim Reward
        </Button>
      </Box>
    </Box>
  )
}

export default DonationPage
