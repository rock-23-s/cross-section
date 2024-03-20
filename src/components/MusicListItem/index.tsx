/**
 * 每个音乐库的封装复用的盒子
 */

// 头像图片
import smell from '@/assets/music/smell.png'
// 样式
import styles from './index.less'
import React from 'react';

type MusicListItemType = {
}

const MusicListItem: React.FC<MusicListItemType> = (props) => {
  const { } = props

  return <div className={styles.musicListItem}>
    {/* 不用antd的头像组件，因为官网上对于弹性布局要调整的太多了，不如我直接display的flex，给字元素%的宽度来的便捷。 */}
    <div className={styles.musicListItem_avatar}>
      <img src={smell} alt="" />
    </div>
    <p className={styles.musicListItem_title}>浮光掠影</p>
    <p className={styles.musicListItem_author}>周深</p>
  </div>
}

export default MusicListItem

