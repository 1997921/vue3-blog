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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ms-4">
            <a class="nav-link active" aria-current="page" href="#">🏡 首页</a>
          </li>
          <li class="nav-item ms-4">
            <a class="nav-link" href="#">🧰 项目</a>
          </li>
          <li class="nav-item ms-4">
            <a class="nav-link" href="#">📒 开发笔记</a>
          </li>
          <li class="nav-item ms-4">
            <a class="nav-link" href="#">📪 社区论坛</a>
          </li>
          <li class="nav-item ms-4">
            <a class="nav-link" href="#">💬 消息</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <div class="dropdown">
          <a
            class="btn dropdown-toggle dropdown-toggle-text"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            欢迎，wyy
          </a>

          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
// import Dropdown from './dropDown.vue'
// import dropDownItem from './dropDownItem.vue'
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
  background: rgba(0, 0, 0, 0.5);
}
/* .navbar-nav .nav-item:hover ::after {
  content: '';
  display: block;
  width: 100%; 
  height: 4px; 
  background: #eb9a31; 
} */
.navbar-nav .nav-item {
  border: 4px solid transparent;
}
.navbar-nav .nav-item:hover {
  border-bottom: 4px solid #eb9a31;
}
.navbar-nav .nav-item .nav-link {
  color: #fff;
  font-weight: bold;
}
.navbar-nav .nav-link.active,
.navbar-nav .show > .nav-link {
  color: #eb9a31;
}
.dropdown-toggle-text {
  color: #fff;
}
</style>
