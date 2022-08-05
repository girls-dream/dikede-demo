import Layout from '@/layout'
export default 
  {
    path: '/person',
    component: Layout,
    redirect: '/example/table',
    name: 'Person',
    meta: { title: '人员管理', icon: 'renyuan' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/person/list'),
        meta: { title: '人员列表' }
      },
      {
        path: 'Info',
        name: 'Info',
        component: () => import('@/views/person/Info'),
        meta: { title: '人效统计' }
      },
      {
        path: 'effort',
        name: 'Effort',
        component: () => import('@/views/person/effort'),
        meta: { title: '工作量列表' }
      }
    ]
  }

