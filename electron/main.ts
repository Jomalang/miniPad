import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import Store from "electron-store";

const store = new Store();

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, "../dist/index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("save-memo", async (_, memo) => {
  try {
    const memos = store.get("memos", []);
    const memoIndex = memos.findIndex((m: any) => m.id === memo.id);

    if (memoIndex === -1) {
      memos.push(memo);
    } else {
      memos[memoIndex] = memo;
    }

    store.set("memos", memos);
    return { success: true };
  } catch (error) {
    console.error("메모 저장 실패:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("load-memos", async () => {
  try {
    return { success: true, data: store.get("memos", []) };
  } catch (error) {
    console.error("메모 로드 실패:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.on("window-control", (_, command) => {
  if (!mainWindow) return;

  switch (command) {
    case "minimize":
      mainWindow.minimize();
      break;
    case "restore":
      mainWindow.restore();
      break;
    case "close":
      mainWindow.close();
      break;
  }
});
