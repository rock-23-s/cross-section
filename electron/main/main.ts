/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Notification, dialog, nativeImage} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath, getAssetPath, applicationImage } from './utils/path';
// 创建子窗口
// import { createAt } from './renderer/at'
import { createTray } from './renderer/tray'
import { MainEnums } from '../../src/enums/main'
// 视频转码
import { ffmpegList } from './utils/ffmpeg'
// 有助于保存和恢复电子窗口的大小和位置
import windowState from 'electron-window-state';
import { store } from './store'
import { isMac } from './utils/os';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

function showNotification () {
  const notification = new Notification({ title: '是否关闭当前应用', body: '', icon: getAssetPath('logo.png') })
  notification.show();
}

/***
 * ipcMain and ipcRenderer
 */

// 是否隐藏
ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  event.reply('ipc-example', msgTemplate('pong'));
});

/**
 * 全屏
 */
ipcMain.on(MainEnums.FULLSREEN, () => {
  if (mainWindow) {
    mainWindow?.setFullScreen(true)
  }
});

/**
 * 下载
 */
ipcMain.on(MainEnums.DOWNLOAD, () => {
  dialog.showOpenDialog({
    title: '请选择下载路径',
    defaultPath: app.getPath('downloads'),
    properties: ['openDirectory', 'createDirectory']
  }).then((res) => {
    if(res.filePaths) {
      store.set('downloadPath', res.filePaths)
    }
  })
})


/**
 * 关闭全屏
 */
ipcMain.on(MainEnums.CLOSESCREEN, () => {
  mainWindow?.setFullScreen(false)
});

/**
   * 音频转码
   */
ipcMain.on(MainEnums.FFMPEG, (e, arg) => {
  const { url } = arg;
  if(url) {
    ffmpegList(url)
  }
})


/**
 * 创建窗口
 */
const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }
  /**
   * 有助于保存和恢复电子窗口的大小和位置
   */
  let mainWidowState = windowState({
    defaultWidth: 1024,
    defaultHeight: 728,
  })

  // 创建主窗口
  mainWindow = new BrowserWindow({
    x: mainWidowState.x,
    y: mainWidowState.y,
    width: mainWidowState.width,
    height: mainWidowState.height,
    show: false,
    // min|max -width|height来设置窗口的最大值或最小值
    minWidth: 700,
    minHeight: 570,
    // 作用在window上，mac不显示，linux暂不清楚
    icon: getAssetPath('logo.png'),
    // 作用在window和mac上，linux暂不清楚
    title: "横截面",
    // frame：默认true，就是显示窗口关闭、logo和标题那类的内容，false就不显示了
    frame: true,
    // transparent: true, // 窗口透明 默认false. 在Windows上，仅在无边框窗口下起作用。
    // // 自动隐藏菜单栏，除非按了Alt键。 默认值为 false.
    // autoHideMenuBar: true,
    // webPreferences：网页功能设置
    webPreferences: {
      // 将preload.js 脚本附在渲染进程上
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../.erb/dll/preload.js'),
    },
  });
  
  mainWidowState.manage(mainWindow);

  mainWindow.loadURL(resolveHtmlPath(''));
  /**
   * 创建子组件
   **/
  // createAt(mainWindow)
  createTray(mainWindow)
  
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });
  
  mainWindow.on('close', (e) => {
    console.log('I do not want to be closed')
    e.preventDefault();
    app?.hide()
  })

  mainWindow.on('closed', () => {
    mainWindow = null as any;
    app.quit();
  });

  mainWindow.on('hide', () => {
    // console.log('hide -----')
  })

  /**
   * 窗口最大化
   */
  mainWindow.on('enter-full-screen', () => {
    // 当渲染进程像主进程发送数据时，就不可以再使用ipcMain或ipcRenderer操作了，而是采用mainWindow
    mainWindow?.webContents.send(MainEnums.SETFULLSCREEN, true)
  })

  /**
   * 窗口
   */
  mainWindow.on('leave-full-screen', () => {
    // 当渲染进程像主进程发送数据时，就不可以再使用ipcMain或ipcRenderer操作了，而是采用mainWindow
    mainWindow?.webContents.send(MainEnums.SETFULLSCREEN, false)
  })

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};


/**
 * Add event listeners...
 */

if(isMac) {
  const dockIcon = applicationImage({path: 'dockIcon.png'})
 
  // 获取图标路径
  app.dock.setIcon(dockIcon)
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
      
    });
  })
  .then(showNotification)
  .catch(console.log);

