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

<!--      <span v-text="dialog.content"></span>-->
      <article class="context" v-html="dialog.content"></article>

    </el-dialog>
  </div>

</template>

<script>

import request from "@/utils/requests";
import marked from "marked";


export default {
  name: "index",
  mounted: function () {
    this.getNews();
  },
  methods: {
    getNews(){
      request.get('/api/news').then(res => {
        if (res.code === 1){
          this.tableData = res.data;

        }else{
          this.tableData = [];
        }
      })
    },
    handleOpen(index, row) {
      console.log(index);
      this.show = true;
      this.dialog.show = true;
      this.dialog.title = row.title;
      this.dialog.content = marked(this.tableData[index].content, { sanitize: true, breaks: true, smartypants: true });
      this.dialog.create_time = row.create_time;
    },
    handleClose(){
      this.dialog.show = false;

    }

  },
  data() {
    return {
      articleDetail: [],
      show: false,
      dialog: {
        show: false,
        title: '',
        content: '',
        create_time: ''
      },
      search: '',
      tableData: [],

    }
  },

}
</script>

<style scoped>

</style>
