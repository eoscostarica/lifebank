import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'

import { MainContainer } from '../../containers'
import { useUser } from '../../context/user.context'

import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import DashboardProfile from './DashboardProfile'
import DashboardUsers from './DashboardUsers'

const Dashboard = () => {
  const [currentUser, { logout }] = useUser()
  const history = useHistory()

  return (
    <MainContainer
      topbarContent={
        <DashboardTopbar
          user={currentUser}
          onLogout={() => logout()}
          onLogin={() => history.push('/login')}
        />
      }
      sidebarContent={
        <DashboardSidebar
          user={currentUser}
          onLogout={() => logout()}
          onLogin={() => history.push('/login')}
        />
      }
    >
      <Grid container>
        <Switch>
          <Route exact path="/dashboard/profile" component={DashboardProfile} />
          <Route exact path="/dashboard/users" component={DashboardUsers} />
          <Redirect from="/dashboard" to="/dashboard/profile" />
        </Switch>
      </Grid>
    </MainContainer>
  )
}

Dashboard.propTypes = {
  ual: PropTypes.object
}

Dashboard.defaultProps = {
  ual: {}
}

export default Dashboard
