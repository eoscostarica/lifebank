import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { MainContainer, TopBar, SideBar } from './containers'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import routes from './routes'
import SplashIntro from './components/SplashIntro'
import { useUser } from './context/user.context'

const App = () => {
  const [currentUser, { logout }] = useUser()
  const [cookies, setCookie] = useCookies(['splash'])
  const [sideBarPosition, setSideBarPosition] = useState(true)

  const triggerSideBarPosition = () => {
    sideBarPosition ? setSideBarPosition(false) : setSideBarPosition(true)
  }

  return (
    <BrowserRouter>
      <MainContainer
        topbarContent={<TopBar user={currentUser} onLogout={logout} />}
        sidebarContent={
          <SideBar
            user={currentUser}
            onLogout={logout}
            triggerSideBarPosition={triggerSideBarPosition}
          />
        }
        sideBarPosition={sideBarPosition}
      >
        <Grid container justify="center" alignItems="center">
          <SplashIntro
            skipHandling={(cookie) => {
              const d = new Date()
              d.setMonth(d.getMonth() + 3)
              setCookie(cookie, undefined, {
                expires: d
              })
            }}
            cookie={cookies.splash}
          />
          <Switch>
            {routes.map(({ path, component: Component, ...args }) => (
              <Route key={`path-${path}`} path={path} {...args}>
                <Component />
              </Route>
            ))}
            <Redirect to="/not-found" />
          </Switch>
        </Grid>
      </MainContainer>
    </BrowserRouter>
  )
}

export default App
