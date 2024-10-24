<template>
  <div class="dropdown" ref="dropDownRef">
    <a
      href="#"
      class="btn btn-outline-light me-4 dropdown-toggle"
      @click="Opendown()"
    >
      {{ title }}
    </a>
    <ul
      class="dropdown-menu"
      style="display: block; position: absolute; margin-top: 0.5rem"
      v-if="isopen"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ClickOutside from '../hooks/userClickOutside'
defineProps({
  title: String,
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
const dropDownRef = ref<null | HTMLElement>(null)
const isClickOpen = ClickOutside(dropDownRef)
watch(isClickOpen, () => {
  if (isClickOpen.value && isopen.value) {
    isopen.value = false
  }
})
</script>

<style scoped></style>
