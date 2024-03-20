/**
 * 自定义滚动条：
 *  简易版，暂不加事件了，等需要计算滚动条位置时，我再给此组件增加功能
 */
import styles from './index.less'
import { cloneDeep } from 'lodash';
import classNames from 'classnames';

type CrossScrollType = {
  children: JSX.Element;
  height?: string | number | undefined;
  className?: string;
  style: object;
  /** 是否hover时显示滚动条 */
  isRapidScroll?: boolean
}

const CrossScroll: React.FC<CrossScrollType> = (props) => {
  const { children, isRapidScroll = false} = props

  const filterProps = () => {
    const filterList = Object.keys(props).filter(item => ['children', 'isRapidScroll'].includes(item))
    let list: any = cloneDeep(props)
    filterList.forEach(item => {
      delete list[item]
    })
    return list
  }

  return <>
    <div
      {...filterProps()}
      style={{ ...props.style }}
      className={classNames({
        [styles.crossScroll]: !isRapidScroll,
        [styles.scrollHover]: isRapidScroll,
        [props.className ? props.className: '']: true
      })}
    >
      {
        children.props.name === 'musicList'
          ?
          children.props.children
          :
          {children}
      }
    </div>
  </>
}

export default CrossScroll
