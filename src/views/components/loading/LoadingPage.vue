<template>
  <div class="game-container">
    <div class="mario" :class="{ jump: isJumping }" @click="jump"></div>
    <div class="ground"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isJumping = ref(false)

const jump = () => {
  if (!isJumping.value) {
    isJumping.value = true
    setTimeout(() => {
      isJumping.value = false
    }, 500)
  }
}
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  background-color: #8080ff;
}

.mario {
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 50px;
  left: 50px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVGhD7c6xCQAgDETR7L/U6AiCWNwEbmCKg+8XVwYAAAAAAACQaq3dOefdP2Z2xhiXTP/1K9cTWtA/QmhxQosTWpzQ4oQWJ7Q4ocUJLU5ocUKLE1qc0OKEFie0OKHFtdYyM/unmNn03ieZ/iu0OKHFAQAAAAAAAEDKzB57vxjuFqHHXwAAAABJRU5ErkJggg==') 0 0;
  background-size: 60px;
  animation: walk 0.6s steps(3) infinite;
}

.mario.jump {
  animation: jump 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #5c4033;
}

@keyframes walk {
  from { background-position: 0px; }
  to { background-position: -180px; }
}

@keyframes jump {
  0%, 100% {
    bottom: 50px;
  }
  50% {
    bottom: 150px;
  }
}
</style>
