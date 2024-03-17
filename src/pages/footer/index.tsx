// 引入播放音乐组件
import PlayMusic from "@/components/PlayMusic"
// 样式
import styles from './index.less'
// 头像组件
import ArtistAvatar from "@/components/ArtistAvatar"
// 图标
import { IconFont } from '@/icons/index'

type FooterType = {
  clloected?: boolean;
}
const Footer:React.FC<FooterType> = (props) => {
  const { clloected = false } = props

  return <>
    <div className={styles.footerMusic}>
      <div className={styles.footerMusic_message}>
        <div>
          <ArtistAvatar size={55} />
        </div>
        <div className={styles.footerMusic_message_artist}>
          样子
          <span>孙燕姿</span>
          <div className={styles.footerMusic_message_artist_icon}>
            <IconFont name={clloected ? 'collected': 'collect'} />
          </div>
        </div>
      </div>
      <div className={styles.footerMusic_play}>
        <PlayMusic />
      </div>
    </div>
  </>
}

export default Footer