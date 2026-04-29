const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/scanner',
    component: () => import('pages/ScannerPage.vue'),
  },
  {
    path: '/med',
    component: () => import('pages/MedPage.vue'),
  },
  {
    path: '/preview/:id',
    component: () => import('pages/PreviewPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
