<script setup lang="ts">
import { defineProps, type PropType } from 'vue'

interface ruleProp {
  name: string
  val: string
  type: string
  error: boolean
  message: string
}
defineProps({
  //   text: String,
  rules: Array as PropType<ruleProp[]>,
})
//表单验证规则
const validataForm = (m: ruleProp) => {
  if (m.val.trim() === '') {
    m.error = true
    m.message = m.name + '不能为空'
  } else {
    m.error = false
  }
}
</script>

<template>
  <div class="mb-3 w-100" v-for="item in rules" :key="item.val">
    <!-- <label for="exampleInputEmail1" class="form-label">{{ item.name }}</label> -->
    <input
      :type="item.type"
      v-bind:class="{ 'border-danger': item.error }"
      :placeholder="'请输入' + item.name"
      class="form-control"
      id="exampleInputEmail1"
      v-model.lazy="item.val"
      @blur="validataForm(item)"
    />
    <div class="form-text text-danger" v-if="item.error">
      {{ item.message }}
    </div>
  </div>
</template>

<style scoped></style>
