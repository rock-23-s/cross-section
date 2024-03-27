import { BrowserWindow, Menu, Tray, app, ipcMain, ipcRenderer, nativeImage } from "electron";
import { getAssetPath } from "../utils/path";

// 托盘小图标
const applicationImage = (path: any) =>
  nativeImage.createFromPath(path).resize({ width: 18, height: 18 });
const trayIcon = getAssetPath('tray.png');

export const createTray = (main: BrowserWindow) => {
  /** 根据托盘所需的大小重绘 */
  let tray = new Tray(applicationImage(trayIcon))

  const menuOption = [
    { label: '退出', accelerator: 'Cmd+Q', click: () => {  app.exit() } }
  ]
  const contextMenu = Menu.buildFromTemplate(menuOption)
  /** 使用setContextMenu要慎重，因为这是设置默认行为的，要是右击，需要使用popUpContextMenu */
  // tray.setContextMenu(contextMenu);

  /**
   * 点击，显示主窗口
   */
  tray.on('click', () => {
    if(!main.isDestroyed()) main.show();
  })

  /**
   * 右击，显示菜单
   */
  tray.on('right-click', (e) => {
    tray.popUpContextMenu(contextMenu)
  })
}

