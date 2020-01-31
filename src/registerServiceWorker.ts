/* eslint-disable no-console */

import { register } from 'register-service-worker'
import store from './store'

const notifyUserAboutUpdate = (worker: any) => {
  store.dispatch('snackbar/show', {
    text: 'New version of site is available!',
    timeout: 120000,
    color: 'success',
    class: '',
    button: {
      text: 'Refresh',
      action: () => {
        worker.postMessage({ type: 'SKIP_WAITING' })
      },
      color: 'white',
      class: 'dark--text text-transform-none'
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' + 'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(registration) {
      console.log('New content is available; please refresh.')
      notifyUserAboutUpdate(registration.waiting)
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })

  let refreshing
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('controllerchange...')
    if (refreshing) {
      return
    }
    window.location.reload()
    refreshing = true
  })
}
