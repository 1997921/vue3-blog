<script setup lang="ts">
import GlobalHeader from '../components/GlobalHeader.vue'
import columnList from '../components/columnList.vue'
import SecNavBar from '../components/SecNavBar.vue'
const data = [
  {
    id: 1,
    title: '本平台',
    type: 0, //0---pc端   1-手机APP   2---微信小程序
    projectTips: ['vue3+Ts', 'Bootstrap', 'nodeJs+express', 'mysql'],
    avatar: new URL('../assets/MyProject.png', import.meta.url).href,
    description: '该模块包括登录功能（单点登录逻辑），注册功能',
  },
  {
    id: 1,
    title: '国贸可视化管理系统',
    type: 0,
    projectTips: ['vue3+Ts', 'Bootstrap', 'nodeJs+express', 'mysql'],
    avatar: new URL('../assets/ssh.png', import.meta.url).href,
    description: '知乎隐私保护指引,申请开通机构号,联系我们',
  },
  {
    id: 1,
    title: '幻听小程序',
    type: 2,
    projectTips: ['vue3+Ts', 'Bootstrap', 'nodeJs+express', 'mysql'],
    avatar: new URL('../assets/ssh.png', import.meta.url).href,
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
  <header class="main-header bg-dark mb-2">
    <GlobalHeader :user-data="userDta" class="center-container"></GlobalHeader>
  </header>
  <div class="center-container">
    <SecNavBar></SecNavBar>
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
