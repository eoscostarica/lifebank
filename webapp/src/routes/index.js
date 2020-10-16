import Dashboard from './Dashboard'
import NotFound from './NotFound'
import Signup from './Signup'
import Donation from './Donation'
import Profile from './Profile'
import EditProfile from './EditProfile'
import About from './About'
import TermsOfUse from './TermsOfUse'
import Help from './Help'
import OffersManagement from './OffersManagement'
import OfferPage from './OfferPage'
import InfoPage from './InfoPage'
import Home from './Home'
import EmailVerification from './EmailVerification'


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
    name: 'offersManagement',
    path: '/offers-management',
    component: OffersManagement
  },
  {
    name: 'signup',
    path: '/signup',
    component: Signup
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    exact: true
  },
  {
    name: 'donation',
    path: '/donations',
    component: Donation
  },
  {
    name: 'offer-page',
    path: '/offer/:id',
    component: OfferPage
  },
  {
    name: 'email-verificatio',
    path: '/verification/:code',
    component: EmailVerification
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile
  },
  {
    name: 'editProfile',
    path: '/edit-profile',
    component: EditProfile
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'terms-of-use',
    path: '/terms-of-use',
    component: TermsOfUse
  },
  {
    name: 'help',
    path: '/help',
    component: Help
  },
  {
    name: 'info',
    path: '/info/:lifebank',
    component: InfoPage
  }
]
