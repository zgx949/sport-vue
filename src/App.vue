<template>
  <div style="width: 360px;margin: auto">
    <el-affix :offset="0">
  <!--    主体-->
      <div style="width: 100%" >
  <!--      顶部菜单-->
        <header style="width: 360px">
          <el-image v-bind:src="logo.url" style="width: 150px;height: 150px;margin-left: 105px"></el-image>
  <!--        <img v-bind:src="logo.url" style="width: 20px; height: 20px;">-->
          <h2 style="text-align: center; color: #b02323">运动会赛事查询系统</h2>
        </header>
        <div style="width: 360px">
          <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 360px">
            <el-tab-pane label="首页" name="index">
              <router-view />
            </el-tab-pane>
            <el-tab-pane label="运动员查询" name="players">
              <players />
            </el-tab-pane>
            <el-tab-pane label="赛事" name="games">
              <game_table />
            </el-tab-pane>
            <el-tab-pane label="投诉" name="complaint">
              <complaint />
            </el-tab-pane>
            <el-tab-pane label="关于" name="about">
              <about />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

  <!--    主体区-->

    </el-affix>
  </div>
</template>

<script>
import Status from "@/components/status";
import Players from "@/views/players";
import Games from "@/views/games";
import About from "@/views/About";
import logo from  "/src/assets/logo.png"
import Game_table from "@/components/game_table";
import Complaint from "@/views/complaint";


export default {
  components: {Complaint, Game_table, About, Games, Players, Status},
  data() {
    return {
      activeName: 'second',
      // logo: {url: logo},
      logo: {url: 'http://img.mp.sohu.com/upload/20170515/d4a216eaf32e4c0b9255d329ee3ed677_th.png'},

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

</style>
