import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { useLazyQuery } from '@apollo/react-hooks'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import routes from './routes'
import { MainContainer, TopBar, SideBar } from './containers'
import LocalBusinessStructuredData from './components/LocalBusinessStructuredData'
import SplashIntro from './components/SplashIntro'
import { useUser } from './context/user.context'
import { GET_VALID_SPONSORS_QUERY } from './gql'

const App = ({ ual }) => {
  const [validSponsors, setValidSponsors] = useState([])
  const [currentUser, { logout }] = useUser()
  const [cookies, setCookie] = useCookies(['splash'])
  const [sideBarPosition, setSideBarPosition] = useState(true)

  const triggerSideBarPosition = () => {
    sideBarPosition ? setSideBarPosition(false) : setSideBarPosition(true)
  }

  const [loadValidSponsors, { data }] = useLazyQuery(GET_VALID_SPONSORS_QUERY, {
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (validSponsors.length === 0) loadValidSponsors()
  }, [loadValidSponsors])

  useEffect(() => {
    if (data) setValidSponsors(data.get_valid_sponsors)
  }, [data])

  return (
    <BrowserRouter>
      {!cookies.splash ? (
        <SplashIntro
          skipHandling={(cookie) => {
            const d = new Date()
            d.setMonth(d.getMonth() + 3)
            setCookie(cookie, undefined, {
              expires: d
            })
          }}
        />
      ) : (
        <MainContainer
          topbarContent={<TopBar user={currentUser} onLogout={logout} />}
          sidebarContent={<SideBar user={currentUser} onLogout={logout} triggerSideBarPosition={triggerSideBarPosition} />}
          sideBarPosition={sideBarPosition}
        >
          {validSponsors.length > 0 && (
            <>
              {validSponsors.map((el, key) => (
                <LocalBusinessStructuredData
                  key={key}
                  name={el.name}
                  openingHours={el.openingHours}
                  address={el.address}
                  logo={el.logo}
                  email={el.email}
                  location={el.location}
                  telephone={el.telephone}
                  socialMediaLinks={el.social_media_links}
                />
              ))}
            </>
          )}
          <Grid container justify="center" alignItems="center">
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
      )}
    </BrowserRouter>
  )
}

App.propTypes = {
  ual: PropTypes.object
}

export default App
