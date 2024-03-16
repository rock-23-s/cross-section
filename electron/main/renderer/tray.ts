import { BrowserWindow, Menu, Tray, app, nativeImage } from "electron";
import { getAssetPath } from "../utils/path";

// 托盘小图标
const applicationImage = (path: any) =>
  nativeImage.createFromPath(path).resize({ width: 18, height: 18 });
const trayIcon = getAssetPath('tray.png');

export const createTray = (main: BrowserWindow) => {
  let tray = new Tray(applicationImage(trayIcon))
  // let tray = new Tray(path.resolve(__dirname, '../../assets/tray.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', accelerator: 'Cmd+Q', click: () => {  app.exit() } }
  ])
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    main.show()
  })
}

