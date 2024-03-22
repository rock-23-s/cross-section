import MusicListItem from "@/components/MusicListItem"
import styles from './index.less'
import ArtistList from "@/components/ArtistList"
import CrossScroll from "@/components/CrossScroll"

const MusicMessage: React.FC = () => {
  return <div className={styles.musicMessage} >
    <CrossScroll
      isRapidScroll={false}
      // className={styles.musicMessage_center}
      style={{ height: 'calc(100vh - 127px)' }}
    >
      <slot name="musicList">
        <div className={styles.musicMessage_box}>
          <MusicListItem isHover={false} />
          {/* 提供者 */}
          <div className={styles.musicMessage_box_card}>
            <div className={styles.musicMessage_box_card_title}>
              <h3>提供者</h3>
              <span>显示全部</span>
            </div>
            <div className={styles.musicMessage_box_card_artist}>
              <ArtistList
                artist={'黄诗扶'}
                artistDecs={'主要艺人，作曲者'}
                isFocus={true}
              />
              <ArtistList
                artist={'于正'}
                artistDecs={'作词者'}
                isFocus={false}
              />
            </div>
          </div>
          {/* 队列 */}
          <div className={styles.musicMessage_box_card}>
            <div className={styles.musicMessage_box_card_title}>
              <h3>队列为空</h3>
              {/* <span>显示全部</span> */}
            </div>
            <div className={styles.musicMessage_box_card_artist}>
              <ArtistList
                isFocus={true}
                buttonName={'搜索队列'}
              />
            </div>
          </div>
        </div>
      </slot>
    </CrossScroll>
  </div>
}

export default MusicMessage
