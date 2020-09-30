import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'


import LifeBankIcon from '../components/LifebankIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(7, 0, 0, 0),
    display: 'flex'
  },
  paddingHome: {
    padding: theme.spacing(0)
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: "#ffffff",
  },
  backgroundHome: {
    backgroundColor: 'transparent'
  },
  paddingBottomHomeAppbar: {
    paddingBottom: theme.spacing(1)
  },
  logo: {
    height: 24,
  },
  linkBtn: {
    marginLeft: '5%'
  },
  drawer: {
    width: 0,
    transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  drawerPaper: {
    width: 240
  },
  drawerToggle: {
    color: "#121212",
    marginLeft: -12
  },
  drawerContent: {
    backgroundColor: "#ffffff",
    height: '100%'
  }
}))

const ChangeAppBarColorOnScroll = ({
  setOpenSidebar,
  openSidebar,
  topbarContent
}) => {
  const classes = useStyles()

  return (
    <AppBar
      className={classes.appBar}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => setOpenSidebar(!openSidebar)}
          className={classes.drawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <RouterLink to="/">
          <LifeBankIcon
            className={classes.logo}
          />
        </RouterLink>
        {topbarContent}
      </Toolbar>
    </AppBar>
  )
}

const Main = ({ children, sidebarContent, topbarContent }) => {
  const classes = useStyles()
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <Container
      component="main"
      maxWidth="xl"
      className={classes.root}
    >
      <ChangeAppBarColorOnScroll
        setOpenSidebar={setOpenSidebar}
        openSidebar={openSidebar}
        topbarContent={topbarContent}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={() => setOpenSidebar(false)}
        open={openSidebar}
        className={classes.drawer}
      >
        <div className={classes.drawerContent}>{sidebarContent}</div>
      </Drawer>
      {children}
    </Container>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  sidebarContent: PropTypes.node,
  topbarContent: PropTypes.node
}

ChangeAppBarColorOnScroll.propTypes = {
  setOpenSidebar: PropTypes.func,
  openSidebar: PropTypes.bool,
  topbarContent: PropTypes.any
}

export default Main
