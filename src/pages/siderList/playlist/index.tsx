// 引入button组件
import { useMemo } from 'react';
// 按钮组件
import ButtonRound from '@/components/ButtonRound'
import styles from './index.less'
import classNames from 'classnames';
// 图标
import { IconFont, avatarList } from '@/icons';
// 列表组件
import MusicList from '@/components/MusicList';
// 滚动条组件
import CrossScroll from '@/components/CrossScroll'


type PlayListType = {
  /** 收缩框状态 */
  collapsed: boolean;
}
/** 模拟歌单列表 */
export const mockMusicList = [
  {
    name: '闻到(影视剧《唯有暗香来》）',
    author: '黄诗扶',
    avatar: avatarList('smell')
  },
  {
    name: '样子-电视剧《要久久爱》',
    author: '孙燕姿',
    avatar: avatarList('appearance')
  },
  {
    name: '华语',
    author: '歌单.sunmy',
    avatar: avatarList('beast')
  },
  {
    name: '闻到(影视剧《唯有暗香来》）',
    author: '黄诗扶',
    avatar: avatarList('smell')
  },
  {
    name: '样子-电视剧《要久久爱》',
    author: '孙燕姿',
    avatar: avatarList('appearance')
  },
  {
    name: '华语',
    author: '歌单.sunmy',
    avatar: avatarList('beast')
  },
]

const PlayList: React.FC<PlayListType> = (props) => {
  const { collapsed } = props

  /**
   * 歌单 点击事件
   */
  const songList = () => {
    console.log('歌单的点击事件')
  }

  /**
   * 将涉及收缩框的进行class合成，收缩框后的内容显示，我这里是通过class来控制的
   * @param classList class
   */
  const resetClass = (classList = {}) => useMemo(() => {
    return classNames({
      ...classList,
      [styles.playIcon_isShow]: collapsed,
    })
  }, [collapsed])

  return <>
    <div className={styles.play}>
      <div className={styles.playIcon}>
        <div className={resetClass()}>
          <ButtonRound name='歌单' clickHandle={songList} />
          <ButtonRound name='艺人' className={styles.playIcon_icon} clickHandle={songList} />
        </div>

        {/* 搜索 ｜ 排序  功能 */}
        <div className={resetClass({[styles.playIcon_method]: true})}>
            <IconFont name='search' width="16" />
            <span>
              <i className={styles.playIcon_method_recent}>最近播放</i>
              <IconFont name='sort' width="18" />
            </span>
        </div>  
      </div>
      <div className={styles.playlist}>
        <CrossScroll
          isRapidScroll={true}
          style={{ height: `calc(100vh - ${collapsed ? 307 : 380}px)` }}
        >
          <slot name='musicList'>
            <MusicList collapsed={collapsed} list={mockMusicList}/>
          </slot>
        </CrossScroll>
      </div>
    </div>
  </>
}


export default PlayList