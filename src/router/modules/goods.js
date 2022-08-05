import Layout from '@/layout'
export default 
  {
    path: '/goods',
    component: Layout,
    name: 'Goods',
    meta: { title: '商品管理', icon: 'shangpin' },
    children: [
      {
        path: 'type',
        name: 'Type',
        component: () => import('@/views/Goods/type'),
        meta: { title: '商品类型'}
      },
      {
        path: 'mange',
        name: 'Mange',
        component: () => import('@/views/Goods/mange'),
        meta: { title: '商品管理' }
      }
    ]
  }

