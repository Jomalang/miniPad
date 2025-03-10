<script setup lang="ts">
import { ref } from "vue";

const isMinimized = ref(false);

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
  window.electron.send(
    "window-control",
    isMinimized.value ? "minimize" : "restore"
  );
};
</script>

<template>
  <header class="bg-gray-800 text-white p-2 flex justify-between items-center">
    <div class="drag-handle flex-1">MiniPad</div>
    <div class="window-controls flex gap-2">
      <button @click="toggleMinimize" class="hover:bg-gray-700 p-1 rounded">
        <span v-if="isMinimized">□</span>
        <span v-else>－</span>
      </button>
      <button
        @click="window.electron.send('window-control', 'close')"
        class="hover:bg-red-600 p-1 rounded"
      >
        ×
      </button>
    </div>
  </header>
</template>

<style scoped>
.drag-handle {
  -webkit-app-region: drag;
}
</style>
