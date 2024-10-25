<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

//初始化页面样式
onMounted(() => {
  const width = document.body.clientWidth
  const fontSize = Math.floor((width / 1920) * 16)
  const parentElement = ref<null | HTMLElement>(null)
  parentElement.value = document.body.parentElement
  parentElement.value.style.fontSize = fontSize + 'px'
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
