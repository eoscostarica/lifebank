import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import routes from './routes'
import { MainContainer, TopBar, SideBar } from './containers'

const App = ({ ual }) => (
  <BrowserRouter>
    <MainContainer
      topbarContent={
        <TopBar user={null} onLogout={() => {}} onLogin={() => {}} />
      }
      sidebarContent={<SideBar />}
    >
      <Grid container>
        <Switch>
          {routes.map(({ path, component: Component, ...args }) => (
            <Route key={`path-${path}`} path={path} {...args}>
              <Component ual={ual} />
            </Route>
          ))}
          <Redirect to="/not-found" />
        </Switch>
      </Grid>
    </MainContainer>
  </BrowserRouter>
)

App.propTypes = {
  ual: PropTypes.object
}

export default App
