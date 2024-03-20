/**
 * 音乐标题：因涉及地方较多，做了封装
 */
import styles from './index.less'
import classNames from 'classnames'

type MusicTitleType = {
  className?: string;
}
const MusicTitle: React.FC<MusicTitleType> = (props) => {
  const { className='' } = props

  return <div className={classNames({
    [styles.musicTitle]: true,
    [className]: true
  })}>
    <span className={styles.musicTitle_head}>最近播放</span>
    <span className={styles.musicTitle_button}>显示全部</span>
  </div>
}

export default MusicTitle
