<script setup lang="ts">
import { defineProps, type PropType,ref,watch } from 'vue'
import Dropdown from './dropDown.vue'
import ClickOutside from '../hooks/userClickOutside'
// import dropDownItem from './dropDownItem.vue'
interface GlobalUserProps {
  id: number
  name: string
  isLogin: boolean
}
const headNavList =
[
  {
    name:"🏡 首页",
    dropdownToggleStatus:false,
    navHref:"",
    dropdownTogglelist:[],
    disable:false
  },
  {
    name:"🧰 项目",
    dropdownToggleStatus:false,
    navHref:"",
    dropdownTogglelist:[
    {
      name:"项目展示",
      disable:false,
      navHref:"",
      icon:"string"
    }],
    disable:false
  },
  {
    name:"📒 开发笔记",
    dropdownToggleStatus:false,
    navHref:"",
    dropdownTogglelist:[
    {
      name:"",
      disable:false,
      navHref:"",
      icon:"string"
    }],
    disable:false
  },
  {
    name:"📪 社区论坛",
    dropdownToggleStatus:false,
    navHref:"",
    dropdownTogglelist:[
    {
      name:"",
      disable:false,
      navHref:"",
      icon:"string"
    }],
    disable:false
  },
  {
    name:"💬 消息",
    dropdownToggleStatus:false,
    navHref:"",
    dropdownTogglelist:[
    {
      name:"",
      disable:false,
      navHref:"",
      icon:"string"
    }],
    disable:false
  },
]
defineProps({
  //   text: String,
  userData: Object as PropType<GlobalUserProps>,
  headNavIshow:Boolean
})
const isopen = ref(false)
const Opendown = () => {
  isopen.value = !isopen.value
}
// const offdown = () => {
//   isopen.value = false
// }
/*
 *设置与下拉父组件 ref 里面一样的参数dropDownRef
 *可以获取相应的HTML元素
 */
const userDropDownRef = ref<null | HTMLElement>(null)
const isClickOpen = ClickOutside(userDropDownRef)
watch(isClickOpen, () => {
  if (isClickOpen.value && isopen.value) {
    isopen.value = false
  }
})
</script>
<template>
  <nav class="navbar navbar-expand-lg toolbar-content myBetween">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/logo1.png"
          class="el-image__inner"
          style="display: block"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="headNavIshow">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <Dropdown :nav-list = headNavList></Dropdown>
        </ul>
        <!--用户信息显示-->
        <div class="dropdown userdropdownType" ref="userDropDownRef">
          <a class="btn dropdown-toggle" v-if="userData?.isLogin" @click="Opendown">欢迎,{{userData?.name}}</a>
          <a class="btn" v-else>登录查看更多</a>
          <ul class="dropdown-menu user-dropdown-menu" v-if="isopen"  >
            <li><a class="dropdown-item">编辑个人信息</a></li>
            <li><a class="dropdown-item">退出登录</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>



<style scoped>
.toolbar-content {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  color: #fff;
  /* background: black; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toolbar-content:hover {
  /* background: rgba(0, 0, 0, 0.5); */
}
.userdropdownType .btn{
  color: #fff;
}
.userdropdownType .btn:hover{
  color: #f0892f;
}
.user-dropdown-menu{
  display: block;
  right: 0;
}

</style>
