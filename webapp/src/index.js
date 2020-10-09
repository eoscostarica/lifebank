import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import { ApolloProvider } from '@apollo/react-hooks'
import { CookiesProvider } from 'react-cookie'

import { ualConfig } from './config'
import { client } from './graphql'
import { UserProvider } from './context/user.context'
import App from './App'
import theme from './theme'
import './i18n'
import * as serviceWorker from './serviceWorker'
import './index.css'

const AppWithUAL = withUAL(App)

render(
  <UALProvider
    chains={[ualConfig.network]}
    authenticators={ualConfig.authenticators}
    appName={ualConfig.appName}
  >
    <ApolloProvider client={client}>
      <CookiesProvider>
        <UserProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <AppWithUAL />
          </ThemeProvider>
        </UserProvider>
      </CookiesProvider>
    </ApolloProvider>
  </UALProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
