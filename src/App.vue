<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import GlobalHeader from './components/GlobalHeader.vue'
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
const userDta = {
  id: 1,
  name: 'wyy',
  isLogin: true,
}
</script>

<template>
  <header class="main-header bg-dark mb-4">
    <GlobalHeader :user-data="userDta" class="center-container"></GlobalHeader>
  </header>
  <div class="center-container">
    <columnList :list="data" />
  </div>
</template>

<style scoped>
.main-header {
  width: 100%;
}
.center-container {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
