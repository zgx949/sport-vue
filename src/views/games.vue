<template>
  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
    <el-table-column
        label="开始时间"
        sortable
        prop="start_time">
    </el-table-column>
    <el-table-column
        label="比赛"
        prop="name">
    </el-table-column>
    <el-table-column
        label="状态"
        sortable
        prop="status">
    </el-table-column>
    <el-table-column
        align="right">
      <template #header>
        <el-input
            v-model="search"
            placeholder="搜索"/>
      </template>
      <template #default="scope">
        <el-button
            @click="handleOpen(scope.$index, scope.row)" round>查看</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 对话框 -->
  <div v-show="dialog.show">
    <el-dialog
        v-model="dialog"
        v-bind:title="dialog.title"
        width="100%"
        :before-close="handleClose">

      <!--      对话框表格信息-->

      <el-descriptions title="赛事信息" :column="1" border style="margin: auto; color: #00AEFF">
        <el-descriptions-item label="比赛类型">
          <el-tag size="medium" v-text="dialog.type" type="info"></el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="比赛名">
          <el-tag size="medium" v-text="dialog.name" ></el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="男女子">
          <el-tag size="medium" v-text="dialog.gender" type="warning"></el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="类别">
          <el-tag size="medium" v-text="dialog.game_type" type="danger"></el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="成绩单位">
          <el-tag size="medium" v-text="dialog.unit" type="info"></el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="medium" type="info" v-text="dialog.data"></el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="当前状态">
          <el-tag size="medium" v-text="dialog.status" ></el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="开始时间">
          <el-tag size="medium" v-text="dialog.start_time" type="danger"></el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="结束时间">
          <el-tag size="medium" v-text="dialog.end_time" type="success"></el-tag>
        </el-descriptions-item>
      </el-descriptions>

    </el-dialog>
  </div>

</template>

<script>
import requests from "@/utils/requests";

export default {
  name: "player",
  mounted: function () {
    this.getGames();
  },
  methods: {
    handleOpen(index, row) {
      console.log(index);
      this.dialog.id = this.tableData[index].id;

      this.dialog.name = this.tableData[index].name;
      this.dialog.type = this.tableData[index].type;            // 比赛类型
      if (this.tableData[index].game_type === 1){
        this.dialog.game_type = "初赛";
      }else{
        this.dialog.game_type = "决赛";
      }
      if (this.tableData[index].gender === 1){
        this.dialog.gender = "男";
      }else if (this.tableData[index].gender === 0){
        this.dialog.gender = "女";
      }else{
        this.dialog.gender = "其他";
      }
      this.dialog.unit = this.tableData[index].unit;

      if (this.tableData[index].data === ""){
        this.dialog.data = "无";
      }else{
        this.dialog.data = this.tableData[index].data;
      }

      if (this.tableData[index].status === 0){
        this.dialog.status = "准备中";
      }else if(this.tableData[index].status === 1){
        this.dialog.status = "检录中";
      }else {
        this.dialog.status = "结束";
      }
      this.dialog.title = this.tableData[index].name + "------" + this.dialog.status;
      this.dialog.start_time = this.tableData[index].start_time;
      if (this.tableData[index].end_time === ""){
        this.dialog.end_time = "暂未结束";
      }else{
        this.dialog.end_time = this.tableData[index].end_time;
      }
      // this.dialog.end_time = this.tableData[index].end_time;
      this.dialog.show = true;
      console.log(this.dialog);
    },
    handleClose(){
      this.dialog = {
        show: false,
        id: 1,
        name: "",
        type: "",
        game_type: 1,
        gender: 1,
        unit: "",
        data: "",
        status: '',
        start_time: "",
        end_time: ""
      };
      this.dialog.show = false;


    },
    getGames(){
      requests.get("/api/games").then(res => {
            console.log(res.data);
            if (res.code === 1){
              this.tableData = res.data;
              // return res.data;
            }else{
              this.tableData = []
              // return [];
            }


          })
    }
  },

  data() {
    return {
      dialog: {
        show: false,
        id: 1,
        name: "",
        type: "",
        game_type: 1,
        gender: 1,
        unit: "",
        data: "",
        status: '',
        start_time: "",
        end_time: ""
      },
      search: '',

      // tableData: [{
      //   id: 1,
      //   name: "【男子】100米(初赛)",
      //   type: "田赛",
      //   game_type: 1,
      //   gender: 1,
      //   unit: "秒",
      //   data: "",
      //   status: 1,
      //   start_time: "2020-01-01 12:48:00",
      //   end_time: "2020-01-01 12:48:00"
      // },
      //
      // ],

      tableData: [],

    }
  },

}
</script>

<style scoped>

</style>
