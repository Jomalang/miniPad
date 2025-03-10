import { defineStore } from "pinia";
import { ref } from "vue";

export interface Memo {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useMemoStore = defineStore("memo", () => {
  const currentMemo = ref<Memo | null>(null);
  const memos = ref<Memo[]>([]);

  const updateCurrentMemo = (content: string) => {
    if (!currentMemo.value) {
      createNewMemo(content);
      return;
    }

    currentMemo.value = {
      ...currentMemo.value,
      content,
      updatedAt: new Date(),
    };

    saveMemoToStorage(currentMemo.value);
  };

  const createNewMemo = (content: string) => {
    const newMemo: Memo = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    currentMemo.value = newMemo;
    memos.value.push(newMemo);
    saveMemoToStorage(newMemo);
  };

  const saveMemoToStorage = async (memo: Memo) => {
    try {
      const response = await window.electron.invoke("save-memo", memo);
      if (!response.success) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to save memo:", error);
    }
  };

  const loadMemos = async () => {
    try {
      const response = await window.electron.invoke("load-memos");
      if (!response.success) {
        throw new Error(response.error);
      }
      memos.value = response.data;
      if (response.data.length > 0) {
        currentMemo.value = response.data[0];
      }
    } catch (error) {
      console.error("Failed to load memos:", error);
    }
  };

  return {
    currentMemo,
    memos,
    updateCurrentMemo,
    createNewMemo,
    loadMemos,
  };
});
