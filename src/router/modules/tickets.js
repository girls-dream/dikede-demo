import Layout from '@/layout'
export default 
  {
    path: '/tickets',
    component: Layout,
    name: 'Tickets',
    meta: { title: '工单管理', icon: 'gongdan' },
    children: [
      {
        path: '/operating',
        name: 'Operating',
        component: () => import('@/views/tickets/operating'),
        meta: { title: '运营工单' }
      },
      {
        path: 'maintain',
        name: 'Maintain',
        component: () => import('@/views/tickets/maintain'),
        meta: { title: '运维工单' }
      }
    ]
  }

