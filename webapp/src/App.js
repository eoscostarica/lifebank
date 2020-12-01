import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { useQuery } from '@apollo/react-hooks'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import routes from './routes'
import { MainContainer, TopBar, SideBar } from './containers'
import LocalBusinessStructuredData from './components/LocalBusinessStructuredData'
import MedicalClinicStructuredData from './components/MedicalClinicStructuredData'
import SplashIntro from './components/SplashIntro'
import { useUser } from './context/user.context'
import { GET_VALID_SPONSORS_QUERY, GET_VALID_LIFEBANKS_QUERY } from './gql'

const App = () => {
  const [validSponsors, setValidSponsors] = useState([])
  const [validLifebanks, setValidLifebanks] = useState([])
  const [currentUser, { logout }] = useUser()
  const [cookies, setCookie] = useCookies(['splash'])
  const [sideBarPosition, setSideBarPosition] = useState(true)

  const triggerSideBarPosition = () => {
    sideBarPosition ? setSideBarPosition(false) : setSideBarPosition(true)
  }

  const{ refetch: getSponsorData } = useQuery(GET_VALID_SPONSORS_QUERY, {
    skip: true
  })

  const getSponsors = async () => {
    const { data } = await getSponsorData()

    if (data && validSponsors.length === 0)
      setValidSponsors(data.get_valid_sponsors)
  }

  useEffect(() => {
    getSponsors()
  }, [getSponsorData])

  const { refetch: getLifebankData } = useQuery(GET_VALID_LIFEBANKS_QUERY, {
    skip: true
  })

  const getLifebanks = async () => {
    const { data } = await getLifebankData()

    if (data && validLifebanks.length === 0)
      setValidLifebanks(data.get_valid_lifebanks)
  }

  useEffect(() => {
    getLifebanks()
  }, [getLifebankData])

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
          sidebarContent={
            <SideBar
              user={currentUser}
              onLogout={logout}
              triggerSideBarPosition={triggerSideBarPosition}
            />
          }
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
                  socialMediaLinks={JSON.parse(el.social_media_links)}
                />
              ))}
            </>
          )}
          {validLifebanks.length > 0 && (
            <>
              {validLifebanks.map((element, key) => (
                <MedicalClinicStructuredData
                  key={key}
                  name={element.name}
                  openingHours={element.openingHours}
                  address={element.address}
                  logo={element.logo}
                  email={element.email}
                  description={element.description}
                  location={element.location}
                  telephone={element.telephone}
                />
              ))}
            </>
          )}
          <Grid container justify="center" alignItems="center">
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
      )}
    </BrowserRouter>
  )
}

export default App
