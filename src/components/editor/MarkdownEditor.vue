<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const editorElement = ref<HTMLDivElement | null>(null);
let editorInstance: Editor | null = null;

const props = defineProps<{
  initialValue?: string;
}>();

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

onMounted(() => {
  console.log("Editor mounting..."); // 디버깅용 로그
  if (!editorElement.value) {
    console.log("Editor element not found"); // 디버깅용 로그
    return;
  }

  try {
    editorInstance = new Editor({
      el: editorElement.value,
      height: "500px", // 고정 높이로 테스트
      initialValue: props.initialValue || "",
      initialEditType: "markdown",
      previewStyle: "vertical",
      language: "ko-KR",
    });

    console.log("Editor mounted successfully"); // 디버깅용 로그

    editorInstance.on("change", () => {
      emit("change", editorInstance?.getMarkdown() || "");
    });
  } catch (error) {
    console.error("Editor mounting error:", error); // 에러 로깅
  }
});

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy();
  }
});

// 외부에서 사용할 수 있는 메서드들
defineExpose({
  getMarkdown: () => editorInstance?.getMarkdown() || "",
  setMarkdown: (markdown: string) => editorInstance?.setMarkdown(markdown),
});
</script>

<template>
  <div class="editor-wrapper">
    <!-- 테스트용 텍스트 추가 -->
    <div class="mb-4">에디터 컴포넌트</div>
    <div ref="editorElement"></div>
  </div>
</template>

<style scoped>
.editor-wrapper {
  height: 100%;
  border: 1px solid #e2e8f0; /* 테스트용 테두리 */
  padding: 1rem;
}

:deep(.toastui-editor-defaultUI) {
  border: none;
}

:deep(.toastui-editor-defaultUI-toolbar) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}
</style>
