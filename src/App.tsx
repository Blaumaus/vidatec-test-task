import React, {
  useEffect, lazy, Suspense, useState,
} from 'react'
import { Switch, Route } from 'react-router-dom'
import cx from 'clsx'

import Footer from './components/Footer'
import Loader from './ui/Loader'
import routes from './routes'

const Home = lazy(() => import('./pages/Home'))

const Fallback = () => {
  const [showLoader, setShowLoader]: [boolean, Function] = useState(false)

  useEffect(() => {
    let isMounted = true

    setTimeout(() => {
      if (isMounted) {
        setShowLoader(true)
      }
    }, 1000)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={cx('bg-gray-50 dark:bg-gray-800 min-h-page')}>
      {showLoader && (
        <Loader />
      )}
    </div>
  )
}

const App = () => {
  useEffect(() => {
    const loaderEl = document.getElementById('loader')

    if (loaderEl) {
      loaderEl.classList.add('available')
      setTimeout(() => {
        loaderEl.outerHTML = ''
      }, 1000)
    }
  }, [])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Suspense fallback={<></>}>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route path={routes.home} component={Home} exact />
        </Switch>
      </Suspense>
      <Footer />
    </Suspense>
  )
}

export default App
