<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import columnList from './components/columnList.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
const data = [
  {
    id: 1,
    title: 'infj会喜欢什么样的人?',
    avatar: 'https://www.bootcss.com/assets/img/navlogo-small.png',
    description: '知乎隐私保护指引,申请开通机构号,联系我们',
  },
  {
    id: 1,
    title: 'infj会喜欢什么样的人?',
    avatar: 'https://www.bootcss.com/assets/img/navlogo-small.png',
    description: '知乎隐私保护指引,申请开通机构号,联系我们',
  },
  {
    id: 1,
    title: 'infj会喜欢什么样的人?',
    avatar: 'https://www.bootcss.com/assets/img/navlogo-small.png',
    description: '知乎隐私保护指引,申请开通机构号,联系我们',
  },
  {
    id: 1,
    title: 'infj会喜欢什么样的人?',
    avatar: 'https://www.bootcss.com/assets/img/navlogo-small.png',
    description: '知乎隐私保护指引,申请开通机构号,联系我们',
  },
  {
    id: 1,
    title: 'infj会喜欢什么样的人?',
    avatar: '	https://www.bootcss.com/assets/img/item1.png',
    description: '知乎隐私保护指引,申请开通机构号,联系我们',
  },
  {
    id: 1,
    title: 'infj会喜欢什么样的人?',
    avatar: '',
    description: '知乎隐私保护指引,申请开通机构号,联系我们',
  },
]
</script>

<template>
  <!-- <header class="main-header"></header> -->
  <div class="main-center">
    <columnList :list="data" />
  </div>
</template>

<style scoped>
.main-header {
}
.main-center {
  /* display: flex; */
}
</style>
