<template>
  <h1></h1>
  <div class="block">
    <span class="demonstration">默认 Hover 指示器触发</span>
    <el-carousel height="150px" style="width: 360px">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <img v-bind:src="img.url">
      </el-carousel-item>
    </el-carousel>
    </div>
</template>

<script>
import kw from '../assets/img/kw.png'
export default {
  name: "ad_png",
  data(){
    return{
      imgList: [
        {url: kw},
        {url: kw},
      ]
      }
    }
}
</script>

<style scoped>

</style>
