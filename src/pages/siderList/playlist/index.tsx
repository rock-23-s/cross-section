// 引入button组件
import { useMemo } from 'react';
// 按钮组件
import ButtonRound from '@/components/ButtonRound'
import styles from './index.less'
import classNames from 'classnames';
// 图标
import { IconFont } from '@/icons';

type PlayListType = {
  /** 收缩框状态 */
  collapsed: boolean;
}

const mockMusicList = [
  {
    name: '闻到(影视剧《唯有暗香来》）',
    author: 'sunmy',
    avatar: ''
  }
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
      [styles.playlist_isShow]: collapsed,
    })
  }, [collapsed])

  return <>
    <div className={styles.playlist}>
      <div className={resetClass()}>
        <ButtonRound name='歌单' clickHandle={songList} />
        <ButtonRound name='艺人' className={styles.playlist_icon} clickHandle={songList} />
      </div>

      {/* 搜索 ｜ 排序  功能 */}
      <div className={resetClass({[styles.playlist_method]: true})}>
          <IconFont name='search' width="16" />
          <span>
            <i className={styles.playlist_method_recent}>最近播放</i>
            <IconFont name='sort' width="18" />
          </span>
      </div>  

      <div className={styles.playlist_list}>
        播放列表
      </div>
    </div>
  </>
}


export default PlayList