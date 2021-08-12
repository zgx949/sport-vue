<template>

  <!--    全部区域-->
  <div style="width: 336px;margin: auto;">

      <div style="margin-top: 11px; width: 336px;">
        <!--  轮播图片        -->
        <el-affix :offset="20">
          <el-carousel indicator-position="outside" height="134px">
            <el-carousel-item v-for="item in logo" :key="logo">
              <img :src="item.url" alt="无图片" style="height: 134px; width: 336px"/>
            </el-carousel-item>
          </el-carousel>

        </el-affix>

        <h1 style="color: #F56C6C; margin-left: auto">校运动会信息查询系统</h1>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="首页" name="index">
            <index />
          </el-tab-pane>

          <el-tab-pane label="查询" name="lookup">
            <player />

          </el-tab-pane>

          <el-tab-pane label="赛事" name="game">
            <games />
          </el-tab-pane>

          <el-tab-pane label="登录报名" name="login">
            <Register />
          </el-tab-pane>

          <el-tab-pane label="投诉" name="complaint">
            <complaint />
          </el-tab-pane>

          <el-tab-pane label="关于" name="about">
            关于
          </el-tab-pane>
        </el-tabs>
      </div>



    <!--    顶部轮播-->


  </div>
</template>

<script>

import logo from  "/src/assets/logo.png"
import Complaint from "@/views/complaint";
import Index from "@/views";
import Games from "@/views/games";
import Player from "@/views/player";
import Register from "@/views/Register";



export default {
  components: {Register, Games, Index, Complaint, Player},
  data() {
    return {
      activeName: 'index',
      // logo: {url: logo},
      logo: [
          {url: 'http://img.mp.sohu.com/upload/20170515/d4a216eaf32e4c0b9255d329ee3ed677_th.png'},
          {url: '/src/assets/logo.png'},
      ],

    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};

</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
