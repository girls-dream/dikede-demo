<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="box-card" style="height: 64px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="工单编号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="工单状态:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="代办" value="shanghai"></el-option>
              <el-option label="进行" value="beijing"></el-option>
              <el-option label="取消" value="beijing"></el-option>
              <el-option label="完成" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="query"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 表格 -->
      <el-card class="table">
        <el-row>
          <el-col :span="24"
            ><el-button
              icon="el-icon-circle-plus-outline"
              style="
                background: linear-gradient(135deg,#ff9743,#ff5e20)!important
                ) ;
                border: none;
                width:80px;height:36px;
                position: relative;
                top:7px;left:5px
              "
              >新建</el-button
            >
            <el-button type="primary" class="ticket"
              >工单配置</el-button
            ></el-col
          >
        </el-row>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="createType" label="序号" width="140">
          </el-table-column>
          <el-table-column prop="taskCode" label="工单编号" width="140">
          </el-table-column>
          <el-table-column prop="innerCode" label="设备编号" width="140">
          </el-table-column>
          <el-table-column
            prop="taskType.typeName"
            label="工单类型"
            width="140"
          >
          </el-table-column>
          <el-table-column prop="手动" label="工单方式" width="140">
          </el-table-column>
          <el-table-column prop="taskStatus" label="工单状态" width="140">
          </el-table-column>
          <el-table-column prop="userName" label="运营人员" width="140">
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="140">
          </el-table-column>
          <el-table-column prop="查看详情" label="操作" width="140">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getWorksearch } from "@/api";
import moment from "moment";
export default {
  name: "operating",
  computed: {},
  data() {
    return {
      select: "",
      tableData: [],
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 获取工单搜索
    async getWorkList() {
      const res = await getWorksearch();
      // console.log(res.data.currentPageRecords);
      this.tableData = res.data.currentPageRecords;
      // this.tableData.createTime = moment(this.tableData.createTime).format(
      //   "YYYY.MM.DD HH:mm:ss"
      // );
      this.tableData.forEach((item) => {
        item.createTime = moment(this.tableData.createTime).format("YYYY.MM.DD HH:mm:ss");
        if (item.taskStatus == 1) {
          return (item.taskStatus = "代办");
        } else if (item.taskStatus == 2) {
          return (item.taskStatus = "进行");
        } else if (item.taskStatus == 3) {
          return (item.taskStatus = "取消");
        } else {
          return (item.taskStatus = "完成");
        }
      });
      console.log(this.tableData);
      // if (status == 1) {
      //   this.tableData.taskStatus = "代办";
      // } else if (status == 2) {
      //   this.tableData.taskStatus = "进行";
      // } else if (status == 3) {
      //   this.tableData.taskStatus = "取消";
      // } else {
      //   this.tableData.taskStatus = "完成";
      // }
    },
  },
  created() {
    this.getWorkList();
  },
};
</script>

<style lang="scss" scoped>
body {
  background: #f8fafd;
  z-index: 12;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-select-dropdown__item.selected {
  color: #606266;
  font-weight: normal;
}
::v-deep .el-input__inner {
  width: 205px;
  height: 36px;
  // background-color: red;
}
.el-card {
  position: relative;
  top: -46px;
}
.el-table {
  margin-top: 24px;
}
::v-deep .el-card__body {
  padding: 10px;
  width: 1320px;
  background: #fff;
}
::v-deep .el-form--inline .el-form-item__label {
  font-weight: normal;
}
::v-deep .el-form-item__content .el-button .query {
  background-color: #5f84ff;
  border-color: #5f84ff;
  width: 80px;
  height: 36px;
  text-align: center;
  line-height: 10px;
  position: relative;
  top: 2px;
  span {
    text-align: center;
  }
  i {
    position: relative;
    left: -5px;
  }
}
.table {
  margin-top: 20px;
}
// ::v-deep .el-button .new {
//   width: 50px;
// }
::v-deep .el-button + .el-button {
  width: 80px;
  height: 36px;
  position: relative;
  top: 7px;
  left: 6px;
  color: #655b56;
  background: #fbf4f0 !important;
  border: none;
  span {
    position: relative;
    top: -2px;
    left: -7px;
  }
}
// 表格
::v-deep .el-table th > .cell {
  font-weight: normal;
  color: #666;
}
</style>
