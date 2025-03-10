<script setup lang="ts">
import AppHeader from "./components/layout/AppHeader.vue";
import MemoHome from "./components/MemoHome.vue";
</script>

<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 overflow-hidden bg-white">
      <MemoHome />
      <div class="p-4">테스트 텍스트</div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
