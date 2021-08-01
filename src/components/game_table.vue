
<template>
  <el-alert :title="title" type="success">
  </el-alert>
  <el-table
      :data="tableData"
      border
      style="width: 360px; margin-right: 10px">
    <el-table-column
        fixed
        sortable
        prop="date"
        label="时间"
        width="60">
    </el-table-column>
    <el-table-column
        prop="game"
        label="比赛"
        width="150">
    </el-table-column>

    <el-table-column
        prop="status"
        label="状态"
        width="50">
    </el-table-column>

    <el-table-column
        prop="place"
        label="地点"
        width="50">
    </el-table-column>

    <el-table-column
        prop="edition"
        label="操作"
        width="49">

      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-dialog :title="dialogTitle" v-model="dialogTableVisible" width="100%">
          <el-table :data="gridData">
            <el-table-column property="index" label="序号" width="40"></el-table-column>
            <el-table-column property="name" label="姓名" width="60"></el-table-column>
            <el-table-column property="score" label="成绩" sortable></el-table-column>
          </el-table>
        </el-dialog>
      </template>


    </el-table-column>
    <div v-show="false">
      <el-table-column
          prop="id"
          label="id"
          width="50">
      </el-table-column>
    </div>


  </el-table>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      this.dialogTableVisible=true;
      this.dialogTitle=row.game;
      console.log("赛事ID:" + row.id);
    }
  },getAllGame(){

    console.log("获取所有赛事");

  },

  data() {
    return {
      title: "检索成功!",
      dialogTableVisible: false,
      dialogTitle: '',
      tableData: [{
        date: '05-02',
        game: '【男子】100决赛',
        place: '跑道',
        status: '检录',
        id: 12
          },
        ],
      gridData: [
        {
          index: 1,
          name: "测试",
          score: "100"

        },
        {
          index: 2,
          name: "css",
          score: 99

        },
        {
          index: "3",
          name: "阿松大",
          score: 19

        }
      ]

    }
  }
}
</script>

<style>

</style>
