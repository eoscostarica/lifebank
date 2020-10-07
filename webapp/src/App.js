import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import routes from './routes'
import { MainContainer, TopBar, SideBar } from './containers'
import SplashIntro from './components/SplashIntro'
import { useUser } from './context/user.context'

const App = ({ ual }) => {
  const [currentUser, { logout }] = useUser()
  const [cookies, setCookie] = useCookies(['splash'])

  return (
    <BrowserRouter>
      <MainContainer
        topbarContent={<TopBar user={currentUser} onLogout={logout} />}
        sidebarContent={<SideBar user={currentUser} onLogout={logout} />}
      >
        <Grid container>
          {!cookies['splash'] ? (
            <SplashIntro skipHandling={(cookie) => setCookie(cookie)} />
          ) : (
            <Switch>
              {routes.map(({ path, component: Component, ...args }) => (
                <Route key={`path-${path}`} path={path} {...args}>
                  <Component ual={ual} />
                </Route>
              ))}
              <Redirect to="/not-found" />
            </Switch>
          )}
        </Grid>
      </MainContainer>
    </BrowserRouter>
  )
}

App.propTypes = {
  ual: PropTypes.object
}

export default App
