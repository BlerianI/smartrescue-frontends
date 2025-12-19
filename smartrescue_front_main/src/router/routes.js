const routes = [
  {
    path: '/',
    component: () => import('src/pages/HomePage.vue')
  },
  {
    path: '/auth',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/profile',
    component: () => import('pages/ProfilePage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
