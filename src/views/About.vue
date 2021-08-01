<template>
  <div class="about">
    <h1 v-text="text"></h1>
    <h1>{{ text }}!!!</h1>
    <left></left>
  </div>
  <status />

</template>
<script>
import Left from "@/components/left";
import Status from "@/components/status";
export default {
  components: {Status, Left},
  data(){
    return{
      text:"123456",
    }
  }
}
</script>
