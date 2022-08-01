import { login, VerificationCode } from "@/api";

export default {
  namespaced: true,
  state: {
    token: "",
    imgUrl: "",
    random: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setVerificationCode(state, payload) {
      state.imgUrl = payload[0];
      state.random = payload[1];
      // console.log(payload);
      // console.log(state.random);
    },
  },
  actions: {
    // 获取登录token
    async getToken({ commit }, payload) {
      // console.log(payload);
      const res = await login(payload);
      // console.log(res);
      commit("setToken", res.data.token);
    },
    // 获取验证码
    async getVerificationCode({ commit }) {
      const num = Math.floor(Math.random() * 9000 + 1000);
      const res = await VerificationCode(num);
      // console.log(res);
      // const random = res.config.url.substr(72);
      commit("setVerificationCode", [res.request.responseURL, num]);
    },
  },
};
