import { BrowserWindow, Menu, Tray, app } from "electron";
import path from "path";
import { getAssetPath } from "../utils/path";

// 托盘小图标
const trayIcon = getAssetPath('tray.png');

export const createTray = (main: BrowserWindow) => {
  let tray = new Tray(path.resolve(__dirname, '../../assets/tray.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', accelerator: 'Cmd+Q', click: () => {  app.exit() } }
  ])
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    main.show()
  })
}

