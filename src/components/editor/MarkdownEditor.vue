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
  if (!editorElement.value) return;

  editorInstance = new Editor({
    el: editorElement.value,
    initialValue: props.initialValue || "",
    initialEditType: "markdown",
    previewStyle: "vertical",
    height: "100vh",
    language: "ko-KR",
    usageStatistics: false,
  });

  editorInstance.on("change", () => {
    emit("change", editorInstance?.getMarkdown() || "");
  });
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
    <div ref="editorElement" class="editor-element"></div>
  </div>
</template>

<style>
.editor-wrapper {
  width: 100%;
  height: 100%;
  background-color: white;
}

.editor-element {
  width: 100%;
  height: 100%;
}

/* Toast UI Editor 스타일 오버라이드 */
.toastui-editor-defaultUI {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  background-color: white !important;
}

.toastui-editor-defaultUI-toolbar {
  border: none !important;
  padding: 5px !important;
  background-color: white !important;
}

.toastui-editor-main {
  height: calc(100% - 45px) !important;
  background-color: white !important;
}

.toastui-editor-main .toastui-editor-md-container,
.toastui-editor-main .toastui-editor-ww-container {
  background-color: white !important;
  height: 100% !important;
}

.toastui-editor-md-preview {
  background-color: white !important;
  height: 100% !important;
}
</style>
