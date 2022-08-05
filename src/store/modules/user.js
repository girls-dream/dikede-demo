import { login, VerificationCode, getUserInfo } from "@/api";
import store from "@/store";
import { setTokenTime } from "@/utils/auth"; //登陆的时候存时间戳
export default {
  namespaced: true,
  state: {
    token: "",
    imgUrl: "",
    random: "",
    userInfo: {},
    userAllInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      // console.log(payload);
      state.token = payload;
      // state.userInfo = payload;
    },
    setVerificationCode(state, payload) {
      state.imgUrl = payload[0];
      state.random = payload[1];
      // console.log(payload);
      // console.log(state.random);
    },
    // 获取登陆用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    // 获取登陆用户基本信息
    setUserAllInfo(state, payload) {
      state.userAllInfo = payload;
    },
  },
  actions: {
    // 获取验证码
    async getVerificationCode({ commit }) {
      const num = Math.floor(Math.random() * 9000 + 1000);
      // console.log(num);
      const res = await VerificationCode(num);
      // console.log(res);
      commit("setVerificationCode", [res, num]);
      setTokenTime();
    },
    // 获取登录token
    async getToken({ commit }, payload) {
      // console.log(payload);
      const userInfo = await login(payload);
      // console.log(userInfo);
      commit("setToken", userInfo.data.token);
      setTokenTime();
      commit("setUserInfo", userInfo.data);
      // console.log(userInfo);
    },
    // 获取用户基本信息
    async getUserInfo({ commit }) {
      console.log(1);
      // console.log(store.state.user.userInfo.userId);
      const userAllInfo = await getUserInfo(store.state.user.userInfo.userId);
      console.log(userAllInfo);
      commit("setUserAllInfo", userAllInfo);
    },
    // 退出
    logout({ commit }) {
      commit("setToken", "");
      commit("setUserInfo", {});
    },
  },
};
