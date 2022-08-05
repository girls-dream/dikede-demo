import Layout from '@/layout'
export default 
  {
    path: '/point',
    component: Layout,
    // redirect: '/point/area',
    name: 'Point',
    meta: { title: '点位管理', icon: 'dianwei' },
    children: [
      {
        path: 'areamange',
        name: 'Areamange',
        component: () => import('@/views/point/areamange'),
        meta: { title: '区域管理' }
      },
      {
        path: 'gssp',
        name: 'Gssp',
        component: () => import('@/views/point/gssp'),
        meta: { title: '点位管理' }
      },
      {
        path: 'partners',
        name: 'Partners',
        component: () => import('@/views/point/partners'),
        meta: { title: '合作商管理' }
      }
    ]
  }

