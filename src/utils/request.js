// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getTokenTime } from "@/utils/auth"; //获取时间戳
import router from "@/router";

// 判断token是否过期
function isTimeOut() {
  const timeOut = 9999999999;
  return !!(Date.now() - getTokenTime() > timeOut);
}
// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(async (config) => {
  // console.log(config);
  if (store.state.user.token) {
    if (isTimeOut()) {
      // 判断token是否过期 过期的话 跳到登录页
      await store.dispatch("user/logout");
      router.push("/login");
      // Message.error("登陆失效,请重新登录");
      // return Promise.reject(new Error("登陆失效,请重新登录"));
    } else {
      // token没有过期再携带请求头
      config.headers.Authorization = store.state.user.token;
    }
  }
  return config;
});
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // console.log(res);
    if (res.config.url.includes("/api/user-service/user/imageCode/")) {
      return res.request.responseURL;
    }
    if (res.data.success) {
      return res;
    }
    if (res.data.status) {
      return res.data;
    }
    // 获取工单搜索
    if (res.data.currentPageRecords) {
      return res
    }
    Message.error('系统异常');
    return Promise.reject(new Error('系统异常'));
  },
  async function (error) {
    console.dir(error);
    if (error?.response?.status === 401) {
      Message.error("登陆失效,请重新登录");
      await store.dispatch("user/logout");
      router.push("/login");
    } else {
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
);
export default service; // 导出axios实例
