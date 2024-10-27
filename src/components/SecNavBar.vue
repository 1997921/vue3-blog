<template>
  <nav class="navbar navbar-expand-lg mb-4" style="background: #be8dbd">
    <div class="container-fluid">
      <a class="navbar-brand"><img src="../assets/logo1.png" /></a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active">项目展示</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">开发笔记</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">社区专栏</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script setup lang="ts">
// import { defineProps, type PropType, computed } from 'vue'
</script>

<style scoped></style>
