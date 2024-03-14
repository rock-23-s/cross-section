import { BrowserWindow } from "electron"
import { getAssetPath } from '../utils/path'

export const createAt = (main: BrowserWindow) => {
  const createAtWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    title: '@窗口',
    // min|max -width|height来设置窗口的最大值或最小值
    minWidth: 700,
    minHeight: 570,
    // 作用在window上，mac不显示，linux暂不清楚
    icon: getAssetPath('logo.png'),
  })

  main.on('ready-to-show', () => {
    if (process.env.START_MINIMIZED) {
      createAtWindow.minimize();
    } else {
      createAtWindow.show();
    }
  })
}


