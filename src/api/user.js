import request from "@/utils/request";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 登录
export function login(data) {
  return request({
    url: "/user-service/user/login",
    method: "POST",
    data,
  });
}
// 验证码
export function VerificationCode(num) {
  return request({
    url: `/user-service/user/imageCode/${num}`,
  });
}
//获取人员基本信息
export function getUserInfo(id) {
  return request({
    url: `/user-service/user/${id}`,
  });
}
