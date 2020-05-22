import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'
import InfoIcon from '@material-ui/icons/Info'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column'
  },
  optionLink: {
    width: '100%',
    display: 'flex',
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    '& a': {
      textDecoration: 'none'
    }
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(3),
    fontSize: 14
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  iconDonor: {
    color: theme.palette.secondary.main,
    fontSize: 20
  },
  infoLabel: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(2),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 1.33,
    letterSpacing: '2px',
    margin: theme.spacing(2, 0, 4, 0)
  }
}))

const SideBar = () => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.optionLink}>
        <FavoriteIcon className={classes.iconDonor} />
        <Link to="/donations">
          <Typography variant="body1" className={classes.labelOption}>
            My Donations
          </Typography>
        </Link>
      </Box>
      <Box className={classes.optionLink}>
        <AccountCircleIcon className={classes.iconOption} />
        <Link to="/profile">
          <Typography variant="body1" className={classes.labelOption}>
            My Profile
          </Typography>
        </Link>
      </Box>
      <Box className={classes.optionLink}>
        <LogoutIcon className={classes.iconOption} />
        <Link to="/">
          <Typography variant="body1" className={classes.labelOption}>
            Logout
          </Typography>
        </Link>
      </Box>
      <Divider />
      <Typography variant="body1" className={classes.infoLabel}>
        INFORMATION
      </Typography>
      <Box className={classes.optionLink}>
        <InfoIcon className={classes.iconOption} />
        <Link to="/">
          <Typography variant="body1" className={classes.labelOption}>
            About LifeBank
          </Typography>
        </Link>
      </Box>
      <Box className={classes.optionLink}>
        <InfoIcon className={classes.iconOption} />
        <Link to="/">
          <Typography variant="body1" className={classes.labelOption}>
            Terms of Use
          </Typography>
        </Link>
      </Box>
      <Box className={classes.optionLink}>
        <InfoIcon className={classes.iconOption} />
        <Link to="/">
          <Typography variant="body1" className={classes.labelOption}>
            Help
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default SideBar
