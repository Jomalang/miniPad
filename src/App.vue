<script setup lang="ts">
import AppHeader from "./components/layout/AppHeader.vue";
import MemoHome from "./components/MemoHome.vue";
</script>

<template>
  <div class="h-screen flex flex-col bg-white">
    <AppHeader />
    <main class="flex-1 overflow-hidden">
      <MemoHome />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  background-color: white;
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
