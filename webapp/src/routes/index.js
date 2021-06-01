import NotFound from './NotFound'
import InternalError from './InternalError'
import Profile from './Profile'
import EditProfilePage from './EditProfile'
import About from './About'
import TermsOfUse from './TermsOfUse'
import Help from './Help'
import OffersManagement from './OffersManagement'
import InfoPage from './InfoPage'
import Home from './Home'
import EmailVerification from './EmailVerification'
import RegisterLifebank from './RegisterLifebank'
import OffersApproval from './OffersApproval'

export default [
  {
    name: 'notFound',
    path: '/not-found',
    component: NotFound
  },
  {
    name: 'internalError',
    path: '/internal-error',
    component: InternalError
  },
  {
    name: 'offersManagement',
    path: '/offers-management',
    component: OffersManagement
  },
  {
    name: 'offersApproval',
    path: '/offers-approval',
    component: OffersApproval,
    exact: true
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    exact: true
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
    component: EditProfilePage
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
    path: '/info/:url',
    component: InfoPage
  },
  {
    name: 'register-lifebank',
    path: '/register-lifebank/:code',
    component: RegisterLifebank
  }
]
