
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'pair', component: () => import('pages/Pair.vue') },
      { path: 'edit', component: () => import('pages/Edit.vue') },
      { path: 'contact', component: () => import('pages/Contact.vue') },
      { path: 'name', component: () => import('pages/Name.vue') },
      { path: 'fishing', component: () => import('pages/Fishing.vue') },
      { path: 'spin', component: () => import('pages/Spin.vue') },
      { path: 'privacy', component: () => import('pages/Privacy.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
