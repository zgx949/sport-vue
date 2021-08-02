<template>
  <el-table
      :data="tableData.filter(data => !search || data.content.toLowerCase().includes(search.toLowerCase()) || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
    <el-table-column
        label="发布时间"
        sortable
        prop="create_time">
    </el-table-column>
    <el-table-column
        label="标题"
        prop="title">
    </el-table-column>
    <el-table-column
        align="right">
      <template #header>
        <el-input
            v-model="search"
            placeholder="搜索内容"/>
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

      <span v-text="dialog.content"></span>


    </el-dialog>
  </div>

</template>

<script>

export default {
  name: "index",
  methods: {
    handleOpen(index, row) {
      console.log(index);
      this.show = true;
      this.dialog.show = true;
      this.dialog.title = row.title;
      this.dialog.content = this.tableData[index].content;
      this.dialog.create_time = row.create_time;
    },
    handleClose(){
      this.dialog.show = false;

    }

  },
  data() {
    return {
      show: false,
      dialog: {
        show: false,
        title: '',
        content: '',
        create_time: ''
      },
      search: '',
      tableData: [{
        id: 1,
        create_time: '2016-05-03',
        title: '王小虎',
        content: '内容'
      },
      {
        id: 2,
        create_time: '2016-05-06',
        title: '啊实打实的',
        content: '啊实打实的啊实打实大大'
      },
      ],

    }
  }
}
</script>

<style scoped>

</style>
