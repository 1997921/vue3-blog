<template>
  <nav class="navbar bg-dark pe-4 ps-4" data-bs-theme="dark">
    <a class="navbar-brand">开发笔记</a>
    <div v-if="!userData?.isLogin">
      <button class="btn btn-sm list-line-item me-4" style="color: #fff">
        登录
      </button>
      <button class="btn btn-sm list-line-item">注册</button>
    </div>
    <div v-else class="navbar-nav nav-item" style="color: #fff">
      <Dropdown :title="`您好 ${userData.name}`">
        <dropDownItem
          ><a href="#" class="dropdown-item">新建文章</a></dropDownItem
        >
        <dropDownItem disabled
          ><a href="#" class="dropdown-item">编辑资料</a></dropDownItem
        >
        <dropDownItem
          ><a href="#" class="dropdown-item">退出登录</a></dropDownItem
        >
      </Dropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from './dropDown.vue'
import dropDownItem from './dropDownItem.vue'
export interface GlobalUserProps {
  id: number
  name: string
  isLogin: boolean
}
defineProps({
  //   text: String,
  userData: Object as PropType<GlobalUserProps>,
})
</script>

<style scoped></style>
