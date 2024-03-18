/**
 * 自写播放组件
 */

import { useState, useRef, useMemo } from 'react';
// 图标
import { IconFont } from '@/icons/index'
// 样式
import styles from './index.less'
// 组件
import PrograssBar from '../PrograssBar'

type PlayMusicType = {

}

const PlayMusic: React.FC<PlayMusicType> = (props) => {

  const audioRef = useRef<any>(null);
  const audioCuttent: any = audioRef?.current
  // 获取播放的总时长
  const [timeALL, setTimeAll] = useState({
    startTime: '0:00',
    endTime: '',
    duration: 0,
    currentTime: 0
  })
  // 是否播放
  const [isPlay, setIsPlay] = useState(false)

  /**
   * 
   * 播放器：播放总时长
   */
  const getDuration = (time: number) => {
    if(time) {
      let m = Math.floor(time / 60)
      const s = Math.floor(time % 60)
      if(s > 60) {
        m++;
      }
      return `${m}:${s < 10 ? '0' + s : s}`;
    }
    return '0:00'
  }

  /**
   * 音频或视频的当前帧已加载，但没有足够数据播放下一帧
   */
  const audioLoadedData = (e: any) => {
    const { currentTime, duration } = e.target;
    setTimeAll({
      ...timeALL,
      startTime: getDuration(currentTime),
      endTime: getDuration(duration),
      duration: duration,
      currentTime: currentTime
    })
  }

  /**
   * play：播放事件
   */
  const audioPlaying = () => {
    setIsPlay(true)
  }

  /**
   * 图标按钮 —— 暂停和启动
   */
  const iconPlayHandler = (playMemo: string) => {
    if(playMemo === 'pause') { // 暂停
      audioCuttent.play();
      setIsPlay(true)
    } else { // 播放
      audioCuttent.pause();
      setIsPlay(false)
    }
  }

  /**
   * 监听 播放还是暂停的 图标 显示
   */
  const playMemo = useMemo(() => {
    return isPlay ? 'play' : 'pause'
  }, [isPlay])


  /**
   * 
   * onTimeUpdate: 音频currentTime已更改时调用
   * 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event
   */
  const audioTimeUpdate = (e: any) => {
    const { currentTime } = e.target;
    setTimeAll({
      ...timeALL,
      startTime: getDuration(currentTime),
      currentTime
    })
  }
  return <>
    {/* 自定义音乐播放组件 */}
    <audio
      autoPlay
      ref={audioRef}
      loop
      src={require('@/assets/musicList/appearance.mp3')}
      onLoadedData={audioLoadedData}
      onPlaying={audioPlaying}
      onTimeUpdate={audioTimeUpdate}
    >
      您的浏览器不支持该音频格式。
    </audio>

    <div className={styles.playmusic}>
      <div className={styles.playmusic_iconCllection}>
        <IconFont name='random' width={'25'} />
        <IconFont name='Previou' width={'20'} />
        <span onClick={() => iconPlayHandler(playMemo)}>
          <IconFont name={playMemo} width={'35'} className={styles.playmusic_iconCllection_isplay} />
        </span>
        <IconFont name='Previou' width={'20'} className={styles.playmusic_iconCllection_nextviou} />
        <IconFont name='loop' width={'25'} />
      </div>
      <div className={styles.playmusic_progressBar}>
        <PrograssBar
          timeALL={timeALL}
          setTimeAll={setTimeAll}
          getDuration={getDuration}
          audioRef={audioRef}
        />
      </div>
    </div>
  </>
}

export default PlayMusic
