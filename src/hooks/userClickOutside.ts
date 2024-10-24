import { onMounted, onUnmounted, ref, type Ref } from 'vue'
const userClickOutside = (elmentRef: Ref<null | HTMLElement>) => {
  const isClickOpen = ref(false)
  const handler = (e: MouseEvent) => {
    if (elmentRef.value) {
      //判断点击的元素中是否包含dropDownRef的html
      if (elmentRef.value.contains(e.target as HTMLElement)) {
        isClickOpen.value = false
      } else {
        isClickOpen.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOpen
}
export default userClickOutside
