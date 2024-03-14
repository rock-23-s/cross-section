// import { IconList, IconFont } from "@/icons/index"
import styles from './index.less'
import { union } from 'lodash'

const Content: React.FC = () => {
  return <>
    <div className={styles.siderContent}>
      main content
      {/* {
        union(...IconList).map((item: {name: string}) => {
          return (
            <IconFont
              name={item.name}
              width="23"
              key={item.name}
            />
          )
        })
      } */}
    </div>
  </>
}

export default Content
