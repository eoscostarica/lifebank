import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

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
    paddingTop: theme.spacing(1),
    backgroundColor: "#ffffff"
  },
  backgroundHome: {
    backgroundColor: 'transparent'
  },
  paddingBottomHomeAppbar: {
    paddingBottom: theme.spacing(1)
  },
  logo: {
    height: 24,
    [theme.breakpoints.up('md')]: {
      height: 43
    }
  },
  logoHome: {
    height: 69
  },
  linkBtn: {
    marginLeft: '5%'
  },
  drawer: {
    width: 0,
    transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  drawerDesktop: {
    width: 240
  },
  drawerPaper: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  },
  drawerToggle: {
    color: "#121212",
    marginLeft: -12
  },
  drawerContent: {
    backgroundColor: theme.palette.white,
    height: '100%'
  }
}))

const ChangeAppBarColorOnScroll = ({
  isHome,
  isDesktop,
  setOpenSidebar,
  openSidebar,
  topbarContent
}) => {
  const classes = useStyles()
  const trigger = useScrollTrigger({
    target: window || undefined,
    disableHysteresis: true
  })
  const useTransparentBG = isDesktop && isHome && !trigger

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.backgroundHome]: useTransparentBG,
        [classes.paddingBottomHomeAppbar]: isDesktop && isHome
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => setOpenSidebar(!openSidebar)}
          className={classes.drawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <RouterLink
          to="/"
          className={clsx({ [classes.linkBtn]: isDesktop && isHome })}
        >
          <LifeBankIcon
            className={clsx(classes.logo, {
              [classes.logoHome]: isDesktop && isHome
            })}
          />
        </RouterLink>
        {topbarContent}
      </Toolbar>
    </AppBar>
  )
}

const Main = ({ children, sidebarContent, topbarContent }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [openSidebar, setOpenSidebar] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  return (
    <Container
      component="main"
      maxWidth="xl"
      className={clsx(classes.root, {
        [classes.paddingHome]: isDesktop && isHome
      })}
    >
      <ChangeAppBarColorOnScroll
        isDesktop={isDesktop}
        setOpenSidebar={setOpenSidebar}
        openSidebar={openSidebar}
        isHome={isHome}
        topbarContent={topbarContent}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={() => setOpenSidebar(false)}
        open={openSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
        className={clsx({
          [classes.drawer]: true,
          [classes.drawerDesktop]: isDesktop && openSidebar
        })}
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
  isHome: PropTypes.bool,
  isDesktop: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
  openSidebar: PropTypes.bool,
  topbarContent: PropTypes.any
}

export default Main
