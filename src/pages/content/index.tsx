import styles from './index.less'
import { mockMusicList } from '../siderList/playlist'
// 音乐列表
import MusicList from '@/components/MusicList'
// 按钮
import ButtonRound from '@/components/ButtonRound'
// 音乐栏标题
import MusicTitle from '@/components/MusicTitle'
// 轮播
import MusicCarousel from '@/components/MusicCarousel'
// 滚动条组件
import CrossScroll from '@/components/CrossScroll'
// 单个的音乐列表
import MusicListItem from '@/components/MusicListItem'

const carouselList = [
  {
    id: 1,
    url: require('@/assets/navList/nav1.png')
  },
  {
    id: 2,
    url: require('@/assets/navList/nav2.png')
  },
  {
    id: 3,
    url: require('@/assets/navList/nav3.png')
  },
  {
    id: 4,
    url: require('@/assets/navList/nav4.png')
  },
]

const Content: React.FC = () => {
  /**
   * 按钮点击事件
   */
  const clickButton = () => console.log('点击')
  return <div className={styles.siderContent}>
    {/* 轮播 */}
    <MusicCarousel carouselList={carouselList} />
    <CrossScroll
      isRapidScroll={false}
      className={styles.siderContent_center}
      style={{ height: 'calc(100vh - 433px)' }}
    >
      <slot name='musicList'>
        {/* 按钮 */}
        <div className={styles.siderContent_button}>
          <ButtonRound name='全部' clickHandle={clickButton} />
          <ButtonRound name='音乐' clickHandle={clickButton} />
          <ButtonRound name='博客' clickHandle={clickButton} />
        </div>
        {/* 音乐列表 */}
        <MusicList
          className={styles.siderContent_list}
          list={mockMusicList}
          avatarSize={48}
          avatarSquare={'square'}
          description={false}
        />
        {/* 最近播放 */}
        <MusicTitle />
        {/* 音乐库列表 */}
        <div className={styles.siderContent_listItem}>
          <MusicListItem />
          <MusicListItem />
          <MusicListItem />
          <MusicListItem />
        </div>
      </slot>
    </CrossScroll>
  </div>
}

export default Content
