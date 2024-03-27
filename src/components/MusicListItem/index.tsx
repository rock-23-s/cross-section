/**
 * 每个音乐库的封装复用的盒子
 */

// 头像图片
import smell from '@/assets/music/smell.png'
// 样式
import styles from './index.less'
import React, { useMemo, useState } from 'react';
// 图标
import { IconFont } from '@/icons';

type MusicListItemType = {
  /** 是否显示hover图标 */
  isHover?: boolean;
}

const MusicListItem: React.FC<MusicListItemType> = (props) => {
  const { isHover=true } = props;
  // 是否正在播放当前列表
  const [ isPause, setIsPause ] = useState(true)

  const hoverIcon = useMemo(() => {
    const isPauseIcon = isPause ? 'stopHover' : 'playHover';
    return <IconFont
      className={styles.musicListItem_isPlayIcon}
      name={isPauseIcon}
      // style={{ width: '2.5rem' }}
      width={'100%'}
    />
  }, [])

  return <div className={styles.musicListItem}>
    {/* 不用antd的头像组件，因为官网上对于弹性布局要调整的太多了，不如我直接display的flex，给字元素%的宽度来的便捷。 */}
    <div className={styles.musicListItem_avatar}>
      <img src={smell} alt="" />
    </div>
    <p className={styles.musicListItem_title}>浮光掠影</p>
    <p className={styles.musicListItem_author}>周深</p>
    {isHover && hoverIcon}
  </div>
}

export default MusicListItem

