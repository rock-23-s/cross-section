/**
 * 音乐播放进度条
 */

import React, { useEffect, useMemo, useRef } from "react"
import styles from './index.less'
import { IconFont } from '@/icons/index'

type PrograssBarType = {
  /** 时间获取 */
  timeALL: {
    startTime: string;
    endTime: string;
    duration: number;
    currentTime: number;
  };
  /** 更新时间 */
  setTimeAll: (flag: any) => void;
  /** 重新计算currentTime */
  getDuration: (time: number) => void;
  /** 音频的Ref */
  audioRef: any
}
const PrograssBar: React.FC<PrograssBarType> = (props) => {
  const { timeALL, setTimeAll, getDuration, audioRef } = props
  // 进度条 ref
  const prograssRef = useRef<any>(null)

  /**
   * 计算自定义进度条
   */
  const computerPrograss = useMemo(() => {
    const { currentTime, duration } = timeALL;
    const prograssNum = Math.floor((currentTime / duration * 100))
    return isNaN(prograssNum) ? 0 : prograssNum;
  }, [timeALL.duration, timeALL.currentTime])

  /**
   * 播放器：进度条的点击事件
   */
  const audioProgressClick = (e: any) => {
    e.stopPropagation();
    /**
     * 计算思路：
     *  1. 我们获取进度条的宽度（offsetWidth）
     *  2. 根据点击的位置（offsetX）
     *  3. 将 （（点击位置距离进度条的起始位置 / 进度条的宽度） * 总时长） ，就等于点击要定位的时间点
     * 
     * 注：没有参考，将整个计算做了反复思考，此计算的思想不一定对，但目前测试整体是没问题的。
     */

    // 进度条的宽度
    const clientWidth = prograssRef.current?.clientWidth;
    // 点击的位置：也就是点击距离左侧的宽度
    const offsetX = e.nativeEvent.offsetX
    // 最后的结果
    const clientTime = (offsetX / clientWidth) * timeALL.duration;
    
    setTimeAll({
      ...timeALL,
      startTime: getDuration(clientTime),
      currentTime: clientTime
    })
    if(audioRef.current) {
      audioRef.current.currentTime = clientTime;
      audioRef.current.play();
    }
  }

  return <>
    <div className={styles.prograssBar}>
      <div>
        {useMemo(() => timeALL.startTime, [timeALL.startTime])}
      </div>
      <div className={styles.prograssBar_content}>
        {/* 用Antd 的 progrress组件问题：1.样式问题, 2.事件，所以干脆用html5 的progress标签 */}
        {/* className={styles.prograssBar_content_cursor} */}
        <progress ref={prograssRef} onClick={audioProgressClick} value={computerPrograss} className={styles.prograssBar_content_bar} max="100" />
        <IconFont
          name="cursor"
          width={16}
          className={styles.prograssBar_content_cursor}
          style={{ left: `${computerPrograss - 1}%`}}
        />
      </div>
      <div>{timeALL.endTime}</div>
    </div>
  </>
}

export default PrograssBar
