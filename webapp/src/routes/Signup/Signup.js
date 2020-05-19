import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import DonorSignup from './DonorSignup'

const Signup = () => (
  <Switch>
    <Route exact path="/signup/donor" component={DonorSignup} />
    <Redirect from="/signup" to="/signup/donor" />
  </Switch>
)

Signup.propTypes = {}

Signup.defaultProps = {}

export default Signup
