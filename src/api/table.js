import request from '@/utils/request'
// 获取工单搜索
export function getWorksearch(params) {
  return request({
    url: '/task-service/task/search',
    params
  })
}
