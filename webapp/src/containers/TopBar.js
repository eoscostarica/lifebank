import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Notification from '../components/Notification'
import LoginModal from '../components/LoginModal'


const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
  userIcon: {
    color: "#121212",
    width: 24,
    height: 24
  },
  logoutIcon: {
    color: "#121212",
    width: 20,
    height: 20,
    marginRight: 10
  },
  menuItem: {
    fontSize: "14px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.14,
    letterSpacing: "1px",
    color: "#121212",
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  }
}))

const Topbar = ({ user, onLogout }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    onLogout()
  }

  return (
    <Box className={classes.box}>
      {user && <Notification />}
      {user && (
        <>
          <IconButton onClick={handleClick}>
            <PersonIcon alt="User icon" className={classes.userIcon} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/profile" className={classes.link}>
              <MenuItem className={classes.menuItem}>{user.account}</MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogout} className={classes.menuItem}>
              <ExitToAppIcon alt="User icon" className={classes.logoutIcon} />
              Logout
              </MenuItem>
          </Menu>
        </>
      )}
      {!user && <LoginModal />}
    </Box>
  )
}

Topbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default Topbar
