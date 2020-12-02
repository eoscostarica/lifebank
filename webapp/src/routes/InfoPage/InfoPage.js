import React, { lazy, Suspense } from 'react'
import { useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CircularProgress from '@material-ui/core/CircularProgress'

const InfoPageDesktop = lazy(() => import('./InfoPageDesktop'));
const InfoPageMobile = lazy(() => import('./InfoPageMobile'));

const InfoPage = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: false
  })

  return (
    <>
      {!isDesktop &&
        <Suspense fallback={<CircularProgress />}>
          <InfoPageMobile />
        </Suspense>
      }
      {isDesktop &&
        <Suspense fallback={<CircularProgress />}>
          <InfoPageDesktop />
        </Suspense>}
    </>
  )
}

export default InfoPage
