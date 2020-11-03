import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import LifeBankIcon from '../components/LifebankIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(7, 0, 0, 0),
    backgroundColor: '#ffffff',
    display: 'flex'
  },
  paddingHome: {
    padding: theme.spacing(0)
  },
  appBar: {
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.24), 0 4px 8px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: "#ffffff",
  },
  backgroundHome: {
    boxShadow: "none",
    backgroundColor: 'transparent'
  },
  paddingBottomHomeAppbar: {
    paddingBottom: theme.spacing(1)
  },
  logo: {
    height: 24,
    marginTop: 3,
    [theme.breakpoints.up('md')]: {
      height: 40,
      marginTop: 10
    }
  },
  logoHome: {
    height: 40,
    marginTop: 10
  },
  linkBtn: {
    marginLeft: 20
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
  },
  drawerToggle: {
    color: "#121212",
    marginLeft: -12,
    [theme.breakpoints.up('md')]: {
      marginTop: 10,
    }
  },
  drawerToggleDesktop: {
    color: "#ffffff",
  },
  drawerContent: {
    backgroundColor: "#ffffff",
    height: '100%',
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

  const colorLogo = "#121212"

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.backgroundHome]: useTransparentBG,
        [classes.paddingBottomHomeAppbar]: isDesktop
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => setOpenSidebar(!openSidebar)}
          className={clsx(classes.drawerToggle, {
            [classes.drawerToggleDesktop]: useTransparentBG
          })}
        >
          <MenuIcon />
        </IconButton>
        <RouterLink
          to="/"
          className={clsx({ [classes.linkBtn]: isDesktop })}>
          {useTransparentBG &&
            <LifeBankIcon
              className={clsx(classes.logo)}
              color="#ffffff"
            />
          }
          {!useTransparentBG &&
            <LifeBankIcon
              className={clsx(classes.logo, {
                [classes.logoHome]: isDesktop && isHome
              })}
              color={colorLogo}
            />
          }
        </RouterLink>
        {topbarContent}
      </Toolbar>
    </AppBar>
  )
}

const Main = ({ children, sidebarContent, topbarContent, sideBarPosition }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [openSidebar, setOpenSidebar] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  useEffect(() => {
    setOpenSidebar(false)
  }, [sideBarPosition])

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
  topbarContent: PropTypes.node,
  sideBarPosition: PropTypes.bool
}

ChangeAppBarColorOnScroll.propTypes = {
  setOpenSidebar: PropTypes.func,
  openSidebar: PropTypes.bool,
  topbarContent: PropTypes.any,
  isHome: PropTypes.bool,
  isDesktop: PropTypes.bool,
}

export default Main
