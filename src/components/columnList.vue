<template>
  <div class="row">
    <div v-for="column in list" :key="column.id" class="col-4 mb-4">
      <div class="card shadow-sm h-100">
        <div class="card-body text-center">
          <div>{{ showMsg }}</div>
          <img
            :src="column.avatar"
            class="card-img-top rounded-circle border border-light w-25 my-3"
            alt="..."
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
export interface columnProps {
  id: number
  title: string
  avatar: string
  description: string
}
const props = defineProps({
  //   text: String,
  list: Array as PropType<columnProps[]>,
})
const showMsg = computed(() => {
  return props.list?.forEach(item => {
    if (!item.avatar) {
      //加载静态文件
      item.avatar = new URL('../assets/obb.png', import.meta.url).href
      //加载线上文件
      // item.avatar = '	https://www.bootcss.com/assets/img/item1.png'
    }
  })
})
</script>

<style scoped></style>
