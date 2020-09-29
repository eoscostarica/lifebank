import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: 'inherit'
  },
  notificationIcon: {
    color: "#121212",
    width: 24,
    height: 24
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#ffffff',
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.18)"
  },
  backIcon: {
    color: "#121212",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: "20px",
    fontWeight: "500",
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Notification = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton className={classes.wrapper} onClick={handleClickOpen}>
        <NotificationsIcon alt="Notification icon" className={classes.notificationIcon} />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.backIcon} onClick={handleClose} aria-label="close">
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Recent Activity
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
        </List>
      </Dialog>
    </>
  )
}

Notification.propTypes = {

}

export default Notification
