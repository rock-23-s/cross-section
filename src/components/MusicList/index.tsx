/**
 * 二次封装音乐列表组件，为了方便复用，但不用将组件复写。
 */
import { List, Avatar } from 'antd'
import styles from './index.less'
import classNames from 'classnames';
import { useMemo } from 'react';


type MusicListType = {
  list: {author: string, name: string, avatar: string | undefined}[];
  className?: string;
  avatarSize?: number;
  avatarSquare?: "square" | "circle" | undefined;
  description?: boolean;
  /** 是否折叠 */
  collapsed?: boolean;
}
const MusicList: React.FC<MusicListType> = (props) => {
  const {
    list,
    className,
    avatarSize=52,
    avatarSquare="square",
    description=true,
    collapsed=false
  } = props


  const resetText = (item: { author: string; name: string; avatar: string | undefined; }) => useMemo(() => {
    console.log(collapsed, '---collapsed')
    const collapsedObj =  collapsed ? {} : {title: item.name, description: description ? item.author : ''}
    return collapsedObj
  }, [collapsed, description])

  return <>
    <div className={classNames({
      [styles.musicList]: true,
      [className || '']: true,
    })}>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size={avatarSize} shape={avatarSquare} />}
              {...resetText(item)}
            />
          </List.Item>
        )}
      />
    </div>
  </>
}

export default MusicList