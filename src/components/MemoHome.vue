<script setup lang="ts">
import MarkdownEditor from "./editor/MarkdownEditor.vue";
import { useMemoStore } from "../stores/memo";

const memoStore = useMemoStore();

const handleEditorChange = (content: string) => {
  memoStore.updateCurrentMemo(content);
};
</script>

<template>
  <div class="memo-home">
    <MarkdownEditor
      :initial-value="memoStore.currentMemo?.content"
      @change="handleEditorChange"
    />
  </div>
</template>

<style scoped>
.memo-home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
