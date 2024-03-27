import Icon from '@ant-design/icons';
import { resetImportList } from '@/utils/processAssets';
import { union } from 'lodash'

/**
 * 批量引入完后对所有icon的数据处理
 */
// 引入路径
const slider_left = require.context('../assets/slider_left', true, /\.svg$/)
const content = require.context('../assets/iconSvg', true, /\.svg$/)
const play = require.context('@/assets/playIcon', true, /\.svg$/)
const music = require.context('@/assets/music', true, /\.png$/)
// // 枚举，便于引入多个路径的处理
const list: any = {
  slider_left,
  content,
  play
};

const IconList = Object.keys(list).map(item => {
  return resetImportList(list[item])
})
console.log(IconList)

const avatarList = (avatarKey: string) => {
  const avatar = resetImportList(music).find(item => item.name === avatarKey)
  return avatar?.value
}
// /**
//  * 
//  * 导出图标
//  * 
//  */
type IconFontType = {
  name: string;
  width?: string | number;
  className?: string;
  onClick?: () => void;
  style?: object;
}
const IconFont: React.FC<IconFontType> = (props) => {
  // const ListItem = union(...IconList).find(item => item.name === props.name)
  const ListItem = union(...IconList).find(item => item.name === props.name)
  return (
    <Icon
      component={() => (
        <img
          src={ListItem?.value}
          alt=""
          width={props.width || 16}
        />
      )}
      {...props}
    />
  );
};
export {
  avatarList,
  IconFont
}