<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 这是一个布局有bug的项目，会有许多地方设计不太合理，因为使用的是视频自带布局，本着学习思想的态度，细节地方不太到位 */
</style>
