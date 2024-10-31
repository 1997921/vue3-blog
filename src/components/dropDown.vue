<template>
  <li class="nav-item dropdown" v-for="column in navList" :key="column.name"  ref="dropDownRef">
    <a
     :class="{'dropdown-toggle':column.dropdownToggleStatus}"
      class="nav-link"
    >
    {{ column.name }}
    </a>
    <ul class="dropdown-menu"
      style="display: block; position: absolute; margin-top: 0.5rem"
      v-if="column.dropdownToggleStatus">
    <dropDownItem :downItemData="column.dropdownTogglelist"></dropDownItem>
    </ul>
  </li>
   
</template>

<script setup lang="ts">
import { defineProps, ref, watch,  type PropType } from 'vue'
import ClickOutside from '../hooks/userClickOutside'
import dropDownItem from '../components/dropDownItem.vue'
interface dropdownToggleTYpe{
  name:string,
  disable:boolean,
  icon:string,
  navHref:string
}
interface navListProp {
 name:string,
 navHref:string,
 dropdownToggleStatus:boolean,
 dropdownTogglelist:dropdownToggleTYpe[],
 disable:boolean
}
defineProps({
  navList:Array as PropType<navListProp[]>
})
const isopen = ref(false)
// const Opendown = () => {
//   isopen.value = !isopen.value
// }
// const offdown = () => {
//   isopen.value = false
// }
/*
 *设置与下拉父组件 ref 里面一样的参数dropDownRef
 *可以获取相应的HTML元素
 */
const dropDownRef = ref<null | HTMLElement>(null)
const isClickOpen = ClickOutside(dropDownRef)
watch(isClickOpen, () => {
  if (isClickOpen.value && isopen.value) {
    isopen.value = false
  }
})
</script>

<style scoped>
.navbar-nav .nav-item {
  border: 4px solid transparent;
}
.navbar-nav .nav-item:hover {
  border-bottom: 4px solid #eb9a31;
  cursor: pointer;
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
