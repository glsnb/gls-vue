<template>
  <div style="padding-top: 16px;">
    <div>
      <button @click="$toast('去搬装')">上方弹出</button>
      <button @click="$toast('去盖楼', {position:'middle'})">中间弹出</button>
    </div>
  </div>

</template>
<style>
  .k-toast {
    z-index: 30 !important;
  }
</style>
<style scoped>
  * {
    box-sizing: border-box;
  }

</style>
<script>
import Vue from 'vue'
import plugin from './plugin'
Vue.use(plugin)

export default {

}
</script>