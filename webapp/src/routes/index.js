import Dashboard from './Dashboard'
import NotFound from './NotFound'
import LandingPage from './LandingPage'
import Signup from './Signup'

export default [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: 'notFound',
    path: '/not-found',
    component: NotFound
  },
  {
    name: 'signup',
    path: '/signup',
    component: Signup
  },
  {
    name: 'landingpage',
    path: '/',
    component: LandingPage,
    exact: true
  }
]
