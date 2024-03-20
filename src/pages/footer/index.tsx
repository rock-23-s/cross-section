// 引入播放音乐组件
import PlayMusic from "@/components/PlayMusic"
// 样式
import styles from './index.less'
// 头像组件
import ArtistAvatar from "@/components/ArtistAvatar"
// 图标
import { IconFont } from '@/icons/index'
import { useEffect, useMemo, useState } from "react"
import { MainEnums } from '@/enums/main';
import { ipcRenderer, isElectron } from "@/utils/electron"

type FooterType = {
  /** 是否折叠 */
  clloected?: boolean;
}
const Footer:React.FC<FooterType> = (props) => {
  const { clloected = false } = props
  // 是否全屏
  const [isScreen, setIsScreen] = useState(false)
  // 是否静音
  const [isMute, setIsMute] = useState(false)

  /**
   * useMemo: 是否静音
   */
  const getMute = useMemo(() => {
    const screenName = isMute ? 'mute' : 'sound'
    return <IconFont name={screenName} width={'20'} />
  }, [isMute])


  /**
   * 点击调用electron的全屏显示
   */
  const clickScreen = () => {
    const screenState = isScreen ? MainEnums.CLOSESCREEN : MainEnums.FULLSREEN;
    ipcRenderer.send(screenState)
    setIsScreen(!isScreen)
  }
  /**
   * useMemo: 是否全屏
   */
  const getScreen = useMemo(() => {
    const screenName = isScreen ? 'closeScreen' : 'fullScreen'
    return <IconFont name={screenName} width={'20'} onClick={clickScreen} />
  }, [isScreen])

  useEffect(() => {
    console.log('是否执行')
    if(isElectron && ipcRenderer) {
      /**
       * 用于electron设置全屏时，更改状态用
       */
      ipcRenderer.on(MainEnums.SETFULLSCREEN, (screen) => {
        setIsScreen(!!screen)
      })
    }
  }, [])

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
        <PlayMusic autoPlay={false} />
      </div>
      <div className={styles.footerMusic_surrounding}>
        <IconFont name='view' width={'20'} />
        <IconFont name='mike' width={'20'} />
        <IconFont name='queue' width={'22'} />
        {getMute}
        {getScreen}
      </div>
    </div>
  </>
}

export default Footer