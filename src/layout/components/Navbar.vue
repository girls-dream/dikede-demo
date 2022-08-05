<template>
  <div class="navbar">
    <!-- 左边logo -->
    <img src="../../assets//common//ysj.png" alt="" />
    <!-- 右边结构 -->
    <div class="right-menu">
      <el-col :span="5" class="avater">
        <div>
          <img
            v-imgErr="defaultImg"
            :src="this.$store.state.user.userAllInfo.image + '1'"
            alt=""
          />
        </div>
      </el-col>
      <el-col :span="14" class="user">
        <span>欢迎你, {{ this.$store.state.user.userAllInfo.userName }}</span>
      </el-col>
      <el-col :span="5" class="logout">
        <el-tooltip
          class="item"
          effect="dark"
          content="退出登录"
          placement="top-start"
        >
          <el-button @click="logout">退出</el-button>
        </el-tooltip>
      </el-col>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import defaultImg from "../../assets/common/头像.png";
export default {
  data() {
    return {
      defaultImg,
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: fixed;
  background: #fff;
  background-image: url("~@/assets/common/背景图.png");
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 99;
  width: 100%;
  > img {
    width: 88px;
    height: 36px;
    position: relative;
    left: 14px;
    top: 11px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    width: 240px;
    height: 100%;
    position: relative;
    left: 1275px;
    color: #fff;
    // line-height: 60px;
    .avater {
      position: relative;
      top: -24px;
    }
    .user {
      position: relative;
      top: -16px;
    }
    .logout {
      .item {
        color: #fff;
        font-size: 14px;
        background: unset;
        border: none;
        position: relative;
        top: -26px;
        left: -23px;
      }
    }
  }
  // .right-menu {
  //   display: flex;

  //   &:focus {
  //     outline: none;
  //   }

  //   .right-menu-item {
  //     display: inline-block;
  //     padding: 0 8px;
  //     height: 100%;
  //     font-size: 18px;
  //     color: #5a5e66;
  //     vertical-align: text-bottom;

  //     &.hover-effect {
  //       cursor: pointer;
  //       transition: background 0.3s;

  //       &:hover {
  //         background: rgba(0, 0, 0, 0.025);
  //       }
  //     }
  //   }

  //   .avatar-container {
  //     margin-right: 30px;

  //     .avatar-wrapper {
  //       margin-top: 5px;
  //       position: relative;

  //       .user-avatar {
  //         cursor: pointer;
  //         width: 40px;
  //         height: 40px;
  //         border-radius: 10px;
  //       }

  //       .el-icon-caret-bottom {
  //         cursor: pointer;
  //         position: absolute;
  //         right: -20px;
  //         top: 25px;
  //         font-size: 12px;
  //       }
  //     }
  //   }
  // }
}
</style>
