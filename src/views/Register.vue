<template>
  <h1 style="margin: 0px; margin-left: 100px; color: #00AEFF" v-text="nowtitle"></h1>
  <div v-show="!islogin && !register">
<!--    登录区域-->
    <el-form>
      <el-form-item label="学号" :model="datafrom">
        <el-input v-model="datafrom.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" :model="datafrom">
        <el-input v-model="datafrom.password" type="password" @keyup.enter="login" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="margin-left: 80px" round>登录</el-button>
        <el-button @click="toregiste" round>我要注册</el-button>
      </el-form-item>


    </el-form>
  </div>

  <div v-show="islogin">
<!--    已经登录的报名区域-->
    <el-button style="margin-left: 220px" @click="loginout" round>退出登录</el-button>
<!--      <el-descriptions title="当前信息" :column="3" border>-->
      <el-descriptions title="当前信息" direction="vertical" :column="3" border>
        <el-descriptions-item label="ID" v-model="userinform" align="center">{{ userinform.uid }}</el-descriptions-item>
<!--        <el-descriptions-item label="ID" label-align="right" align="center" v-model="userinform"></el-descriptions-item>-->
        <el-descriptions-item label="学号" v-model="userinform" align="center">{{ userinform.uname }}</el-descriptions-item>

        <el-descriptions-item label="学院" align="center">
          <el-tag size="small">体育学院</el-tag>
        </el-descriptions-item>
        <el-descriptions-item
            label="报名项目"
            v-for="item in games"
            align="center">{{ item.game }}</el-descriptions-item>


      </el-descriptions>
    <el-form>
      <el-form-item label="报名项目ID" :model="enrollform">
        <el-select v-model="enrollform.gameId" placeholder="请选择要报名的项目">
          <el-option
              v-for="item in enrollsGames"

              :label=item.name
              :value=item.id
              >
          </el-option>
        </el-select>

        <el-button @click="loginout" round>报名</el-button>

      </el-form-item>

    </el-form>
  </div>

  <div v-show="register">
<!--    注册区域-->
    <el-form>
      <el-form-item label="学号" :model="registerform">
        <el-input v-model="registerform.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" :model="registerform">
        <el-input v-model="registerform.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :model="registerform">
        <el-input v-model="registerform.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" :model="registerform">
        <el-select v-model="registerform.gender" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院" :model="registerform">
        <el-select v-model="registerform.institutionid" placeholder="请选择学院">
          <el-option label="体育学院" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registe" style="margin-left: 80px" round>注册</el-button>
        <el-button @click="tologin" round>我要登录</el-button>
      </el-form-item>


    </el-form>
  </div>

</template>

<script>
import requests from "@/utils/requests";

export default {
  name: "Register",
  methods: {
    getEnrollGames(){
      var that = this;
      this.enrollsGames = [];
      requests.get('/api/games').then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].game_type !== 1){
            continue;
          }
          if (res.data[i].gender == 1){
            res.data[i].name = '【男子】' + res.data[i].name;
          }else if (res.data.gender == 0){
            res.data[i].name = '【女子】' + res.data[i].name;
          }else{
            res.data[i].name = '【未知】' + res.data[i].name;
          }
          that.enrollsGames.push(res.data[i])
        }

        // that.enrollsGames = res.data;

      });
    },
    getGames(){
      var that = this;
      if (this.datafrom.username != ''){

        requests.get('/api/player?username=' + this.datafrom.username).then(res => {
          that.games = res.data;
          console.log(that.games);
        });
      }
    },
    login(){
      if (this.datafrom.username === '' || this.datafrom.password === ''){
        alert("账号密码不能为空");
        return ;
      }
      const that = this;
      requests.post('/api/login', this.datafrom).then(res => {
        if(res.code == 1){
          console.log("登录成功")
          that.userinform.uname = res.data.uname;
          that.userinform.pwd = res.data.pwd;
          that.userinform.uid = res.data.uid;
          that.islogin = true;
          that.register = false;
          console.log(that.userinform.uname);
          console.log("login");
          that.nowtitle = '欢迎回来';
          that.getGames();
          that.getEnrollGames();

        }else{
          console.log("登录失败");
          alert(res.data);
          return ;
        }
      })


    },
    registe(){
      this.register = true;
      alert("注册成功！");
      console.log("点击注册")
      this.tologin();
    },
    tologin(){
      this.nowtitle = '欢迎登录',
      this.islogin = false;
      this.register = false;
    },
    loginout(){
      this.tologin();
    },
    toregiste(){
      this.nowtitle = '欢迎注册',
      this.register = true;
      this.islogin = false;
    },

  },
  data(){
    return{
      nowtitle: '欢迎登录',
      islogin: false, // 登录状态
      register: false, //是否为注册状态
      userinform: {
        uname: '',
        pwd: '',
        uid: '',
        game: []
      },
      datafrom: {
        // 登录表
        username: '',
        password: ''


      },
      registerform: {
        username: '',
        password: '',
        name: '',
        gender: '',
        institutionid: '',
      //  注册表


      },
      enrollform:{
      //  报名表
        username: '',
        password: '',
        gameId: '',

      },
      games: [],
      enrollsGames: [],



    }

  },
}
</script>

<style scoped>

</style>
