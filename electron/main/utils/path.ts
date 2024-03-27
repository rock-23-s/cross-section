/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { app, nativeImage } from 'electron';


// ts 类型
type PathType = {
  image: {path: string, size?:{width?: number, height?: number}}
}

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 8000;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../../src/renderer/', htmlFileName)}`;
}


const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

export const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

// 托盘小图标
export const applicationImage = ({path, size}: PathType['image']) =>{
  return nativeImage.createFromPath(getAssetPath(path)).resize({ ...size })
};


export const toPath = (url: string) => path.resolve(__dirname, url)
