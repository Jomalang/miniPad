<script setup lang="ts">
import { onMounted } from "vue";
import MarkdownEditor from "./editor/MarkdownEditor.vue";
import { useMemoStore } from "../stores/memo";

const memoStore = useMemoStore();

const handleEditorChange = (content: string) => {
  memoStore.updateCurrentMemo(content);
};

onMounted(() => {
  console.log("MemoHome mounted"); // 디버깅용 로그
});
</script>

<template>
  <div class="memo-container p-4">
    <!-- 테스트용 텍스트 추가 -->
    <div class="mb-4">메모 홈 컴포넌트</div>
    <MarkdownEditor
      :initial-value="memoStore.currentMemo?.content"
      @change="handleEditorChange"
    />
  </div>
</template>

<style scoped>
.memo-container {
  height: 100%;
  background-color: white;
}
</style>
