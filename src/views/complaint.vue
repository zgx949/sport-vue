<template>
  <el-form :model="form">
    <el-form-item label="联系方式">
      <el-input
          type="text"
          placeholder="请输入QQ,微信或电话"
          v-model="form.contact"
      ></el-input>

    </el-form-item>
    <el-form-item label="投诉内容">
      <el-input
          type="textarea"
          placeholder="请输入投诉内容"
          rows="10"
          v-model="form.text"
          maxlength="500"
          show-word-limit
      ></el-input>

    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" style="width: 200px;margin-left: 80px">提交</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  name: "complaint",
  data(){
    return{
      form:{
        contact:'',
        text:'',

      }

    }
  },
  methods:{
    submit(){
      console.log(this.form.contact, this.form.text);
      alert("提交成功");
    }

  },

}
</script>

<style scoped>

</style>
