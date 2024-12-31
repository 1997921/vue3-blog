<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls';

const container = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls
let leftDoor: THREE.Mesh,
    rightDoor: THREE.Mesh,
    isDoorsOpen = false

// 创建柜子
const createCabinet = () => {
  const cabinet = new THREE.Group()

  // 柜子主体
  const bodyGeometry = new THREE.BoxGeometry(2, 3, 1)
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  cabinet.add(body)


  // 修改隔板布局
  const shelfMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF })

  // 水平隔板 - 只创建1层中间隔板

  const shelfGeometry = new THREE.BoxGeometry(1.9, 0.05, 0.9)
  const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial)
  shelf.position.set(0, 0, 0) // 放在中间位置
  cabinet.add(shelf)

  // 垂直隔板 - 创建2列（形成3列空间）
  const verticalShelfGeometry = new THREE.BoxGeometry(0.05, 2.9, 0.9)
  for (let i = -1; i <= 1; i += 2) {
    const verticalShelf = new THREE.Mesh(verticalShelfGeometry, shelfMaterial)
    verticalShelf.position.set(i * 0.63, 0, 0) // 调整间距
    cabinet.add(verticalShelf)
  }

  // 透明柜门
  const doorGeometry = new THREE.BoxGeometry(0.98, 2.9, 0.1)
  const doorMaterial = new THREE.MeshPhongMaterial({
    color: 0xA0522D,
    transparent: true,
    opacity: 0.3
  })

  // 左门和右门设置
  leftDoor = new THREE.Mesh(doorGeometry, doorMaterial)
  leftDoor.position.set(-0.5, 0, 0.45)
  leftDoor.geometry.translate(0.49, 0, 0)
  cabinet.add(leftDoor)

  rightDoor = new THREE.Mesh(doorGeometry, doorMaterial)
  rightDoor.position.set(0.5, 0, 0.45)
  rightDoor.geometry.translate(-0.49, 0, 0)
  cabinet.add(rightDoor)

  // 门把手
  const handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2)
  const handleMaterial = new THREE.MeshPhongMaterial({ color: 0xB8860B })

  // 左门把手
  const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial)
  leftHandle.rotation.z = Math.PI / 2
  leftHandle.position.set(-0.9, 0, 0.5)
  cabinet.add(leftHandle)

  // 右门把手
  const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial)
  rightHandle.rotation.z = Math.PI / 2
  rightHandle.position.set(0.9, 0, 0.5)
  cabinet.add(rightHandle)

  return cabinet
}

// 初始化场景
const init = () => {
  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    container.value!.clientWidth / container.value!.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value!.clientWidth, container.value!.clientHeight)
  container.value!.appendChild(renderer.domElement)

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // 添加柜子
  const cabinet = createCabinet()
  scene.add(cabinet)

  // 处理窗口大小变化
  window.addEventListener('resize', onWindowResize)

  // Add click event listener
  container.value!.addEventListener('click', onClick)
}

// 动画循环
const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

// 处理窗口大小变化
const onWindowResize = () => {
  camera.aspect = container.value!.clientWidth / container.value!.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value!.clientWidth, container.value!.clientHeight)
}

// Add click event handler
const onClick = (event: MouseEvent) => {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / container.value!.clientWidth) * 2 - 1
  mouse.y = -(event.clientY / container.value!.clientHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects([leftDoor, rightDoor])

  if (intersects.length > 0) {
    toggleDoors()
  }
}

// Add door animation function
const toggleDoors = () => {
  const targetRotation = isDoorsOpen ? 0 : Math.PI / 2
  const duration = 1000 // 1 second
  const startRotation = {
    left: leftDoor.rotation.y,
    right: rightDoor.rotation.y
  }
  const startTime = Date.now()

  function animate() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Use easing function for smooth animation
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    leftDoor.rotation.y = startRotation.left + (targetRotation - startRotation.left) * easeProgress
    rightDoor.rotation.y = startRotation.right - (targetRotation - startRotation.right) * easeProgress

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()
  isDoorsOpen = !isDoorsOpen
}

// 组件挂载时初始化
onMounted(() => {
  init()
  animate()
})

// 组件卸载时清理
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  container.value?.removeEventListener('click', onClick)
  renderer.dispose()
})
</script>

<style scoped>
div {
  width: 100%;
  height: 100vh;
}
</style>
