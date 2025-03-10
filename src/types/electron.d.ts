export interface IElectronAPI {
  send: (channel: string, data?: any) => void;
  invoke: (channel: string, data?: any) => Promise<any>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
