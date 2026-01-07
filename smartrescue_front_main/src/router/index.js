import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/authStore'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

    // Router.beforeEach(async (to, from, next) => {
    //   const authStore = useAuthStore()

    //   if (!authStore.user && to.path !== '/auth') {
    //     try {
    //       await authStore.getCurrentUser()
    //     } catch (error) {
    //       console.log('Nicht eingeloggt')
    //     }
    //   }

    //   if (to.path === '/profile' && !authStore.user) {
    //     next('/auth')
    //   } else if (to.path === '/auth' && authStore.user) {
    //     next('/profile')
    //   } else {
    //     next()
    //   }
    // })

    Router.beforeEach(async (to, from, next) => {
      const authStore = useAuthStore()

      console.log('🚀 Router Guard START')
      console.log('📍 Von:', from.path, '→ Zu:', to.path)
      console.log('👤 Store User VOR check:', authStore.user)

      // Wenn wir zu /profile gehen und KEIN User da ist
      if (to.path === '/profile' && !authStore.user) {
        console.log('⏳ Kein User - lade User-Daten...')

        try {
          // Warte kurz (für OAuth)
          await new Promise((resolve) => setTimeout(resolve, 300))

          console.log('📡 Rufe getCurrentUser() auf...')
          await authStore.getCurrentUser()

          console.log('👤 Store User NACH check:', authStore.user)

          if (!authStore.user) {
            console.log('❌ Immer noch kein User - redirect zu /auth')
            return next('/auth')
          }

          console.log('✅ User gefunden - weiter zu /profile')
          next()
        } catch (error) {
          console.error('❌ getCurrentUser Fehler:', error)
          next('/auth')
        }
      }
      // Wenn wir zu /auth gehen und User IST da
      else if (to.path === '/auth' && authStore.user) {
        console.log('✅ User existiert - redirect zu /profile')
        next('/profile')
      }
      // Alle anderen Routen
      else {
        console.log('➡️ Normale Navigation')
        next()
      }
    })

  return Router
})
