<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="LoginForm"
      :rules="LoginFormRules"
    >
      <!-- 放置标题图片 @是设置的别名-->
      <div class="title-container">
        <h3 class="title">
          <img src="../../assets/common/logo.595745bd.png" alt="" />
        </h3>
      </div>
      <!-- 登陆界面 -->
      <div class="login">
        <!-- 账号 -->
        <el-form-item>
          <el-input
            type="text"
            placeholder="请输入账号"
            prefix-icon="el-icon-mobile-phone"
            v-model="LoginForm.loginName"
          ></el-input>
        </el-form-item>
        <!-- 睁开 -->
        <el-form-item v-if="isOpen">
          <el-input
            type="text"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="LoginForm.password"
          >
          </el-input>
          <div @click="handclick">
            <span> <i class="iconfont icon-yanjing"></i></span>
          </div>
        </el-form-item>
        <!-- 闭眼 -->
        <el-form-item v-else>
          <el-input
            type="Password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="LoginForm.password"
          >
          </el-input>
          <div @click="handclick">
            <span> <i class="iconfont icon-yanjing_bi"></i></span>
          </div>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item style="width: 320px">
          <el-input
            placeholder="请输入验证码"
            prefix-icon="iconfont icon-dunpaibaoxianrenzheng_o"
            v-model="LoginForm.code"
          >
            >
            <template #append>
              <img class="yanzhengma" :src="imgURL" alt="" @click="codeClick" />
            </template>
          </el-input>
        </el-form-item>

        <el-button
          class="loginBtn"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </div>

      <!-- <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: mapUserState } = createNamespacedHelpers("user");
export default {
  name: "Login",
  data() {
    return {
      LoginForm: {
        loginName: "admin",
        password: "admin",
        captcha: "",
        mobile: "",
        code: "",
        clientToken: this.$store.state.user.random,
        loginType: 0,
        account: "",
      },
      LoginFormRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入正确的账号格式",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // {
          //   pattern:
          //     /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
          //   message: '请输入包含大写，小写字母和特殊符号且长度不小于六位的密码',
          //   trigger: 'blur',
          // },
        ],
      },
      isOpen: false, //是否睁开
      imgURL: "",
    };
  },
  mounted() {
    // this.LoginForm.clientToken = this.$store.state.user.random;
  },
  methods: {
    handclick() {
      //显示密码
      // console.log(1);
      this.isOpen = !this.isOpen;
    },
    handleLogin() {
      //登录接口
      // console.log(this.random);
      this.$refs.loginForm.validate((vaild) => {
        console.log(this.LoginForm);
        this.$store.dispatch("user/getToken", {
          ...this.LoginForm,
          clientToken: this.$store.state.user.random,
        });
      });

      console.log(this.$route);
      if (this.$store.state.user.token) {
        this.$router.push('/dashboard')
      }
    },
    async codeClick() {
      //点击获取验证码
      // console.log(this.imgURL);
      try {
        // await this.$refs.loginForm.validate()
        await this.$store.dispatch("user/getVerificationCode");
        // console.log(this.$store.state.user.imgUrl);
        // console.log(this.clientToken);
        this.imgURL = this.$store.state.user.imgUrl;
        // console.log(this.clientToken);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapUserState("random"),
  },
  created() {
    this.codeClick();
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #888;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    // color: $cursor;
    height: 47px;
    background: transparent;
    border: 0;
    border-radius: 0;
    // padding: 12px 5px 12px 15px;
    color: #999;
    caret-color: #999;
    -webkit-appearance: none;
  }
}
// 验证码

.el-input-group__append {
  // background-color: pink;
  width: 133px;
  height: 50px;
  position: relative;
  left: 312px;
  top: -48.5px;
  padding: 0;
}
.yanzhengma {
  width: 100%;
  height: 100%;
  display: block;
}

.el-input__icon {
  font-size: 18px;
}
.icon-dunpaibaoxianrenzheng_o:before {
  text-align: center;
  line-height: 47px;
  position: relative;
  left: 4px;
}
// 眼睛
.icon-yanjing:before {
  font-size: 18px;
  position: relative;
  left: 28px;
  top: 5px;
}
.icon-yanjing_bi:before {
  font-size: 18px;

  position: relative;
  left: 18px;
  top: 5px;
}
.login {
  width: 448px;
  height: 280px;
  position: relative;
  top: -96px;
}
/* reset element-ui css */
.login-container {
  width: 518px;
  height: 388px;
  background-color: #fff;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    .el-form-item__error {
      color: #fff;
    }

    input {
      background: transparent;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      position: relative;
      left: 30px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  // .login-container .login-form {
  //   height: 388px;
  // }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
    .el-form-item__content {
      display: flex;
      border: 1px #e2e2e2 solid;
      border-radius: 5px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #68b0fe;

.login-container {
  .loginBtn {
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg, #2e50e1, #6878f0);
    opacity: 0.91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../assets/common/background.png"); // 设置背景图片

  .login-form {
    // position: relative;
    // width: 380px;
    // max-width: 100%;
    // // padding: 160px 35px 0;
    // margin: 0 auto;
    // overflow: hidden;
    // transform: translate(0,50%);
    // background-color: #fff;

    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    width: 96px;
    height: 96px;
    img {
      width: 96px;
      height: 96px;
      position: relative;
      top: -123px;
      left: 178px;
    }

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
form {
  position: relative;
  top: -50px;
}
</style>
