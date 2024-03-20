/**
 * 走马灯（轮播）：做了封装
 */

import { Carousel } from 'antd';
import styles from './index.less'

type MusicCarouselType = {
  /** 走马灯显示的图片数组 */
  carouselList: {id: number, url: string}[];
}

const MusicCarousel: React.FC<MusicCarouselType> = (props) => {
  const { carouselList } = props

  return <>
    <Carousel autoplay className={styles.musicCarousel}>
      {
        carouselList.map(item => {
          return <div key={item.id} className={styles.musicCarousel_content}>
            <img src={item.url} alt="" />
          </div>
        })
      }
    </Carousel>
  </>
}

export default MusicCarousel
