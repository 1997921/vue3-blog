<template>
  <div class="row">
    <addColumnlist></addColumnlist>
    <div v-for="column in list" :key="column.id" class="col-4 mb-4">
      <div class="card shadow-sm">
        <div class="card-body text-center">
          <div>{{ showMsg }}</div>
          <img
            :src="column.avatar"
            class="card-img-top border border-light my-3"
            style="width: 20rem; height: 11rem"
            alt="..."
          />
          <h4 class="card-title">
            {{ column.title }}
            <span
              class="badge border text-primary text-center"
              style="font-size: 0.8rem; vertical-align: middle"
              >{{
                column.type === 0
                  ? 'pc端'
                  : column.type === 1
                    ? 'APP'
                    : column.type === 2
                      ? '微信小程序'
                      : ''
              }}</span
            >
          </h4>
          <div class="btn-group tips-btn" role="group">
            <span
              class="badge border border-primary-subtle"
              v-for="(item, id) in column.projectTips"
              :key="id"
              >{{ item }}</span
            >
          </div>
          <p class="card-text text-left">{{ column.description }}</p>
          <a class="btn btn-outline-primary">点击查看</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType, computed } from 'vue'
import addColumnlist from './addColumnlist.vue'
export interface columnProps {
  id: number
  title: string
  type: number
  projectTips: string[]
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
      // item.avatar = new URL('../assets/obb.png', import.meta.url).href
      //加载线上文件
      item.avatar = '	https://www.bootcss.com/assets/img/item1.png'
    }
  })
})
</script>

<style scoped>
.tips-btn .badge {
  font-size: 0.68rem;
  margin: 0 0.1rem;
  color: #198754;
}
.modal-backdrop {
  filter: alpha(opacity=0) !important;
  opacity: 0 !important;
}
</style>
