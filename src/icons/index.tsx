/**
 * 图标封装，这是两种引用方式
 *  注释的这种是本地的静态图标使用，我将自动读取所需文件下的图标类型
 *  另一种是上传到iconfont，或使用iconfont的项目中在线的路径，可以根据css控制
 *  两种的区别，本地静态引入会在network中显示，而iconfont中这种不会，根据标签名就可显示，
 * 显然iconfont的使用是更灵活的。
 */
import Icon from '@ant-design/icons';
import { resetImportList } from '@/utils/processAssets';
// import { size, union } from 'lodash'
import { createFromIconfontCN } from '@ant-design/icons';

const IconFontFrom = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4469079_hrfd15unseo.js',
});

/**
 * 批量引入完后对所有icon的数据处理
 */
// 引入路径
// const slider_left = require.context('../assets/slider_left', true, /\.svg$/)
// const content = require.context('../assets/iconSvg', true, /\.svg$/)
// const play = require.context('@/assets/playIcon', true, /\.svg$/)
const music = require.context('@/assets/music', true, /\.png$/)
// // 枚举，便于引入多个路径的处理
// const list: any = {
//   slider_left,
//   content,
//   play
// };

// const IconList = Object.keys(list).map(item => {
//   return resetImportList(list[item])
// })

const avatarList = (avatarKey: string) => {
  const avatar = resetImportList(music).find(item => item.name === avatarKey)
  return avatar?.value
}
/**
 * 
 * 导出图标
 * 
 */
type IconFontType = {
  name: string;
  width?: string | number;
  className?: string;
  onClick?: () => void;
  style?: object;
}
const IconFont: React.FC<IconFontType> = (props) => {
  // const ListItem = union(...IconList).find(item => item.name === props.name)
  console.log(props)
  return (
    <>
      {/* <Icon
        component={() => (
          <img
            src={ListItem?.value}
            alt=""
            width={props.width || 16}
          />
        )}
        {...props}
      /> */}
      <Icon
        component={() => (
          <IconFontFrom type={`icon-${props.name}`} />
        )}
        {...props}
      />
    </>
  );
};
export {
  avatarList,
  IconFont
}