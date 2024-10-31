<template>
  <li v-for="item in downItemData" :key="item.name"  class="dropdown-option">
    <a class="nav-link">{{ item.name }}</a>
  </li>
</template>

<script setup lang="ts">
import { defineProps,type PropType } from 'vue'
interface dropdownToggleTYpe{
  name:string,
  disable:boolean,
  icon:string,
  navHref:string
}
defineProps({
  downItemData: Array as PropType<dropdownToggleTYpe[]>,
})
</script>

<style scoped>
.dropdown-option {
  color: #fff;
}
.is-disabled {
  color: #9922e9;
  pointer-events: none;
  background-color: transparent;
}
</style>
