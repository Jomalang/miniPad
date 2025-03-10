import { contextBridge, ipcRenderer } from "electron";
import type { IElectronAPI } from "../src/types/electron";

const electronAPI: IElectronAPI = {
  send: (channel: string, data?: any) => {
    // 허용된 채널 목록
    const validChannels = ["save-memo", "load-memos"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  invoke: (channel: string, data?: any) => {
    // 허용된 채널 목록
    const validChannels = ["save-memo", "load-memos"];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
    return Promise.reject(new Error("Invalid channel"));
  },
};

contextBridge.exposeInMainWorld("electron", electronAPI);
