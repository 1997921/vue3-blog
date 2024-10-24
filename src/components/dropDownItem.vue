<template>
  <li :class="{ 'is-disabled': disabled }" class="dropdown-option">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

defineProps({
  disabled: Boolean,
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
