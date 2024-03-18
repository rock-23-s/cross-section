import React, { useMemo, useRef } from "react"
import styles from './index.less'
import { Progress } from "antd";
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
     *  2. 根据点击的位置获取宽度（offsetX）
     *  3. 将进度条的宽度 - 点击位置的宽度，就等于剩下的宽度（也就是换算前，剩余的进度条）
     *  4. 然后将剩余进度条换算成播放的剩余时间
     *  5. 将音频的整个时间 - 换算后的剩余时间 = 结果
     * 
     * 注：没有参考，将整个计算做了详细的推理反复思考，此计算的思想不一定对，但目前测试整体是没问题的。
     */

    // 进度条的宽度
    const offsetWidth = prograssRef.current?.offsetWidth;
    // 点击的位置：也就是点击距离左侧的宽度
    const offsetX = e.nativeEvent.offsetX
    // 最后的结果
    const clientTime = timeALL.duration - ((offsetWidth - offsetX) / 100 * 60)
    
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
  console.log(computerPrograss,'-computerPrograss')


  return <>
    <div className={styles.prograssBar}>
      <div>
        {useMemo(() => timeALL.startTime, [timeALL.startTime])}
      </div>
      <div className={styles.prograssBar_content}>
        {/* 用Antd 的 progrress组件问题：1.样式问题, 2.事件 */}
        {/* className={styles.prograssBar_content_cursor} */}
        <span
          onClick={audioProgressClick}
          ref={prograssRef}
          className={styles.prograssBar_content_bar}
        >
          <Progress
            showInfo={false}
            percent={computerPrograss}
            strokeColor={'#e6e6e6'}
            size="small"
          />
          <IconFont
            name="cursor"
            width={16}
            className={styles.prograssBar_content_bar_cursor}
            style={{ left: `${computerPrograss - 2}%`}}
          />
        </span>
      </div>
      <div>{timeALL.endTime}</div>
    </div>
  </>
}

export default PrograssBar
