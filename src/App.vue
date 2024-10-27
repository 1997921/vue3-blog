<script setup lang="ts">
import { onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

//初始化页面样式
onMounted(() => {
  const width = document.body.clientWidth
  const fontSize = Math.floor((width / 1920) * 16)
  document.body.style.fontSize = fontSize + 'px'
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
