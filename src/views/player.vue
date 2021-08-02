<template>
  <div>
    <div>
      <el-alert
          id="alert"
          :type="alert_type"
          :title="title"
          v-show="isShow"
          style="width: 360px; margin-bottom: 20px">
      </el-alert>
      <el-input v-model="search" placeholder="请输入学号" style="width: 200px;margin-left: 10px" @keyup.enter="searchID"></el-input>
      <el-button @click="searchID" style="width: 80px;margin-left: 10px;">搜索</el-button>
    </div>
    <div v-show="isShow" style="margin-left: 10px; margin-right: 10px">
      <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <!--          row-class-name="success-row"-->
        <!--        <el-table-column-->
        <!--            prop="date"-->
        <!--            label="日期"-->
        <!--            style="width: 60px">-->
        <!--        </el-table-column>-->
        <el-table-column
            prop="name"
            label="姓名"
            style="width: 30px">
        </el-table-column>
        <el-table-column
            prop="institution"
            label="学院">

        </el-table-column>
        <el-table-column
            prop="game"
            label="比赛">
        </el-table-column>
        <el-table-column
            prop="edition"
            label="状态"
            width="50">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>

            <el-dialog :title="dialogTitle" v-model="dialogTableVisible" width="100%">

              <div class="block">
                <el-timeline>
                  <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      :icon="activity.icon"
                      :type="activity.type"
                      :color="activity.color"
                      :size="activity.size"
                      :timestamp="activity.timestamp">
                    {{activity.content}}
                  </el-timeline-item>
                </el-timeline>
              </div>

            </el-dialog>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>

import { defineComponent, ref } from 'vue'
import * as axios from "core-js";
import requests from "@/utils/requests";

export default {
  name: "players",
  setup() {
    return {
      input: ref('')
    }
  },
  data(){
    return{
      activities: [],
      dialogTableVisible:false,
      dialogTitle: "比赛状态",

      alert_type: "success",
      isShow: false,
      search: "",
      text: "测试提示",
      tableData: [],
      title: "查询成功！",
    };
  },

  methods: {
    handleClick(row) {
      console.log(row.game);
      this.dialogTableVisible = true;
      this.activities = [
        {
          // content: '【男】100决赛发布',
          content: row.game,
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '检录',
          timestamp: '2018-04-03 20:46',
          size: 'large',
          color: '#0bbd87'
        }, {
          content: '比赛',
          timestamp: '2018-04-03 20:46',
          size: 'large',
          color: '#0bbd87'
        }, {
          content: '成绩公布',
          timestamp: '2018-04-03 20:46',
          size: '',
          color: '#0bbd87'
        }
      ];

    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return 'success-row';
    },

    searchID(){
      this.tableData=[];
      this.isShow = true;
      console.log('搜索:' + this.search);
      if(this.search == '' || this.search.length !== 7){
        this.alert_type = "warning";
        this.title = "学号错误！";
        return;
      }
      requests.get("/api/player?username=" + this.search).then(res => {
        console.log(res.data);
        if (res.code === 1){
          this.tableData = res.data;
          this.alert_type = "success";
          this.title = "学号:" + this.search + "总共检索到: " + res.data.length +" 个比赛";
        }else{
          this.title = "学号:" + this.search + "总共检索到: 0 个比赛";
        }


      })

      // this.tableData = [{
      //   date: '05-02',
      //   name: '王小虎',
      //   id: this.search,
      //   institution: '体育学院',
      //   game: '100米男子决赛'
      // }];


      // this.$emit('receive',this.cmsg);
    }
  },
}
</script>

<style scoped>

</style>
