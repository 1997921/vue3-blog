<template>
  <nav class="navbar bg-dark" data-bs-theme="dark">
    <div class="navbar-brand">开发作品集</div>
    <div v-if="!userData?.isLogin">
      <button class="btn list-line-item me-2" style="color: #fff">
        您好，请先登录
      </button>
      <a class="btn btn-sm" style="color: gray; text-decoration: underline">
        没有账号，去注册
      </a>
    </div>
    <div v-else class="navbar-nav nav-item" style="color: #fff">
      <Dropdown :title="`您好 ${userData.name}`">
        <dropDownItem><a class="dropdown-item">编辑个人资料</a></dropDownItem>
        <dropDownItem
          ><a class="dropdown-item" href="/">退出登录</a></dropDownItem
        >
      </Dropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
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
