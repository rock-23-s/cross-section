import { toPath } from "./path";
const ffmpeg = require('ffmpeg')

/**
 * 将其他的音频文件转换成mp3格式
 * @param url 音频文件地址
 * 参考：https://github.com/damianociarla/node-ffmpeg
 * 注：虽然这里都设置好了，但还是会报错，这是因为在电脑的系统中没有安装这个ffmpeg
 */
let flag = ''
export const ffmpegList = (url: string) => {
  try {
    const process = new ffmpeg(toPath(`../../../src${url}`));
    const splitUrl = url.split('.');
    /**
     * ffmpeg 是不会检查输出文件是否已存在的，并会覆盖它而不发出警告
      */
    if(flag === url) return;
    process.then((video: any) => {
      /**
       * 将音频编码为mp3格式
       */
      video.setAudioQuality(128)
      .fnExtractSoundToMP3(toPath(`../../../src${splitUrl[0]}.mp3`), (error: any, file: string) => {
          if(!error) {
            flag = url
            /**
             * 禁止音频编码
             */
            video.setDisableAudio()
            console.log('Audio file: ' + file);
          }
          console.error('fnExitractSoundToMP3 Error: ', error)
        })
    }, function (err: any) {
        console.error('------Error: ' + err);
    });
  } catch (e) {
    console.log(e, '----is catch？')
  }
}